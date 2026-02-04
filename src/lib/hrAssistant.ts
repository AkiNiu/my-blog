import { resumeKnowledge } from '../data/resumeKnowledge'

export function buildMockAnswer(question: string, redactContact: boolean) {
  const q = question.toLowerCase()
  const { profile, contact, projects, experience, skills, education, personality } = resumeKnowledge

  // 性格/MBTI/爱好相关
  if (q.includes('性格') || q.includes('mbti') || q.includes('特质')) {
    return [
      `MBTI：${personality.mbti}`,
      `✓ ${personality.traits[0]}`,
      `✓ ${personality.traits[1]}`,
      `✓ ${personality.traits[2]}`,
    ].join('\n')
  }

  if (q.includes('爱好') || q.includes('兴趣') || q.includes('喜欢')) {
    return [
      '爱好偏极客风：',
      `✓ ${personality.hobbies.join('、')}`,
      `✓ 2023年初即成为ChatGPT第一批用户`,
    ].join('\n')
  }

  if (q.includes('ai') && (q.includes('经历') || q.includes('接触') || q.includes('了解'))) {
    return [
      'AI探索经历：',
      `✓ ${personality.aiJourney[0]}`,
      `✓ ${personality.aiJourney[2]}`,
      `✓ ${personality.aiJourney[3]}`,
    ].join('\n')
  }

  // 工作习惯/作息/加班/抗压相关
  if (q.includes('作息') || q.includes('习惯') || q.includes('加班') || q.includes('工作时间') || q.includes('考勤') || q.includes('抗压') || q.includes('压力')) {
    return [
      '工作习惯与抗压：',
      `✓ ${personality.workHabits.morning}`,
      `✓ ${personality.workHabits.workload}`,
      `✓ ${personality.workHabits.stressResistance}`,
    ].join('\n')
  }

  // 联系方式处理
  if ((q.includes('电话') || q.includes('手机号') || q.includes('邮箱') || q.includes('联系方式')) && redactContact) {
    return '脱敏模式已开启，请关闭后再询问联系方式。'
  }
  if (q.includes('电话') || q.includes('手机号')) return `电话：${contact.phone}`
  if (q.includes('邮箱') || q.includes('email')) return `邮箱：${contact.email}`
  if (q.includes('github')) return contact.github ? `GitHub：${contact.github}` : '简历未提供 GitHub 链接。'

  // 项目相关 - 精炼版
  if (q.includes('项目') || q.includes('代表项目') || q.includes('做过什么') || q.includes('ai项目')) {
    const topProjects = projects.slice(0, 3)
    return [
      '候选人有5个完整项目经历。',
      ...topProjects.map((p) => `✓ ${p.name.split('·')[0].trim()}：${p.result.slice(0, 30)}`),
    ].join('\n')
  }

  // 优势相关 - 精炼版
  if (q.includes('亮点') || q.includes('优势') || q.includes('为什么') || q.includes('总结')) {
    return [
      '候选人匹配度较高。',
      '✓ 2年B端产品经验',
      '✓ 211硕士（东华大学）',
      '✓ AI Native产品思维',
      '✓ 有落地项目（检E通3.0）',
      '✓ 数据驱动决策能力',
    ].join('\n')
  }

  // 经历相关 - 精炼版
  if (q.includes('经历') || q.includes('工作') || q.includes('公司')) {
    return [
      '两段工作经历：',
      `✓ ${experience[0]?.date}｜${experience[0]?.subtitle}`,
      `✓ ${experience[1]?.date}｜${experience[1]?.subtitle}`,
    ].join('\n')
  }

  // 技能相关 - 精炼版
  if (q.includes('技能') || q.includes('工具') || q.includes('栈')) {
    return [
      '核心技能：',
      `✓ 产品：${skills.slice(0, 3).join('、')}`,
      `✓ 技术：${skills.slice(6, 9).join('、')}`,
    ].join('\n')
  }

  // 教育相关 - 精炼版
  if (q.includes('教育') || q.includes('学历') || q.includes('学校')) {
    return [
      '211硕士学历。',
      `✓ ${education[0]?.school}｜${education[0]?.degree.split('·')[0]}`,
      `✓ ${education[1]?.school}｜${education[1]?.degree.split('，')[0]}`,
    ].join('\n')
  }

  // 匹配度分析 - 精炼版
  if (q.includes('匹配') || q.includes('岗位')) {
    return [
      'AI产品经理岗位匹配分析：',
      '✓ 有AI项目经验（检E通多模态诊断）',
      '✓ 理工科背景（材料建模）',
      '✓ 熟悉LLM/RAG/Agent概念',
      '⚠️ 风险：偏传统行业，纯互联网经验少',
    ].join('\n')
  }

  // 成果相关 - 精炼版
  if (q.includes('成果') || q.includes('量化') || q.includes('数据')) {
    return [
      '可量化成果：',
      '✓ 招采分析效率提升500%（3天→5分钟）',
      '✓ ERP流程周期缩短20%',
      '✓ 交付率100%',
    ].join('\n')
  }

  // 默认回复 - 精炼版
  return [
    '我是简历助手，可以回答：',
    '✓ 优势总结 ✓ 项目经历',
    '✓ 技能栈 ✓ 匹配度分析',
  ].join('\n')
}
