import { resumeKnowledge, resumePromptContext } from './resumeData.js'
import { buildMockAnswer } from './hrAssistant.js'
import { classifyIntent, IntentResult, getIntentLabel } from './intentRouter.js'
import { retrieveRelevantChunks, formatChunksForPrompt } from './ragRetriever.js'

export const config = { runtime: 'nodejs', maxDuration: 60 }

type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

function json(res: any, status: number, data: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

function getClientIp(req: any) {
  const forwarded = req.headers?.['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim()
  const realIp = req.headers?.['x-real-ip']
  if (typeof realIp === 'string' && realIp.length > 0) return realIp
  return req.socket?.remoteAddress || 'unknown'
}

function applyRateLimit(req: any) {
  const ip = getClientIp(req)
  const now = Date.now()
  const windowMs = 60_000
  const maxRequests = 30

  const g: any = globalThis as any
  if (!g.__resumeChatRateLimit) g.__resumeChatRateLimit = new Map<string, number[]>()
  const store: Map<string, number[]> = g.__resumeChatRateLimit

  const arr = store.get(ip) || []
  const kept = arr.filter((t) => now - t < windowMs)
  kept.push(now)
  store.set(ip, kept)

  if (kept.length > maxRequests) {
    return {
      ok: false as const,
      retryAfterSeconds: Math.ceil((windowMs - (now - kept[0])) / 1000),
    }
  }
  return { ok: true as const }
}

function clampText(s: unknown, maxLen: number) {
  if (typeof s !== 'string') return ''
  return s.length > maxLen ? s.slice(0, maxLen) : s
}

function buildBasePrompt(redactContact: boolean) {
  const contactLine = redactContact
    ? '注意：不要输出候选人的手机号/邮箱等联系方式；若用户明确索要，请说明"默认开启脱敏"，引导其关闭脱敏后再询问。'
    : `联系方式（仅在用户明确索要时输出）：电话 ${resumeKnowledge.contact.phone}，邮箱 ${resumeKnowledge.contact.email}。`

  return [
    '你是"候选人：刘生杰"的在线简历助手，面向 HR/面试官问答。',
    '',
    '【核心规则】',
    '1. 基于简历事实进行合理推论（如：从"日均工作10小时"可推导出"抗压能力强"）',
    '2. 确实无法回答的问题，才说"简历未提供该信息"',
    '3. 禁止输出任何 Markdown 格式符号（如 **加粗**、# 标题、- 列表），只用纯文本',
    '4. 用 ✓ 符号代替 - 作为列表符号',
    '5. ' + contactLine,
    '',
    '【简历信息】',
    resumePromptContext,
  ].join('\n')
}

// Prompt 风格模板
const PROMPT_STYLES = {
  concise: `
【输出风格 - 极简纯文本】
严格遵守以下规则：
1. 总字数 ≤ 120 字，绝对禁止超过 150 字
2. 最多 3-4 个要点，每点 ≤ 15 字
3. 禁止使用任何 Markdown：禁止 ** # - [ ] \`\`\` 等符号
4. 只用纯文本 + ✓ 符号
5. 格式：一句话结论 + 换行 + ✓ 要点1 + 换行 + ✓ 要点2...
6. 示例：
候选人匹配度较高
✓ 2年B端产品经验
✓ 211硕士学历
✓ 有AI落地项目`,

  star: `
【输出风格】
- 使用 STAR 结构详细展开
- S: 情境背景（项目背景/业务痛点）
- T: 任务目标（你的职责/目标）
- A: 采取的行动（具体做了什么）
- R: 取得的结果（量化成果）`,

  rag_enhanced: (ragContext: string) => `
${ragContext}

【输出要求】
- 优先基于以上【相关材料】回答
- 可引用编号如 [1][2]
- 如材料不足，结合简历信息补充`
}

/**
 * 构建增强版 Prompt（基于意图路由和 RAG）
 */
function buildEnhancedPrompt(
  redactContact: boolean,
  intent: IntentResult,
  userQuestion: string
): string {
  const base = buildBasePrompt(redactContact)

  if (intent.suggestedPromptStyle === 'concise') {
    return base + PROMPT_STYLES.concise
  }

  if (intent.suggestedPromptStyle === 'star') {
    return base + PROMPT_STYLES.star
  }

  if (intent.suggestedPromptStyle === 'rag_enhanced') {
    const results = retrieveRelevantChunks(userQuestion, {
      projectFilter: intent.projectName,
      topK: 3,
    })
    const ragContext = formatChunksForPrompt(results)

    if (ragContext) {
      return base + PROMPT_STYLES.rag_enhanced(ragContext)
    }
    return base + PROMPT_STYLES.concise
  }

  return base + PROMPT_STYLES.concise
}

// 保留旧函数用于兼容
function buildSystemPrompt(redactContact: boolean) {
  return buildBasePrompt(redactContact) + PROMPT_STYLES.concise
}

async function parseBody(req: any) {
  if (req.body && typeof req.body === 'object') return req.body
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(Buffer.from(chunk))
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export default async function handler(req: any, res: any) {
  const origin = req.headers?.origin
  if (origin) res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Origin', origin || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    json(res, 405, { error: 'Method Not Allowed' })
    return
  }

  const limited = applyRateLimit(req)
  if (!limited.ok) {
    res.setHeader('Retry-After', String(limited.retryAfterSeconds))
    json(res, 429, { error: 'Too Many Requests', retryAfterSeconds: limited.retryAfterSeconds })
    return
  }

  const body = await parseBody(req)
  const redactContact = Boolean(body?.redactContact)
  const wantStream = Boolean(body?.stream) || String(req.headers?.accept || '').includes('text/event-stream')
  const inputMessages = Array.isArray(body?.messages) ? (body.messages as any[]) : []
  const messages: ChatMessage[] = []
  for (const m of inputMessages.slice(-12)) {
    const role = m?.role
    if (role !== 'user' && role !== 'assistant') continue
    const content = clampText(m?.content, 2000)
    if (!content) continue
    messages.push({ role, content })
  }
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    json(res, 400, { error: 'Invalid messages' })
    return
  }

  const apiKey = process.env.LLM_API_KEY
  const model = process.env.LLM_MODEL || 'gpt-4o-mini'
  const baseUrl = (process.env.LLM_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')

  // 🔥 意图识别 + RAG 增强
  const lastUserMessage = messages[messages.length - 1]?.content || ''
  const intent = classifyIntent(lastUserMessage)

  // 调试日志（生产环境可移除）
  console.log(`[Intent] ${intent.intent} (${intent.confidence}) | keywords: ${intent.matchedKeywords.join(', ')}`)

  if (!apiKey) {
    const reply = buildMockAnswer(lastUserMessage, redactContact)
    if (wantStream) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
      res.setHeader('Cache-Control', 'no-cache, no-transform')
      res.setHeader('Connection', 'keep-alive')
      res.setHeader('X-Accel-Buffering', 'no')
      res.flushHeaders?.()
      const write = (event: string | null, data: any) => {
        if (event) res.write(`event: ${event}\n`)
        res.write(`data: ${typeof data === 'string' ? data : JSON.stringify(data)}\n\n`)
      }
      write('open', { ok: true, mode: 'mock', intent: { type: intent.intent, label: getIntentLabel(intent.intent) } })
      write(null, { delta: reply })
      write('done', { done: true })
      res.end()
      return
    }
    json(res, 200, { reply, mode: 'mock', intent: { type: intent.intent, label: getIntentLabel(intent.intent) } })
    return
  }

  // 使用增强版 Prompt（带意图和 RAG）
  const systemPrompt = buildEnhancedPrompt(redactContact, intent, lastUserMessage)
  const payload = {
    model,
    temperature: 0.2,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    stream: wantStream ? true : undefined,
  }

  async function fetchWithTimeoutRetry(url: string, init: any, opts: { timeoutMs: number; maxRetries: number }) {
    let attempt = 0
    while (true) {
      const controller = new AbortController()
      const t = setTimeout(() => controller.abort(), opts.timeoutMs)
      try {
        const resp = await fetch(url, { ...init, signal: controller.signal })
        clearTimeout(t)
        if (resp.status >= 500 && resp.status < 600 && attempt < opts.maxRetries) {
          attempt++
          continue
        }
        return resp
      } catch (e) {
        clearTimeout(t)
        if (attempt < opts.maxRetries) {
          attempt++
          continue
        }
        throw e
      }
    }
  }

  let upstream: Response
  try {
    const candidates = (() => {
      const list: string[] = []
      const add = (m: string) => {
        if (!m) return
        if (list.includes(m)) return
        list.push(m)
      }
      add(model)
      if (baseUrl.includes('generativelanguage.googleapis.com')) {
        add('gemini-2.0-flash')
        add('gemini-3-flash-preview')
        add('gemini-1.5-flash')
      }
      return list
    })()

    let last: Response | null = null
    for (const m of candidates) {
      const nextPayload = { ...payload, model: m }
      last = await fetchWithTimeoutRetry(
        `${baseUrl}/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(nextPayload),
        },
        { timeoutMs: wantStream ? 30000 : 20000, maxRetries: 1 }
      )
      if (last.status !== 404) break
    }
    upstream = last as Response
  } catch {
    json(res, 502, { error: 'Failed to reach LLM upstream' })
    return
  }

  if (wantStream) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')
    res.flushHeaders?.()
    const write = (event: string | null, data: any) => {
      if (event) res.write(`event: ${event}\n`)
      res.write(`data: ${typeof data === 'string' ? data : JSON.stringify(data)}\n\n`)
    }
    if (!upstream.ok || !upstream.body) {
      const ua = upstream.headers.get('retry-after')
      const status = upstream.status
      const err =
        status === 401
          ? { error: 'LLM unauthorized' }
          : status === 429
            ? { error: 'LLM rate limited', retryAfterSeconds: ua ? Number(ua) || undefined : undefined }
            : { error: 'LLM upstream error' }
      write('error', err)
      res.end()
      return
    }
    write('open', { ok: true, intent: { type: intent.intent, label: getIntentLabel(intent.intent) } })
    const decoder = new TextDecoder('utf-8')
    let buffer = ''
    try {
      for await (const chunk of upstream.body as any) {
        buffer += decoder.decode(chunk, { stream: true })
        const lines = buffer.split(/\r?\n/)
        buffer = lines.pop() || ''
        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          const payloadLine = trimmed.slice(5).trim()
          if (payloadLine === '[DONE]') {
            write('done', { done: true })
            res.end()
            return
          }
          try {
            const obj = JSON.parse(payloadLine)
            const delta =
              obj?.choices?.[0]?.delta?.content ??
              obj?.choices?.[0]?.text ??
              ''
            if (delta) write(null, { delta })
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch {
      write('error', { error: 'Upstream stream broken' })
    }
    write('done', { done: true })
    res.end()
    return
  }

  const text = await upstream.text()
  if (!upstream.ok) {
    const ua = upstream.headers.get('retry-after')
    const status = upstream.status
    if (status === 401) {
      json(res, 401, { error: 'Unauthorized to LLM', detail: text.slice(0, 2000) })
      return
    }
    if (status === 429) {
      if (ua) res.setHeader('Retry-After', ua)
      json(res, 429, { error: 'LLM rate limited', detail: text.slice(0, 2000), retryAfterSeconds: ua ? Number(ua) || undefined : undefined })
      return
    }
    json(res, 502, { error: 'LLM upstream error', status, detail: text.slice(0, 2000) })
    return
  }

  let data: any
  try {
    data = JSON.parse(text)
  } catch {
    json(res, 502, { error: 'Invalid upstream response' })
    return
  }

  const reply =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    ''

  if (!reply || typeof reply !== 'string') {
    json(res, 502, { error: 'Empty reply from upstream' })
    return
  }

  json(res, 200, {
    reply,
    model: data?.model || model,
    usage: data?.usage,
    intent: {
      type: intent.intent,
      label: getIntentLabel(intent.intent),
      confidence: intent.confidence,
    },
  })
}
