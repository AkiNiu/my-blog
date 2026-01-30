import { useState } from 'react'
import { Download, Mail, Copy, ArrowRight, Github } from 'lucide-react'
import { resumeKnowledge } from '../data/resumeKnowledge'

export default function Hero() {
  const resumePdfUrl = `${import.meta.env.BASE_URL}resume.pdf`
  const { profile, contact, preferences } = resumeKnowledge
  const [emailCopied, setEmailCopied] = useState(false)

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent('应聘沟通 - 来自简历站点')}&body=${encodeURIComponent(
    '您好，我在您的简历站点看到信息，想进一步沟通：\n\n- 岗位/JD：\n- 期望沟通时间：\n- 其他说明：\n',
  )}`

  const copyText = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', 'true')
    el.style.position = 'fixed'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] pt-32 pb-16 text-center animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
      
      <div className="space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary">
          你好，我是{profile.name}。
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
          {profile.headline}
        </p>

        <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
          {profile.pitch}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-12">
        <span className="px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium backdrop-blur-sm border border-border/50">
          📍 {profile.location}
        </span>
        <span className="px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium backdrop-blur-sm border border-border/50">
          {profile.extra}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12 w-full px-4">
        <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">95%</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">诊断准确率目标</div>
        </div>
        <div className="text-center border-l border-r border-border/40">
            <div className="text-3xl md:text-4xl font-bold text-foreground">50w+</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">沉淀缺陷案例库</div>
        </div>
        <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">100%</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">方案评审通过率</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <a
          href={resumePdfUrl}
          download="刘生杰-简历.pdf"
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-primary px-8 font-medium text-primary-foreground transition-all duration-300 hover:w-56 hover:bg-primary/90"
        >
          <span className="mr-2">下载简历 / Resume</span>
          <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
        </a>
        
        <a
          href={mailtoHref}
          className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Mail className="mr-2 h-4 w-4" />
          发送邮件
        </a>

        <button
          type="button"
          onClick={async () => {
            await copyText(contact.email)
            setEmailCopied(true)
            window.setTimeout(() => setEmailCopied(false), 1200)
          }}
          className="inline-flex h-12 items-center justify-center rounded-full border border-transparent px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {emailCopied ? (
             <span className="flex items-center text-green-600"><Copy className="mr-2 h-4 w-4" /> 已复制</span>
          ) : (
             <span className="flex items-center"><Copy className="mr-2 h-4 w-4" /> {contact.email}</span>
          )}
        </button>
      </div>

    </section>
  )
}
