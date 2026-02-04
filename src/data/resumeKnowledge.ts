export type ResumeExperience = {
  date: string
  title: string
  subtitle: string
  bullets: string[]
}

export type ResumeProject = {
  name: string
  role: string
  result: string
  summary?: string
  outcomes?: string[]
  tags?: string[]
  materials?: ResumeMaterial[]
}

export type ResumeEducation = {
  school: string
  degree: string
  time: string
  detail: string
}

export type ResumeLink = {
  label: string
  url?: string
  note?: string
}

export type ResumePreferences = {
  targetRoles: string[]
  targetCities: string[]
  workType: string
  availability: string
  salary: string
}

export type ResumePublication = {
  title: string
  language: '中文' | '英文'
  type: '论文' | '专利' | '发明专利'
  year?: string
  note?: string
  url?: string
}

export type ResumeMaterialType =
  | '方案PPT'
  | 'PRD文档'
  | '原型（低保真）'
  | '原型（高保真）'
  | '业务流程图'
  | '演示视频'
  | '截图/图片'

export type ResumeVisibility = '公开' | '初轮' | '终面' | '初轮可看' | '深挖可看'

export type ResumeMaterial = {
  type: ResumeMaterialType
  visibility: ResumeVisibility
  note?: string
  url?: string
}

export type ResumePersonality = {
  mbti: string
  traits: string[]
  aiJourney: string[]
  hobbies: string[]
  workHabits: {
    morning: string
    workload: string
    origin: string
    stressResistance: string
  }
}

