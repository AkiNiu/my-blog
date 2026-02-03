/**
 * RAG 检索器 - 基于关键词匹配检索相关知识块
 * 
 * 设计原则：
 * 1. 轻量级：用关键词匹配替代 Embedding，零成本
 * 2. 可调试：返回匹配分数，便于排查问题
 * 3. 可扩展：预留 Embedding 扩展接口
 */

import { personalKnowledge, KnowledgeChunk } from './personalKnowledge.js'

export type RetrievalResult = {
    chunk: KnowledgeChunk
    score: number
    matchedKeywords: string[]
}

/**
 * 简单分词函数
 * 支持中文（按字符）和英文（按空格）
 */
function tokenize(text: string): string[] {
    const lower = text.toLowerCase()
    // 移除标点，按空格和中文字符分割
    const cleaned = lower.replace(/[^\u4e00-\u9fa5a-z0-9\s]/g, ' ')
    const tokens = cleaned.split(/\s+/).filter(t => t.length > 0)

    // 对于中文，也按单字分割（便于匹配）
    const chineseChars = lower.match(/[\u4e00-\u9fa5]/g) || []

    return [...new Set([...tokens, ...chineseChars])]
}

/**
 * 计算单个 chunk 的匹配分数
 */
function scoreChunk(chunk: KnowledgeChunk, queryTerms: string[]): RetrievalResult {
    let score = 0
    const matchedKeywords: string[] = []

    // 关键词匹配（权重 x3）
    for (const keyword of chunk.keywords) {
        const kwLower = keyword.toLowerCase()
        for (const term of queryTerms) {
            if (kwLower.includes(term) || term.includes(kwLower)) {
                score += 3
                if (!matchedKeywords.includes(keyword)) {
                    matchedKeywords.push(keyword)
                }
            }
        }
    }

    // 内容匹配（权重 x1）
    const contentLower = chunk.content.toLowerCase()
    for (const term of queryTerms) {
        if (term.length >= 2 && contentLower.includes(term)) {
            score += 1
        }
    }

    return { chunk, score, matchedKeywords }
}

/**
 * 检索相关知识块
 * 
 * @param query - 用户问题
 * @param options - 检索选项
 * @returns 按分数排序的 Top-K 结果
 */
export function retrieveRelevantChunks(
    query: string,
    options: {
        projectFilter?: string
        categoryFilter?: string
        topK?: number
        minScore?: number
    } = {}
): RetrievalResult[] {
    const { projectFilter, categoryFilter, topK = 3, minScore = 1 } = options

    const queryTerms = tokenize(query)

    if (queryTerms.length === 0) {
        return []
    }

    // 过滤 + 评分
    const results = personalKnowledge
        .filter(chunk => {
            // 项目过滤
            if (projectFilter && chunk.category === 'project') {
                const contentLower = chunk.content.toLowerCase()
                const filterLower = projectFilter.toLowerCase()
                if (!contentLower.includes(filterLower) &&
                    !chunk.keywords.some(k => k.toLowerCase().includes(filterLower))) {
                    return false
                }
            }
            // 分类过滤
            if (categoryFilter && chunk.category !== categoryFilter) {
                return false
            }
            return true
        })
        .map(chunk => scoreChunk(chunk, queryTerms))
        .filter(result => result.score >= minScore)
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)

    return results
}

/**
 * 将检索结果格式化为 Prompt 上下文
 */
export function formatChunksForPrompt(results: RetrievalResult[]): string {
    if (results.length === 0) {
        return ''
    }

    const formatted = results.map((r, i) => {
        const categoryLabel = getCategoryLabel(r.chunk.category)
        return `[${i + 1}] ${categoryLabel}\n${r.chunk.content}`
    })

    return [
        '【相关材料】',
        ...formatted,
    ].join('\n\n')
}

/**
 * 获取分类的中文标签
 */
function getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
        personality: '🧠 性格特质',
        work_style: '💼 工作风格',
        project: '🚀 项目详情',
        skill: '⚡ 技能详解',
        education: '🎓 教育经历',
        fun_fact: '✨ 趣味信息',
    }
    return labels[category] || category
}
