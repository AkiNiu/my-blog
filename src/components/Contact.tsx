import { useState } from 'react'
import { Download, Mail, Phone, Copy, Check, Lock } from 'lucide-react'
import { resumeKnowledge } from '../data/resumeKnowledge'
import PasscodeModal from './PasscodeModal'

// Configure the passcode here (should match Hero.tsx)
const RESUME_PASSCODE = '2026'

export default function Contact() {
  const resumePdfUrl = `${import.meta.env.BASE_URL}resume.pdf`
  const { contact } = resumeKnowledge
  const [emailCopied, setEmailCopied] = useState(false)
  const [phoneCopied, setPhoneCopied] = useState(false)
  const [passcodeOpen, setPasscodeOpen] = useState(false)

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

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = resumePdfUrl
    link.download = 'AkiLiu-Resume.pdf'
    link.click()
  }

  // 真实电话号码（此处通过硬编码还原，以便用户点击复制时能获取到真实号码）
  const realPhone = '15222280915'

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-3">
        <button
          onClick={() => setPasscodeOpen(true)}
          className="group flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/50 bg-card p-8 transition-all hover:border-primary/20 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors relative">
            <Download size={24} />
            <Lock size={10} className="absolute -bottom-0.5 -right-0.5 text-amber-500" />
          </div>
          <span className="font-semibold text-foreground">下载简历 / PDF Resume</span>
        </button>

        <div className="flex flex-col justify-between rounded-2xl border border-border/50 bg-card p-8 transition-all hover:border-primary/20 hover:shadow-lg hover:-translate-y-1">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground mb-4">
              <Mail size={20} />
            </div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">Email</div>
            <div className="text-sm font-semibold text-foreground break-all">{contact.email}</div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <a
              href={mailtoHref}
              className="flex-1 inline-flex items-center justify-center rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              发送邮件
            </a>
            <button
              type="button"
              onClick={async () => {
                await copyText(contact.email)
                setEmailCopied(true)
                window.setTimeout(() => setEmailCopied(false), 1200)
              }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
            >
              {emailCopied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-border/50 bg-card p-8 transition-all hover:border-primary/20 hover:shadow-lg hover:-translate-y-1">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground mb-4">
              <Phone size={20} />
            </div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">Phone</div>
            <div className="text-sm font-semibold text-foreground">152 **** 0915</div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              type="button"
              onClick={async () => {
                await copyText(realPhone)
                setPhoneCopied(true)
                window.setTimeout(() => setPhoneCopied(false), 1200)
              }}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {phoneCopied ? <Check size={16} /> : <Copy size={16} />}
              <span>{phoneCopied ? '已复制' : '复制号码'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Passcode Modal */}
      <PasscodeModal
        isOpen={passcodeOpen}
        onClose={() => setPasscodeOpen(false)}
        onSuccess={handleDownload}
        correctCode={RESUME_PASSCODE}
      />
    </>
  )
}
