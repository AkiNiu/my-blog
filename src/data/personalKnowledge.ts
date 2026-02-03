/**
 * 个人知识库 - 用于 RAG 检索
 * 
 * 设计原则：
 * 1. 扁平化：每个 chunk 独立，不依赖其他 chunk
 * 2. 关键词显式化：用显式关键词匹配，不依赖 NLP
 * 3. 人类可读：content 直接可用于 Prompt
 */

export type KnowledgeCategory =
    | 'personality'   // 性格特质
    | 'work_style'    // 工作风格
    | 'project'       // 项目详情
    | 'skill'         // 技能详解
    | 'education'     // 教育经历
    | 'fun_fact'      // 趣味信息

export type KnowledgeChunk = {
    id: string
    category: KnowledgeCategory
    keywords: string[]          // 检索用关键词（越精准越好）
    content: string             // 实际内容（人类可读，用于 Prompt）
    visibility: '公开' | '初轮' | '终面'  // 隐私级别
}

export const personalKnowledge: KnowledgeChunk[] = [
    // ========== 性格特质 ==========
    {
        id: 'mbti-intj',
        category: 'personality',
        keywords: ['mbti', 'intj', '性格', '人格', '建筑师'],
        content: `MBTI 类型：INTJ（建筑师型人格）
- 核心特质：独立思考、追求效率、系统性规划
- 工作表现：喜欢深度工作，擅长将复杂问题拆解为可执行方案
- 团队角色：常担任规划者和问题解决者，偏好逻辑驱动的讨论`,
        visibility: '公开',
    },
    {
        id: 'personality-traits',
        category: 'personality',
        keywords: ['性格', '特质', '特点', '优点', '缺点'],
        content: `性格特质总结：
- 优点：逻辑清晰、执行力强、追求卓越、善于总结方法论
- 待提升：有时过于追求完美、需要提醒自己更多倾听
- 压力应对：通过结构化拆解问题来缓解焦虑`,
        visibility: '公开',
    },

    // ========== 工作风格 ==========
    {
        id: 'work-communication',
        category: 'work_style',
        keywords: ['沟通', '合作', '协作', '风格', '交流'],
        content: `沟通与协作风格：
- 沟通偏好：异步沟通优先，文档驱动，减少低效会议
- 会议原则：议程明确、结果导向、会后有纪要
- 反馈风格：直接、具体、可执行，不绕弯子`,
        visibility: '公开',
    },
    {
        id: 'work-methodology',
        category: 'work_style',
        keywords: ['方法论', '工作方法', '习惯', '效率'],
        content: `工作方法论：
- 任务管理：GTD + 时间块，每日规划 + 周复盘
- AI 提效：善用 LLM 辅助需求分析、文档撰写、竞品调研，效率提升 5x
- 知识沉淀：每个项目结束后输出方法论文档，便于复用`,
        visibility: '公开',
    },

    // ========== 项目详情 ==========
    {
        id: 'project-jiet3-multimodal',
        category: 'project',
        keywords: ['检e通', '多模态', '诊断', '图像', '电力'],
        content: `检E通 3.0 多模态诊断方案：
- 图像通道：采用 CNN + Attention 机制提取设备缺陷特征
- 时序通道：分析设备运行趋势数据，识别异常模式
- 文本通道：基于运维日志的语义理解，提取关键信息
- 融合策略：Late Fusion，各通道独立建模后加权决策
- 目标指标：诊断准确率 > 95%`,
        visibility: '初轮',
    },
    {
        id: 'project-jiet3-health',
        category: 'project',
        keywords: ['检e通', '健康度', '预测', '模型'],
        content: `检E通 3.0 设备健康度预测模型：
- 输入特征：运行时长、负载历史、历史故障、环境因素
- 模型思路：时序预测 + 风险评分，输出健康度百分比
- 业务价值：从"事后维修"转向"事前预防"，降低故障停机损失`,
        visibility: '初轮',
    },
    {
        id: 'project-bidding-pipeline',
        category: 'project',
        keywords: ['招采', '招标', '数据', '自动化', 'etl', '清洗'],
        content: `招采数据分析自动化项目技术方案：
- 数据源：江苏省电力招标公告（PDF/Excel 格式）
- 处理流程：解压 → Excel转CSV → 关键词过滤 → 数据合并 → 商机识别
- 过滤规则：白名单（软件、信息化）+ 黑名单（土建、绿化）
- 输出：结构化商机列表，支持快速筛选`,
        visibility: '公开',
    },
    {
        id: 'project-ourpact',
        category: 'project',
        keywords: ['our pact', '约定', 'c端', '产品'],
        content: `Our Pact（我们的约定）产品探索：
- 定位：帮助情侣/朋友建立可追溯的承诺管理工具
- 核心功能：创建约定 → 双方确认 → 执行追踪 → 回顾复盘
- 设计亮点：情感化设计、仪式感交互、隐私优先
- 当前状态：高保真原型完成，待用户验证`,
        visibility: '公开',
    },

    // ========== 技能详解 ==========
    {
        id: 'skill-prompt-engineering',
        category: 'skill',
        keywords: ['prompt', '提示词', 'llm', 'ai', '工程'],
        content: `Prompt Engineering 能力：
- 熟悉 System Prompt 结构设计（角色定义 + 约束 + 示例）
- 掌握 Chain-of-Thought、Few-shot 等常用技巧
- 实践：为简历助手设计多轮对话 Prompt，支持意图识别和风格切换
- 沉淀：个人 Prompt 模板库（需求分析、竞品调研、文档撰写）`,
        visibility: '公开',
    },
    {
        id: 'skill-rag-agent',
        category: 'skill',
        keywords: ['rag', 'agent', '检索', '知识库', 'agentic'],
        content: `RAG/Agent 理解与实践：
- 理论：理解 RAG 三要素（检索-增强-生成）、Agent 执行循环
- 实践：为个人网站实现轻量 RAG，用关键词匹配替代 Embedding
- 前沿关注：MCP（模型上下文协议）、Agent Skill 标准化`,
        visibility: '公开',
    },

    // ========== 趣味信息 ==========
    {
        id: 'fun-ai-efficiency',
        category: 'fun_fact',
        keywords: ['ai', '效率', '提效', '生产力'],
        content: `AI 提效实践：
- 日常使用 Claude/ChatGPT 辅助产品工作，节省 60%+ 重复劳动
- 构建个人 Prompt 库，覆盖需求分析、竞品调研、会议纪要等场景
- 曾用 LLM 驱动需求挖掘，一周内构建 30+ 典型场景 Persona`,
        visibility: '公开',
    },
    {
        id: 'fun-thesis',
        category: 'fun_fact',
        keywords: ['论文', '专利', '学术', '研究'],
        content: `学术成果：
- 发表 2 篇论文（1 篇英文 WoS 收录 + 1 篇中文核心）
- 1 项发明专利已授权
- 研究方向：复合材料性能预测与参数化建模`,
        visibility: '公开',
    },
]

/**
 * 根据分类获取知识块
 */
export function getChunksByCategory(category: KnowledgeCategory): KnowledgeChunk[] {
    return personalKnowledge.filter(chunk => chunk.category === category)
}

/**
 * 获取所有公开知识块
 */
export function getPublicChunks(): KnowledgeChunk[] {
    return personalKnowledge.filter(chunk => chunk.visibility === '公开')
}
