/**
 * 意图路由器 - 根据用户问题分类意图，决定处理策略
 * 
 * 设计原则：
 * 1. 规则优先：用关键词匹配处理高频意图，快且可解释
 * 2. 安全兜底：未识别时默认使用"快速筛选"模式
 * 3. 项目识别：识别具体项目名，触发 RAG 检索
 */

export type IntentType =
    | 'quick_screen'      // 快速筛选：简洁要点式回答
    | 'deep_interview'    // 深度面试：STAR 结构详细展开
    | 'project_deep_dive' // 项目深挖：触发 RAG 检索
    | 'personal_trait'    // 个人特质：性格、风格类问题

export type PromptStyle = 'concise' | 'star' | 'rag_enhanced'

export type IntentResult = {
    intent: IntentType
    confidence: number            // 0-1 置信度
    projectName?: string          // 如果是项目深挖，识别的项目名
    suggestedPromptStyle: PromptStyle
    matchedKeywords: string[]     // 匹配到的关键词（用于调试）
}

// 项目名称模式
const PROJECT_PATTERNS: { pattern: RegExp; projectName: string }[] = [
    { pattern: /检e通|检易?通|jiet/i, projectName: '检E通' },
    { pattern: /招采|招标|投标|bidding/i, projectName: '招采数据分析' },
    { pattern: /our\s*pact|约定|情侣/i, projectName: 'Our Pact' },
    { pattern: /低压通|配电网/i, projectName: '低压通' },
]

// 意图关键词配置
const INTENT_KEYWORDS = {
    quick_screen: ['总结', '概述', '优势', '亮点', '匹配', '为什么', '简单介绍', '简介', '背景'],
    deep_interview: ['怎么做', '如何做', '细节', 'star', '挑战', '困难', '具体', '深入', '过程', '步骤'],
    personal_trait: ['mbti', '性格', '人格', '风格', '沟通', '合作', '习惯', '特质', '特点'],
}

/**
 * 主分类函数
 */
export function classifyIntent(question: string): IntentResult {
    const q = question.toLowerCase()
    const matchedKeywords: string[] = []

    // Step 1: 检查是否包含项目名
    for (const { pattern, projectName } of PROJECT_PATTERNS) {
        if (pattern.test(q)) {
            matchedKeywords.push(projectName)

            // 如果同时有"深挖"意图词，返回 project_deep_dive
            const hasDeepIntent = INTENT_KEYWORDS.deep_interview.some(kw => q.includes(kw))
            if (hasDeepIntent) {
                return {
                    intent: 'project_deep_dive',
                    confidence: 0.9,
                    projectName,
                    suggestedPromptStyle: 'rag_enhanced',
                    matchedKeywords,
                }
            }

            // 如果只提到项目名，也倾向于 deep dive
            return {
                intent: 'project_deep_dive',
                confidence: 0.75,
                projectName,
                suggestedPromptStyle: 'rag_enhanced',
                matchedKeywords,
            }
        }
    }

    // Step 2: 检查个人特质类问题
    for (const kw of INTENT_KEYWORDS.personal_trait) {
        if (q.includes(kw)) {
            matchedKeywords.push(kw)
            return {
                intent: 'personal_trait',
                confidence: 0.85,
                suggestedPromptStyle: 'rag_enhanced',
                matchedKeywords,
            }
        }
    }

    // Step 3: 检查深度面试类问题
    for (const kw of INTENT_KEYWORDS.deep_interview) {
        if (q.includes(kw)) {
            matchedKeywords.push(kw)
            return {
                intent: 'deep_interview',
                confidence: 0.8,
                suggestedPromptStyle: 'star',
                matchedKeywords,
            }
        }
    }

    // Step 4: 检查快速筛选类问题
    for (const kw of INTENT_KEYWORDS.quick_screen) {
        if (q.includes(kw)) {
            matchedKeywords.push(kw)
            return {
                intent: 'quick_screen',
                confidence: 0.85,
                suggestedPromptStyle: 'concise',
                matchedKeywords,
            }
        }
    }

    // Step 5: 默认兜底 - 快速筛选
    return {
        intent: 'quick_screen',
        confidence: 0.5,
        suggestedPromptStyle: 'concise',
        matchedKeywords: [],
    }
}

/**
 * 获取意图的中文描述（用于前端显示）
 */
export function getIntentLabel(intent: IntentType): string {
    const labels: Record<IntentType, string> = {
        quick_screen: '📋 快速筛选',
        deep_interview: '🔍 深度面试',
        project_deep_dive: '🚀 项目深挖',
        personal_trait: '🧠 个人特质',
    }
    return labels[intent]
}