export const resumeKnowledge = {
  profile: {
    name: 'AkiLiu',
    headline: 'Engineer-Turned AI Product Manager',
    location: '南京',
    extra: '211 硕士（东华大学）· 复杂系统与数据分析 · 全栈落地能力',
    pitch: '擅长用工程思维拆解复杂 B 端业务，将 AI 技术转化为可落地的商业价值。不只是定义功能，更交付可量化的效率提升与极佳的用户体验。相比于堆砌技术概念，我更关注如何让 Agentic Workflow 真正为业务降本增效。',
  },
  // 个人特质 - 供HR更全面了解候选人
  personality: {
    mbti: 'INTJ',
    traits: [
      '热爱学习新工具，持续关注 AI/科技行业动态',
      '崇尚专业与技术，追求极致的工程思维',
      '极客风格：能自己组装电脑、熟练使用各类软件工具',
      '拥抱变化：在 AI 浪潮中始终保持好奇与行动力',
    ],
    workHabits: {
      morning: '每天6点起床，7点到公司，9点上班前进行1-2小时自主学习',
      workload: '日均工作时长10小时以上，工作投入度高',
      stressResistance: '极强抗压能力：习惯高强度研发节奏，能同时并行处理多个项目',
      origin: '硕士期间养成的早起与自律习惯，一直保持至今',
    },
    aiJourney: [
      '2023年1月：ChatGPT 发布后两个月即成为第一批用户',
      '科研期间：深度使用文本生成能力辅助论文写作与数据分析',
      '自学路径：从 Prompt Engineering 到机器学习、深度学习入门',
      '广泛体验：OpenAI GPT系列、Google Gemini、xAI Grok、多模态模型等',
    ],
    hobbies: ['研究AI工具', '组装电脑', '阅读科技资讯', '探索效率工具'],
  },
  contact: {
    phone: '152****0915',
    email: 'akihope4love@gmail.com',
    github: 'https://github.com/AkiNiu',
  },
  preferences: {
    targetRoles: ['AI产品经理', '数据产品经理', '智能化产品经理'],
    targetCities: ['南京'],
    workType: '全职',
    availability: '可沟通',
    salary: '14–18K（可谈）',
  } satisfies ResumePreferences,
  links: [
    { label: '作品集（方案PPT/原型/视频）', note: '按面试阶段提供：初轮仅概要与脱敏材料' },
    { label: 'GitHub（可选）', note: '默认不公开，面试阶段可按需提供' },
    { label: '小红书（可选）', note: '默认不公开，面试阶段可按需提供' },
  ] as ResumeLink[],
  strengths: [
    'AI 场景落地能力：不仅仅写 Prompt，更擅长构建自动化工作流，将 AI 能力转化为实际生产力（如效率提升 500%）',
    '业务与技术桥梁：理工科背景赋能，能精准翻译业务需求给研发，也能从技术视角评估方案可行性，降低沟通成本',
    '数据驱动决策：拒绝“拍脑袋”做产品，习惯用数据与可量化指标闭环验证，保障产品迭代方向正确',
    '复杂系统设计：B 端业务专家，擅长将复杂的业务逻辑拆解为清晰的流程与结构，交付高可用方案',
  ],
  publications: [
    {
      type: '论文',
      language: '英文',
      title: 'Effect of weft binding structure on compressive properties...',
      note: 'WoS 收录 · 探究结构变量对性能影响（数据相关性分析与实验设计能力）'
    },
    {
      type: '论文',
      language: '中文',
      title: '纬向V形机织间隔复合材料压缩性能有限元分析',
      note: '北大核心 · 复杂物理系统的数值仿真与建模（有限元分析/仿真逻辑）'
    },
    {
      type: '发明专利',
      language: '中文',
      title: '一种高抗压机织间隔织物及其复合材料连续化制备方法',
      note: '已授权 · 涉及工艺流程的标准化与连续化设计（工程落地思维）'
    },
  ] as ResumePublication[],
  experience: [
    {
      date: '2023.10 — 至今',
      title: '南京康乐电力工程技术有限公司',
      subtitle: '研发部 · AI/智能化产品经理',
      bullets: [
        '数据底座夯实：深入理解业务逻辑，协助梳理标准化SOP，通过一线调研落地LBS防伪与数据清洗场景',
        '智能化升级：负责3.0需求分析与原型落地，将红外图像/台账等多模态数据转化为可视化方案',
        '流程闭环：梳理从勘察到结算的端到端业务流程，为打通建设期与运维期的数据闭环提供详实支撑',
        '效率提升：用LLM辅助需求挖掘，构建用户场景Persona，提升文档撰写与需求分析效率',
      ],
    },
    {
      date: '2019.05 — 2021.08',
      title: '江苏古田化工 / 舜天服饰',
      subtitle: '业务与数据分析',
      bullets: [
        '在ERP中推进订单流程标准化，周期缩短20%',
        '负责BOM与生产数据的结构化管理与多方协同，交付率100%',
      ],
    },
  ] satisfies ResumeExperience[],
  projects: [
    {
      name: '检E通 3.0 · 电力运维智能化作业平台（0→1）',
      role: 'AI产品经理（需求分析与原型设计）',
      result: '完成产品方案设计，目标诊断准确率>95%',
      summary: '面向电力现场运维，打造“采集-诊断-闭环”的一体化智能平台，解决传统运维高度依赖人工经验、效率低的问题。',
      outcomes: [
        '需求分析：深入一线调研运维痛点，提炼核心需求',
        '方案设计：将红外图像、台账文本等多模态数据转化为可视化诊断方案',
        '原型交付：完成高保真原型设计，方案评审通过',
        '知识沉淀：协助设计知识库架构，为案例积累提供基础',
      ],
      tags: ['多模态', '电力运维', '知识库/知识图谱', '数据闭环'],
      materials: [
        { type: '方案PPT', visibility: '初轮可看', note: '脱敏版，展示方法与结构' },
        { type: 'PRD文档', visibility: '深挖可看', note: '涉及业务细节，需面试阶段提供' },
        { type: '原型（低保真）', visibility: '初轮可看', note: '展示核心流程与信息架构' },
        { type: '原型（高保真）', visibility: '深挖可看', note: '展示关键交互与细节策略' },
        { type: '业务流程图', visibility: '初轮可看' },
        { type: '演示视频', visibility: '深挖可看', note: '可提供打码版短视频' },
      ],
    },
    {
      name: '招采数据分析自动化项目（个人开发）',
      role: '产品 + 开发（自研数据分析流水线）',
      result: '人工筛选时间从 3 天/次缩短至 5 分钟/次',
      summary: '针对招投标信息量大、人工筛选耗时痛点，开发的自动化数据分析工具，实现从采集到分析的全流程无人值守。',
      outcomes: [
        '自动化ETL流水线：实现从采集到分析的全流程自动化',
        'PDF解析：开发解析工具，准确提取非结构化数据',
        '显著提效：将重复性机械劳动自动化，释放人力专注于决策分析',
      ],
      tags: ['数据分析', '自动化', 'ETL', 'PDF解析'],
      materials: [
        { type: '方案PPT', visibility: '初轮可看', note: '方法论与流程拆解' },
        { type: '截图/图片', visibility: '初轮可看', note: '输出示例与分析结果（脱敏）' },
        { type: '演示视频', visibility: '深挖可看', note: '端到端演示（打码）' },
      ],
    },
    {
      name: 'Our Pact（我们的约定）· C 端产品探索',
      role: '产品负责人（个人项目）',
      result: '完成MVP原型设计，沉淀C端产品方法论',
      summary: '针对目标管理痛点，探索社交+激励的C端产品方向。',
      outcomes: [
        '用户调研：访谈目标用户，提炼核心需求',
        '竞品分析：拆解Forest等多款产品，学习增长与留存机制',
        '原型设计：完成高保真交互原型，可演示核心流程',
        '方法沉淀：积累C端产品设计与增长假设验证经验',
      ],
      tags: ['C端产品', '增长/留存假设', '交互设计', '验证迭代'],
      materials: [
        { type: '原型（高保真）', visibility: '初轮可看', note: '交互演示版（脱敏）' },
        { type: '方案PPT', visibility: '深挖可看', note: '包含更完整的增长与商业化假设' },
      ],
    },
    {
      name: '检E通 2.0 · 项目重构方案设计',
      role: '产品战略规划',
      result: '完整重构方案获管理层认可，明确商业价值定位',
      summary: '针对旧版本用户体验问题和研发维护成本高的痛点，设计系统性重构方案。',
      outcomes: [
        '现状诊断：深入一线调研，识别用户痛点、研发瓶颈和市场压力',
        '商业分析：明确重构的商业价值（客户拿单、保单、降本）',
        '实施路线：设计三阶段重构路径（需求积累→MVP开发→实战验证）',
        '战略汇报：输出完整方案PPT，获管理层认可',
      ],
      tags: ['项目重构', '产品战略', '商业分析', '实施路线'],
      materials: [
        { type: '方案PPT', visibility: '初轮可看', note: '脱敏版' },
        { type: '业务流程图', visibility: '初轮可看' },
        { type: '演示视频', visibility: '深挖可看', note: '可提供打码版' },
      ],
    },
    {
      name: '低压通 · 配电网全生命周期管理（0→1）',
      role: '产品经理（流程重构/可研/立项推动）',
      result: '打通建设与运维数据壁垒，降低全生命周期成本',
      summary: '重构配电网全生命周期管理流程，解决建设期与运维期数据割裂问题，实现资产价值最大化。',
      outcomes: [
        '数据贯通：统一数据标准，消除跨部门数据孤岛，提升资产管理效率',
        '立项推动：输出高质量可行性研究报告与 ROI 分析，成功推动项目立项',
      ],
      tags: ['流程重构', '数据贯通', '证据链', '可研/立项'],
      materials: [
        { type: '方案PPT', visibility: '初轮可看', note: '脱敏版' },
        { type: '业务流程图', visibility: '初轮可看' },
        { type: '原型（低保真）', visibility: '初轮可看' },
        { type: '原型（高保真）', visibility: '深挖可看' },
        { type: '演示视频', visibility: '深挖可看', note: '可提供打码版短视频' },
      ],
    },
  ] satisfies ResumeProject[],
  skills: [
    '产品规划',
    '需求分析',
    '原型设计',
    '数据整理',
    'Prompt Engineering',
    'RAG/Agent 概念理解',
    'Python（Pandas）',
    'SQL',
    'Excel/PowerPoint/Word',
    '项目协调',
  ],
  education: [
    {
      school: '东华大学',
      degree: '工学硕士 · 材料与化工（复杂系统与数据分析方向）',
      time: '2021.09 — 2024.06',
      detail: '基于数值仿真算法的材料性能预测模型研究；参数化建模与算法优化，Z向性能提升15%。',
    },
    {
      school: '天津工业大学',
      degree: '双学位，工学学位，管理学学位',
      time: '2014.09 — 2018.07',
      detail: '绩点3.6/4.0；校级卓越管理者，连续3年优秀团干，担任党支部书记并运营新媒体平台。',
    },
  ] satisfies ResumeEducation[],
  awards: [
    '2024-2025连续2年被评为公司明星员工',
    '2021-2023 硕士研究生学业二等奖学金',
    '2022 硕士研究生学业二等奖学金',
    '2017 校长二等奖学金',
    '2016 校长三等奖学金',
    '2016 校级“道德高尚”类单项奖学金',
  ],
}

