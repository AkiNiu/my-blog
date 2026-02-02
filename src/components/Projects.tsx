import { useState } from 'react'
import { resumeKnowledge } from '../data/resumeKnowledge'
import { ExternalLink, Lock, Eye, FileText, BarChart3, ChevronRight, Zap, Play, Smartphone } from 'lucide-react'
import DataPipelineSimulator from './DataPipelineSimulator'
import OurPactSimulator from './OurPactSimulator'
import { PPTGallery, SolutionSkills } from './PortfolioShowcase'

function MaterialPill({ text, variant }: { text: string; variant: 'public' | 'screen' | 'deep' }) {
  const cls =
    variant === 'public'
      ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400'
      : variant === 'screen'
        ? 'border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-400'
        : 'border-amber-500/20 bg-amber-500/5 text-amber-700 dark:text-amber-400'

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${cls}`}>
      {variant === 'public' ? <Eye size={12} /> : variant === 'screen' ? <FileText size={12} /> : <Lock size={12} />}
      {text}
    </span>
  )
}

export default function Projects() {
  const topProjects = resumeKnowledge.projects.slice(0, 3)
  const otherProjects = resumeKnowledge.projects.slice(3)
  const [simulatorOpen, setSimulatorOpen] = useState(false)
  const [ourPactOpen, setOurPactOpen] = useState(false)

  return (
    <div className="space-y-12">
      {/* Data Pipeline Simulator Modal */}
      {simulatorOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-5xl">
            <DataPipelineSimulator onClose={() => setSimulatorOpen(false)} />
          </div>
        </div>
      )}

      {/* Our Pact Simulator Modal */}
      {ourPactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200" onClick={() => setOurPactOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <OurPactSimulator onClose={() => setOurPactOpen(false)} />
          </div>
        </div>
      )}


      {/* Top 3 Projects - Featured */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topProjects.map((p, idx) => (
          <div key={idx} className="group flex flex-col rounded-2xl border border-border/50 bg-card p-0 overflow-hidden transition-all hover:shadow-xl hover:border-primary/20 h-full relative">
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-bl-lg border-b border-l border-primary/10 z-10">
              FEATURED
            </div>

            {/* Header Section */}
            <div className="relative p-6 pb-4 bg-gradient-to-b from-secondary/30 to-background border-b border-border/40">
              <div className="space-y-3">
                <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors pr-8 min-h-[3.5rem] flex items-center">
                  {p.name.split('·')[0]}
                </h3>
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Zap size={12} className="text-amber-500" />
                  {p.role}
                </p>
              </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
              {/* Impact Statement */}
              <div className="mb-4 bg-secondary/20 rounded-lg p-3 border border-border/30">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Business Impact</div>
                <div className="text-xs font-medium text-foreground leading-relaxed line-clamp-3">
                  {p.result}
                </div>
              </div>

              {/* Special Button for Personal Project */}
              {p.name.includes('招采数据') && (
                <button
                  onClick={() => setSimulatorOpen(true)}
                  className="mb-4 w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2 text-xs font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Play size={12} fill="currentColor" />
                  运行在线仿真 Demo
                </button>
              )}

              {/* Special Button for Our Pact Project */}
              {p.name.includes('Our Pact') && (
                <button
                  onClick={() => setOurPactOpen(true)}
                  className="mb-4 w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Smartphone size={12} />
                  体验产品原型 Demo
                </button>
              )}


              {/* STAR Outcomes */}
              {p.outcomes && p.outcomes.length > 0 ? (
                <div className="space-y-2 mb-4 flex-grow">
                  {p.outcomes.slice(0, 2).map((o, i) => (
                    <div key={i} className="flex gap-2 text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors">
                      <ChevronRight className="h-3 w-3 text-primary/50 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{o}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Footer: Tags */}
              <div className="mt-auto pt-4 border-t border-border/40">
                {p.tags && p.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[10px] font-medium border border-border/50">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Other Projects - Secondary Layout */}
      {otherProjects.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">更多项目经历 / More Projects</h3>
            <div className="h-px bg-border/50 flex-grow"></div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {otherProjects.map((p, idx) => (
              <div key={idx} className="flex flex-col rounded-xl border border-border/30 bg-card/50 p-4 hover:bg-card hover:border-border/60 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground">{p.name}</h4>
                  <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">{p.role}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.result}</p>
                <div className="flex gap-2 mt-auto">
                  {p.tags?.slice(0, 2).map((t, i) => (
                    <span key={i} className="text-[10px] text-muted-foreground/80 border border-border/50 px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PPT作品展示 */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">PPT与方案能力 / Design & Solutions</h3>
          <div className="h-px bg-border/50 flex-grow"></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <PPTGallery />
          <SolutionSkills />
        </div>
      </div>
    </div>
  )
}
