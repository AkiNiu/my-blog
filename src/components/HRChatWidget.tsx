import { useEffect, useMemo, useRef, useState } from 'react'
import { Bot, Send, X, Sparkles, RotateCcw } from 'lucide-react'
import { buildMockAnswer } from '../lib/hrAssistant'

type Role = 'user' | 'assistant'

type ChatItem = {
  id: string
  role: Role
  content: string
}

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function safeJsonParse<T>(s: string): T | null {
  try {
    return JSON.parse(s) as T
  } catch {
    return null
  }
}

export default function HRChatWidget() {
  const apiUrl = (import.meta as any).env?.VITE_CHAT_API_URL || '/api/chat'
  const mode = (import.meta as any).env?.VITE_CHAT_MODE || 'api'

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [redactContact, setRedactContact] = useState(true)
  const [isNearBottom, setIsNearBottom] = useState(true) // 智能滚动状态
  const [items, setItems] = useState<ChatItem[]>(() => {
    const raw = localStorage.getItem('hr_chat_items')
    const parsed = raw ? safeJsonParse<ChatItem[]>(raw) : null
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
    return [
      {
        id: uid(),
        role: 'assistant',
        content: '你好，我是"刘生杰"的简历助手。你可以直接问我关于经历/项目/成果/技能/匹配度的问题。',
      },
    ]
  })

  const listRef = useRef<HTMLDivElement>(null)

  const suggested = useMemo(
    () => [
      '总结候选人优势',
      '做过哪些AI项目？',
      '匹配度分析',
      '可量化的成果',
    ],
    [],
  )

  useEffect(() => {
    localStorage.setItem('hr_chat_items', JSON.stringify(items.slice(-60)))
  }, [items])

  // 监听滚动位置，判断是否接近底部
  const handleScroll = () => {
    if (!listRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = listRef.current
    // 如果离底部不超过 80px，认为是"接近底部"
    setIsNearBottom(scrollHeight - scrollTop - clientHeight < 80)
  }

  // 智能滚动：仅当用户接近底部时才自动滚动
  useEffect(() => {
    if (!open) return
    if (!isNearBottom) return // 用户在查看历史消息，不强制滚动
    const t = window.setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    }, 50)
    return () => window.clearTimeout(t)
  }, [open, items, loading, isNearBottom])

  async function send(text: string) {
    const question = text.trim()
    if (!question || loading) return

    setError(null)
    setLoading(true)
    setIsNearBottom(true) // 发送新消息时，自动滚动到底部

    const userItem: ChatItem = { id: uid(), role: 'user', content: question }
    setItems((prev) => [...prev, userItem])
    setInput('')

    try {
      if (mode === 'mock') {
        const reply = buildMockAnswer(question, redactContact)
        setItems((prev) => [...prev, { id: uid(), role: 'assistant', content: reply }])
        return
      }

      const messages = [...items, userItem].slice(-12).map((m) => ({ role: m.role, content: m.content }))
      const controller = new AbortController()
      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
        body: JSON.stringify({ messages, redactContact, stream: true }),
        signal: controller.signal,
      })
      if (resp.headers.get('content-type')?.includes('text/event-stream')) {
        const assistantId = uid()
        setItems((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }])
        const reader = resp.body?.getReader()
        const decoder = new TextDecoder('utf-8')
        let buffer = ''
        let hasContent = false
        if (!reader) throw new Error('流式通道不可用')
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const parts = buffer.split(/\r?\n/)
          buffer = parts.pop() || ''
          for (const line of parts) {
            const trimmed = line.trim()
            if (trimmed.startsWith('data:')) {
              const payloadLine = trimmed.slice(5).trim()
              const obj = safeJsonParse<{ delta?: string; error?: string; done?: boolean }>(payloadLine)
              if (!obj) continue
              if (obj.error) {
                throw new Error(obj.error || '请求失败')
              }
              if (obj.delta) {
                hasContent = true
                setItems((prev) =>
                  prev.map((it) => (it.id === assistantId ? { ...it, content: it.content + obj.delta! } : it)),
                )
              }
              if (obj.done) {
                break
              }
            }
          }
        }
        // 如果流式结束后没有内容，回退到 Mock
        if (!hasContent) {
          const mockReply = buildMockAnswer(question, redactContact)
          setItems((prev) =>
            prev.map((it) => (it.id === assistantId ? { ...it, content: mockReply } : it)),
          )
        }
      } else {
        const data = await resp.json().catch(() => ({}))
        if (!resp.ok) {
          const msg = typeof data?.error === 'string' ? data.error : '请求失败'
          throw new Error(msg)
        }
        const reply = typeof data?.reply === 'string' ? data.reply : ''
        if (!reply) throw new Error('返回内容为空')
        setItems((prev) => [...prev, { id: uid(), role: 'assistant', content: reply }])
      }
    } catch (e: any) {
      // API 失败时，自动回退到 Mock 模式
      console.warn('[HRChat] API 请求失败，回退到 Mock 模式:', e?.message)
      const mockReply = buildMockAnswer(question, redactContact)
      setItems((prev) => [...prev, { id: uid(), role: 'assistant', content: mockReply }])
    } finally {
      setLoading(false)
    }
  }

  function retryLast() {
    const lastUser = [...items].reverse().find((i) => i.role === 'user')
    if (lastUser) send(lastUser.content)
  }

  function clearChat() {
    setItems([
      {
        id: uid(),
        role: 'assistant',
        content: '你好，我是"刘生杰"的简历助手。你可以直接问我关于经历/项目/成果/技能/匹配度的问题。',
      },
    ])
    setError(null)
    setIsNearBottom(true)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[360px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-border bg-card shadow-2xl ring-1 ring-black/5 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">HR 助手</div>
                <div className="text-xs text-muted-foreground">基于简历回答问题</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-2 rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                aria-label="Clear chat"
                type="button"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                aria-label="Close"
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Redact Toggle */}
          <div className="px-4 py-2 border-b border-border flex items-center justify-between gap-3 bg-secondary/20 shrink-0">
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <Sparkles size={14} />
              <span>脱敏联系方式 / Redact</span>
            </div>
            <button
              onClick={() => setRedactContact((v) => !v)}
              className={`h-6 w-10 rounded-full transition-colors ${redactContact ? 'bg-primary' : 'bg-muted'
                }`}
              aria-label="Toggle redact"
              type="button"
            >
              <span
                className={`block h-4 w-4 rounded-full bg-white shadow transition-transform ${redactContact ? 'translate-x-5' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>

          {/* 消息列表 - 高度调整，不包含预设问题 */}
          <div
            ref={listRef}
            onScroll={handleScroll}
            className="h-[280px] overflow-y-auto px-4 py-3 space-y-4 bg-background/50"
          >
            {items.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground'
                    }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading ? (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm bg-card text-muted-foreground border border-border flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="text-xs text-destructive text-center flex items-center justify-center gap-2">
                <span>{error}</span>
                <button
                  onClick={retryLast}
                  className="px-2 py-0.5 rounded border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
                  type="button"
                >
                  重试
                </button>
              </div>
            ) : null}
          </div>

          {/* 预设问题 - 固定区域，不随消息滚动 */}
          <div className="px-3 py-2 border-t border-border bg-secondary/10 shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {suggested.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="text-xs px-2.5 py-1 rounded-full border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-50"
                  type="button"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* 输入框 */}
          <form
            className="p-3 border-t border-border bg-card flex items-center gap-2 rounded-b-2xl shrink-0"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请输入问题..."
              className="flex-1 h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 transition-opacity hover:opacity-90"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="h-12 px-6 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          type="button"
        >
          <Bot size={18} />
          <span className="text-sm font-medium">HR 助手</span>
        </button>
      )}
    </div>
  )
}
