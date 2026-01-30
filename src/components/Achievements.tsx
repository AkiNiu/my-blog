import { resumeKnowledge } from '../data/resumeKnowledge'

export default function Achievements() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {resumeKnowledge.achievements.map((it, idx) => (
        <div key={idx} className="flex flex-col justify-between rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/20 hover:shadow-sm">
          <div className="text-4xl font-bold tracking-tight text-primary tabular-nums mb-2">{it.value}</div>
          <div className="text-sm font-medium text-muted-foreground">{it.label}</div>
        </div>
      ))}
    </div>
  )
}