export const resumePromptContext = `
候选人基本信息：
- 姓名：${resumeKnowledge.profile.name}
- 方向：${resumeKnowledge.profile.headline}
- 城市：${resumeKnowledge.profile.location}
- 亮点：AI Native 产品思维、技术理解与沟通、全栈产品能力、复杂系统建模

个人特质：
- MBTI：${resumeKnowledge.personality.mbti}（理性、独立、追求效率）
- 性格：${resumeKnowledge.personality.traits.join('；')}
- 爱好：${resumeKnowledge.personality.hobbies.join('、')}
- AI经历：${resumeKnowledge.personality.aiJourney.join('；')}
- 工作习惯：${resumeKnowledge.personality.workHabits.morning}；${resumeKnowledge.personality.workHabits.workload}；${resumeKnowledge.personality.workHabits.stressResistance}

求职偏好：
- 意向岗位：${resumeKnowledge.preferences.targetRoles.join(' / ')}
- 意向城市：${resumeKnowledge.preferences.targetCities.join(' / ')}
- 工作性质：${resumeKnowledge.preferences.workType}
- 到岗时间：${resumeKnowledge.preferences.availability}
- 薪资：${resumeKnowledge.preferences.salary}

内容资产：
- 作品集：方案PPT/原型/演示视频（按面试阶段分级提供，初轮仅展示概要与脱敏材料）
- GitHub/小红书：默认不公开，面试阶段按需提供
- 论文/专利：本科期间 2 篇论文（中/英各 1）与 1 项发明专利（名称待补充）

工作经历要点：
- 2023.10-至今 南京康乐电力 研发部 产品经理：检E通3.0/2.0、低压通，涉及多模态诊断、健康度模型、数据治理、防伪证据链、驾驶舱、知识图谱/案例库等
- 2019.05-2021.08 江苏古田化工/舜天服饰：ERP流程标准化、BOM与生产数据结构化管理

`.trim()

