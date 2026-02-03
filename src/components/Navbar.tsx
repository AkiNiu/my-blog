import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import PasscodeModal from './PasscodeModal'

// Configure the passcode here (should match Hero.tsx)
const RESUME_PASSCODE = '2026'

const items = [
  { href: '#about', label: '简介 / About' },
  { href: '#experience', label: '经历 / Experience' },
  { href: '#projects', label: '项目 / Projects' },
  { href: '#skills', label: '技能 / Skills' },
  { href: '#contact', label: '联系 / Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [passcodeOpen, setPasscodeOpen] = useState(false)

  const resumePdfUrl = `${import.meta.env.BASE_URL}resume.pdf`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = resumePdfUrl
    link.download = 'AkiLiu-Resume.pdf'
    link.click()
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/40 py-4'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="container max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-lg font-semibold tracking-tight text-foreground">
            AkiLiu
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {items.map(i => (
              <a
                key={i.href}
                href={i.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {i.label}
              </a>
            ))}
            <button
              onClick={() => setPasscodeOpen(true)}
              className="ml-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              下载简历 / Resume
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-center">
            {items.map(i => (
              <a
                key={i.href}
                href={i.href}
                className="text-2xl font-medium text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {i.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                setPasscodeOpen(true)
              }}
              className="mt-4 px-6 py-3 rounded-full bg-primary text-primary-foreground text-lg font-medium inline-block w-full"
            >
              下载简历 / Download Resume
            </button>
          </div>
        </div>
      )}

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
