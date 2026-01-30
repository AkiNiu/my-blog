import { resumeKnowledge } from '../data/resumeKnowledge'

function resolveUrl(url: string) {
  if (/^https?:\/\//i.test(url)) return url
  return `${import.meta.env.BASE_URL}${url.replace(/^\//, '')}`
}

export default function About() {
  const { education, strengths, preferences, links, publications } = resumeKnowledge

  return (
    <div className="grid gap-6 md:grid-cols-2">
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

      <div className="rounded-2xl border border-border/50 bg-card p-6 h-full">
        <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">求职偏好</h3>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preferences</span>
        </div>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between items-center py-1 border-b border-border/40 last:border-0"><span className="text-muted-foreground">期望岗位 / Role</span> <span className="text-foreground font-medium text-right">{preferences.targetRoles[0]}</span></div>
          <div className="flex justify-between items-center py-1 border-b border-border/40 last:border-0"><span className="text-muted-foreground">期望城市 / City</span> <span className="text-foreground font-medium text-right">{preferences.targetCities.join(', ')}</span></div>
          <div className="flex justify-between items-center py-1 border-b border-border/40 last:border-0"><span className="text-muted-foreground">工作性质 / Type</span> <span className="text-foreground font-medium text-right">{preferences.workType}</span></div>
          <div className="flex justify-between items-center py-1 border-b border-border/40 last:border-0"><span className="text-muted-foreground">到岗时间 / Start</span> <span className="text-foreground font-medium text-right">{preferences.availability}</span></div>
          <div className="flex justify-between items-center py-1 border-b border-border/40 last:border-0"><span className="text-muted-foreground">期望薪资 / Salary</span> <span className="text-foreground font-medium text-right">{preferences.salary}</span></div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-6 h-full">
        <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">作品与链接</h3>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Links</span>
        </div>
        <div className="grid gap-3">
          {links.map((l, idx) => (
            l.url ? (
              <a
                key={idx}
                href={resolveUrl(l.url)}
                target={/^https?:\/\//i.test(l.url) ? '_blank' : undefined}
                rel={/^https?:\/\//i.test(l.url) ? 'noreferrer' : undefined}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors group"
              >
                <span className="text-sm font-medium text-foreground">{l.label}</span>
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">点击跳转 →</span>
              </a>
            ) : (
              <div key={idx} className="p-3 rounded-lg bg-secondary/10 border border-dashed border-border text-sm">
                <div className="font-medium text-foreground">{l.label}</div>
                {l.note ? <div className="text-xs text-muted-foreground mt-1">{l.note}</div> : null}
              </div>
            )
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-6 md:col-span-2">
        <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">论文与专利</h3>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Publications</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {publications.map((p, idx) => (
            <div key={idx} className="rounded-xl bg-secondary/20 p-4 border border-border/20 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary tracking-wide">{p.type}</span>
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

