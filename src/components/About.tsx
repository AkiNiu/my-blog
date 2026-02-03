import { useState } from 'react'
import { MousePointerClick } from 'lucide-react'
import { resumeKnowledge } from '../data/resumeKnowledge'

function resolveUrl(url: string) {
  if (/^https?:\/\//i.test(url)) return url
  return `${import.meta.env.BASE_URL}${url.replace(/^\//, '')}`
}

export default function About() {
  const { education, strengths, preferences, awards, publications } = resumeKnowledge
  const [showPreferences, setShowPreferences] = useState(false)

  return (
    <div className="space-y-8">
      {/* Row 1: 教育背景 + 核心优势 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 教育背景 */}
        <div className="rounded-2xl border border-border/50 bg-card p-6 h-full">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">教育背景</h3>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Education</span>
          </div>
          <div className="grid gap-6">
            {education.map((e, idx) => (
              <div key={idx} className="relative pl-4 border-l-2 border-primary/10">
                <div className="font-semibold text-foreground text-base">
                  {e.school}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {idx === 0 ? '（211 · 双一流）' : '（双一流）'}
                  </span>
                </div>
                <div className="text-sm text-primary/80 mt-1">{e.degree}</div>
                <div className="text-xs text-muted-foreground mt-1 font-mono">{e.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 核心优势 */}
        <div className="rounded-2xl border border-border/50 bg-card p-6 h-full">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">核心优势</h3>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Strengths</span>
          </div>
          <ul className="space-y-4">
            {strengths.map((s, idx) => (
              <li key={idx} className="text-sm text-foreground/80 leading-relaxed flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0 shadow-sm" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Row 2: 求职偏好 + 获奖情况 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 求职偏好 */}
        <div className="rounded-2xl border border-border/50 bg-card p-6 h-full relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">求职偏好</h3>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preferences</span>
          </div>

          <div className={`grid gap-3 text-sm transition-all duration-300 ${showPreferences ? 'opacity-100 filter-none' : 'opacity-40 blur-sm select-none grayscale'}`}>
            <div className="flex justify-between items-center py-1 border-b border-border/40 last:border-0"><span className="text-muted-foreground">期望岗位 / Role</span> <span className="text-foreground font-medium text-right">{preferences.targetRoles[0]}</span></div>
            <div className="flex justify-between items-center py-1 border-b border-border/40 last:border-0"><span className="text-muted-foreground">期望城市 / City</span> <span className="text-foreground font-medium text-right">{preferences.targetCities.join(', ')}</span></div>
            <div className="flex justify-between items-center py-1 border-b border-border/40 last:border-0"><span className="text-muted-foreground">工作性质 / Type</span> <span className="text-foreground font-medium text-right">{preferences.workType}</span></div>
            <div className="flex justify-between items-center py-1 border-b border-border/40 last:border-0"><span className="text-muted-foreground">到岗时间 / Start</span> <span className="text-foreground font-medium text-right">{preferences.availability}</span></div>
            <div className="flex justify-between items-center py-1 border-b border-border/40 last:border-0"><span className="text-muted-foreground">期望薪资 / Salary</span> <span className="text-foreground font-medium text-right">{preferences.salary}</span></div>
          </div>

          {!showPreferences && (
            <div
              className="absolute inset-0 top-14 flex items-center justify-center cursor-pointer hover:bg-white/5 dark:hover:bg-black/5 transition-colors group"
              onClick={() => setShowPreferences(true)}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border border-border shadow-sm text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors hover:scale-105 active:scale-95">
                <MousePointerClick size={14} />
                <span>点击查看详细信息</span>
              </div>
            </div>
          )}
        </div>

        {/* 获奖情况 */}
        <div className="rounded-2xl border border-border/50 bg-card p-6 h-full">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">获奖情况</h3>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Awards</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {awards.map((award, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="text-primary">🏆</span>
                <span>{award}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: 论文与专利 (Full Width) */}
      <div className="rounded-2xl border border-border/50 bg-card p-6">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">论文与专利</h3>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Publications</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publications.map((p, idx) => (
            <div key={idx} className="rounded-xl bg-secondary/20 p-4 border border-border/20 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${p.type === '发明专利'
                    ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                    : 'bg-primary/10 text-primary'
                  }`}>
                  {p.type}
                </span>
                <span className="text-xs text-muted-foreground">{p.language}{p.year ? ` · ${p.year}` : ''}</span>
              </div>

              {p.url ? (
                <a
                  href={resolveUrl(p.url)}
                  target={/^https?:\/\//i.test(p.url) ? '_blank' : undefined}
                  rel={/^https?:\/\//i.test(p.url) ? 'noreferrer' : undefined}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2 mb-2"
                >
                  {p.title}
                </a>
              ) : (
                <div className="text-sm font-medium text-foreground line-clamp-2 mb-2">{p.title}</div>
              )}
              {p.note ? <div className="mt-auto text-xs text-muted-foreground">{p.note}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
