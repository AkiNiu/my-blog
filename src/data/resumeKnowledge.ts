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

export type ResumeAchievement = {
  label: string
  value: string
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
  type: '论文' | '专利'
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

export const resumeKnowledge = {
  profile: {
    name: 'AkiLiu',
    headline: 'Engineer-Turned AI Product Manager',
    location: '南京',
    extra: '211 硕士（东华大学）· 复杂系统与数据分析 · 全栈落地能力',
    pitch: '不满足于平庸的交付，始终保持对新技术的渴望。擅长以工程思维拆解复杂业务，用高标准的产出定义产品质感。不仅仅是定义需求，更致力于通过 Agentic Workflow 与数据驱动，构建经得起推敲的智能化解决方案。',
  },
  contact: {
    phone: '152****0915',
    email: 'akihope4love@gmail.com',
    github: 'https://github.com/yourname',
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
    'AI 驱动提效：擅长构建自动化工作流，沉淀 Prompt 库与方法论，将 AI 能力转化为实际生产力',
    '产品全流程：需求分析-原型-协同-迭代闭环，偏好用数据与可量化指标驱动决策',
    '前沿技术视野：理工科硕士背景，熟悉 Agent Skill 标准与 MCP（模型上下文协议），理解 Agentic Workflow 范式，可与研发深度同频',
    '复杂系统建模：擅长把复杂业务拆解为可落地的数据结构与流程规则，适配 B 端场景',
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
      type: '专利',
      language: '中文',
      title: '一种高抗压机织间隔织物及其复合材料连续化制备方法',
      note: '发明专利（已授权） · 涉及工艺流程的标准化与连续化设计（工程落地思维）'
    },
  ] as ResumePublication[],
  experience: [
    {
      date: '2023.10 — 至今',
      title: '南京康乐电力工程技术有限公司',
      subtitle: '研发部 · AI/智能化产品经理',
      bullets: [
        '负责“检E通3.0”电力运维智能化平台的规划与迭代',
        '设计多模态诊断方案，融合图像/时序/文本，目标诊断准确率>95%',
        '构建设备健康度预测模型，实现运维由事后向事前转型',
        'LLM驱动需求挖掘，构建30+典型场景Persona，效率提升500%',
        '规划AR远程协作与知识图谱架构，沉淀50万+缺陷案例库',
        '设计智能表单引擎与数据驾驶舱，方案评审一次通过率100%',
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
      role: 'AI产品经理（规划与落地推进）',
      result: '规划智能化作业闭环，设计多模态诊断与健康度模型，目标诊断准确率>95%。',
      summary: '面向电力现场运维，将非结构化采集、诊断决策、闭环留痕纳入一体化产品流程。',
      outcomes: [
        '多模态诊断方案设计（图像/时序/文本融合），目标诊断准确率>95%',
        '设备健康度预测模型规划，推动运维从事后走向事前',
        'AR远程协作与知识图谱架构规划，沉淀50万+缺陷案例库',
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
      result: '将投标/中标信息筛选与结构化提取自动化，减少重复劳动并提升洞察效率。',
      summary: '面向投标/中标公告，构建从抓取/解析/清洗到分析输出的自动化工作流。',
      outcomes: [
        '自动化处理文档与表格抽取（PDF/结构化数据）',
        '沉淀可复用的分析模板与规则，显著减少人工筛选成本',
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
      result: '进行 C 端产品方向验证与原型迭代，沉淀需求洞察与体验设计方法。',
      summary: '基于目标用户痛点提出产品假设，持续迭代信息架构、关键流程与交互体验。',
      outcomes: [
        '完成核心流程原型与交互设计迭代（可演示）',
        '沉淀竞品拆解与用户需求假设（可复用到后续迭代）',
      ],
      tags: ['C端产品', '增长/留存假设', '交互设计', '验证迭代'],
      materials: [
        { type: '原型（高保真）', visibility: '初轮可看', note: '交互演示版（脱敏）' },
        { type: '方案PPT', visibility: '深挖可看', note: '包含更完整的增长与商业化假设' },
      ],
    },
    {
      name: '检E通 2.0 · 居配工程数字化验收',
      role: '数据治理',
      result: '沉淀10万+条结构化工程样本，LBS与时间戳水印保障数据可信。',
      summary: '围绕验收“数据底座”与可信采集，解决非结构化数据难利用、源头污染等问题。',
      outcomes: [
        '设计标准化 SOP 与任务驱动采集，沉淀10万+结构化工程样本',
        '引入 LBS 电子围栏与时间戳水印，保障数据可信与合规留痕',
      ],
      tags: ['数据治理', '工程验收', '合规/防伪'],
      materials: [
        { type: '方案PPT', visibility: '初轮可看', note: '脱敏版' },
        { type: '业务流程图', visibility: '初轮可看' },
        { type: '演示视频', visibility: '深挖可看', note: '可提供打码版' },
      ],
    },
    {
      name: '低压通 · 配电网全生命周期管理（0→1）',
      role: '产品经理（流程重构/可研/立项推动）',
      result: '建设-运维数据贯通与防伪证据链设计，推动项目立项。',
      summary: '围绕“工程全生命周期”重构流程与数据口径，打通建设期与运维期的数据闭环。',
      outcomes: [
        '提出建设-运维数据贯通方案，降低交付与运维的数据割裂成本',
        '设计“超级水印+时间戳”证据链能力，降低廉政与合规风险',
        '输出可行性研究与竞品/ROI分析，推动立项',
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
  achievements: [
    { label: '评审一次通过率', value: '80%（原型）/ 100%（驾驶舱）' },
    { label: '输出产物', value: '6张高保真原型、10份文档（PRD/可研）' },
    { label: '调研沉淀', value: '30+用户故事、6次深访、10+小时录音' },
  ] satisfies ResumeAchievement[],
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
- 2023.10-至今 南京康乐电力 研发部 AI/智能化产品经理：检E通3.0/2.0、低压通，涉及多模态诊断、健康度模型、数据治理、防伪证据链、驾驶舱、知识图谱/案例库等
- 2019.05-2021.08 江苏古田化工/舜天服饰：ERP流程标准化、BOM与生产数据结构化管理

量化成果：
- 评审一次通过率：80%（原型）/ 100%（驾驶舱）
- 输出产物：6张高保真原型、10份文档（PRD/可研）
- 调研沉淀：30+用户故事、6次深访、10+小时录音
`.trim()

