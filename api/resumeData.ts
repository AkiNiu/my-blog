export const resumeKnowledge = {
  profile: {
    name: '刘生杰',
    headline: 'Engineer-Turned AI Product Manager',
    location: '南京',
    extra: '211 硕士（东华大学）· 复杂系统与数据分析 · 全栈落地能力',
    pitch:
      '不满足于平庸的交付，始终保持对新技术的渴望。擅长以工程思维拆解复杂业务，用高标准的产出定义产品质感。不仅仅是定义需求，更致力于通过 Agentic Workflow 与数据驱动，构建经得起推敲的智能化解决方案。',
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
  },
  strengths: [
    'AI 驱动提效：擅长构建自动化工作流，沉淀 Prompt 库与方法论，将 AI 能力转化为实际生产力',
    '产品全流程：需求分析-原型-协同-迭代闭环，偏好用数据与可量化指标驱动决策',
    '前沿技术视野：理工科硕士背景，熟悉 Agent Skill 标准与 MCP（模型上下文协议），理解 Agentic Workflow 范式，可与研发深度同频',
    '复杂系统建模：擅长把复杂业务拆解为可落地的数据结构与流程规则，适配 B 端场景',
  ],
  experience: [
    {
      date: '2023.10 — 至今',
      title: '南京康乐电力工程技术有限公司',
      subtitle: '研发部 · 智能化产品经理',
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
  ],
  projects: [
    {
      name: '检E通 3.0 · 电力运维智能化作业平台（0→1）',
      role: 'AI产品经理（规划与落地推进）',
      result: '规划智能化作业闭环，设计多模态诊断与健康度模型，目标诊断准确率>95%。',
    },
    {
      name: '招采数据分析自动化项目（个人开发）',
      role: '产品 + 开发（自研数据分析流水线）',
      result: '将投标/中标信息筛选与结构化提取自动化，减少重复劳动并提升洞察效率。',
    },
    {
      name: 'Our Pact（我们的约定）· C 端产品探索',
      role: '产品负责人（个人项目）',
      result: '进行 C 端产品方向验证与原型迭代，沉淀需求洞察与体验设计方法。',
    },
    {
      name: '检E通 2.0 · 居配工程数字化验收',
      role: '数据治理',
      result: '沉淀10万+条结构化工程样本，LBS与时间戳水印保障数据可信。',
    },
    {
      name: '低压通 · 配电网全生命周期管理（0→1）',
      role: '产品经理（流程重构/可研/立项推动）',
      result: '建设-运维数据贯通与防伪证据链设计，推动项目立项。',
    },
  ],
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
  ],
  education: [
    {
      school: '东华大学',
      degree: '工学硕士 · 材料与化工（复杂系统与数据分析方向）',
      time: '2021.09 — 2024.06',
    },
    {
      school: '天津工业大学',
      degree: '双学位，工学学位，管理学学位',
      time: '2014.09 — 2018.07',
    },
  ],
} as const

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

