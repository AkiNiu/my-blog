import { resumeKnowledge } from './resumeData.js'

export function buildMockAnswer(question: string, redactContact: boolean) {
  const q = question.toLowerCase()
  const { profile, contact, projects, experience, skills, education } = resumeKnowledge

  if ((q.includes('电话') || q.includes('手机号') || q.includes('邮箱') || q.includes('联系方式')) && redactContact) {
    return '为保护隐私，当前对话默认不输出联系方式。若你需要联系方式，请在窗口右上角关闭“脱敏”后再询问。'
  }
  if (q.includes('电话') || q.includes('手机号')) return `电话：${contact.phone}`
  if (q.includes('邮箱') || q.includes('email')) return `邮箱：${contact.email}`
  if (q.includes('github')) return contact.github ? `GitHub：${contact.github}` : '简历未提供 GitHub 链接。'

  if (q.includes('项目') || q.includes('代表项目') || q.includes('做过什么')) {
    return [
      `结论：候选人主要在电力运维/工程验收场景做 AI 与数字化产品。`,
      '',
      '代表项目：',
      ...projects.map((p) => `- ${p.name}（${p.role}）：${p.result}`),
    ].join('\n')
  }

  if (q.includes('经历') || q.includes('工作') || q.includes('公司')) {
    return ['工作经历：', ...experience.map((e) => `- ${e.date}｜${e.title}｜${e.subtitle}`)].join('\n')
  }

  if (q.includes('亮点') || q.includes('优势') || q.includes('为什么你')) {
    return [
      `结论：${profile.name} 的优势是“AI 落地能力 + 工程化思维 + 商业价值交付”。`,
      '',
      '要点：',
      ...resumeKnowledge.strengths.map((s) => `- ${s}`),
    ].join('\n')
  }

  if (q.includes('技能') || q.includes('工具') || q.includes('栈')) {
    return ['技能与工具：', ...skills.map((s) => `- ${s}`)].join('\n')
  }

  if (q.includes('教育') || q.includes('学历') || q.includes('学校')) {
    return ['教育背景：', ...education.map((e) => `- ${e.school}｜${e.degree}｜${e.time}`)].join('\n')
  }

  return [
    '我可以基于简历回答 HR 关注的问题。',
    '你可以问：亮点总结 / 项目深挖 / 与岗位匹配点 / 工作经历细节。',
  ].join('\n')
}

