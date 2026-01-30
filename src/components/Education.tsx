import { resumeKnowledge } from '../data/resumeKnowledge'
import { GraduationCap } from 'lucide-react'

export default function Education() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {resumeKnowledge.education.map((it, idx) => (
        <div key={idx} className="relative rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/20">
          <div className="absolute top-6 right-6 text-muted-foreground/20">
            <GraduationCap size={48} />
          </div>
          
          <div className="relative z-10">
            <div className="font-bold text-lg text-foreground mb-1">{it.school}</div>
            <div className="text-base text-primary/80 mb-2">{it.degree}</div>
            <div className="text-sm font-mono text-muted-foreground mb-4">{it.time}</div>
            <div className="text-sm text-muted-foreground leading-relaxed max-w-[90%]">{it.detail}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
