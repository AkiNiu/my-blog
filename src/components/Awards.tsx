import { resumeKnowledge } from '../data/resumeKnowledge'
import { Trophy } from 'lucide-react'

export default function Awards() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
      <ul className="grid gap-4 sm:grid-cols-2">
        {resumeKnowledge.awards.map((a, idx) => (
          <li key={idx} className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-foreground">
            <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500/70" />
            <span className="text-sm font-medium leading-relaxed">{a}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
