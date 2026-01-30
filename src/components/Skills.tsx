import { resumeKnowledge } from '../data/resumeKnowledge'

export default function Skills() {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-3">
        {resumeKnowledge.skills.map((s, idx) => (
          <span
            key={idx}
            className="px-4 py-2 rounded-full bg-secondary/30 border border-border/50 text-sm font-medium text-foreground transition-all hover:bg-secondary/60 hover:scale-105 cursor-default"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
