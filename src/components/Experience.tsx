import { resumeKnowledge } from '../data/resumeKnowledge'

export default function Experience() {
  return (
    <div className="space-y-12">
      {resumeKnowledge.experience.map((it, idx) => (
        <div key={idx} className="group relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[1px] before:bg-border/60 hover:before:bg-primary transition-colors">
          <div className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-border group-hover:bg-primary transition-colors" />
          
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-4">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">{it.title}</h3>
            <span className="text-sm font-medium text-muted-foreground tabular-nums">{it.date}</span>
          </div>
          
          <div className="text-base font-medium text-primary/80 mb-4">{it.subtitle}</div>
          
          <ul className="space-y-3">
            {it.bullets.map((b, i) => (
              <li key={i} className="text-muted-foreground leading-relaxed flex items-start">
                <span className="mr-3 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
