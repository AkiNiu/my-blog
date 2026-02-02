import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X, BarChart3, TrendingUp, Lightbulb, Users, Target } from 'lucide-react'

// ============ PPT作品展示数据 ============
const pptSlides = [
    {
        image: `${import.meta.env.BASE_URL}portfolio/ScreenShot_2026-02-02_233726_646.png`,
        title: '作业过程全景可视化',
        description: '档案蓝图数字化 · 关键节点可视化 · 作业过程标准化 · 成果交付自动化',
    },
    {
        image: `${import.meta.env.BASE_URL}portfolio/ScreenShot_2026-02-02_233829_290.png`,
        title: '现场作业可疑行为分析',
        description: '行为精准捕获 · 智能风险分析 · 实时预警 · 防范人情检测',
    },
    {
        image: `${import.meta.env.BASE_URL}portfolio/ScreenShot_2026-02-02_233851_650.png`,
        title: '"检e通"效率模式',
        description: '秒级采集 · 并行作业 · 报告立等可取',
    },
]

// ============ 方案能力数据 ============
const skillCards = [
    {
        id: 'goms',
        title: 'GOMS交互成本模型',
        subtitle: '定量分析',
        description: '引入人机交互领域经典模型，科学量化产品体验差距',
        metric: '5.9倍',
        metricLabel: '复杂度差距',
        icon: <BarChart3 size={18} />,
        color: 'from-red-500 to-rose-600',
    },
    {
        id: 'market',
        title: '市场"瀑布分流"模型',
        subtitle: '战略洞察',
        description: '资金流向分析：省招→产业单位→市招分包的三级结构',
        metric: '8000万',
        metricLabel: '省招规模',
        icon: <TrendingUp size={18} />,
        color: 'from-amber-500 to-orange-600',
    },
    {
        id: 'control',
        title: '"攻守易形"控制模型',
        subtitle: '价值重塑',
        description: '从弱工具到强凭证：系统报告=验收唯一凭证',
        metric: '验收铁闸',
        metricLabel: '核心定位',
        icon: <Target size={18} />,
        color: 'from-emerald-500 to-teal-600',
    },
    {
        id: 'business',
        title: '商业模式重构',
        subtitle: '落地方案',
        description: '从卖软件到卖数字化耗材：项目通行证 + 合规报告包',
        metric: '2套',
        metricLabel: '商业方案',
        icon: <Lightbulb size={18} />,
        color: 'from-violet-500 to-purple-600',
    },
    {
        id: 'interview',
        title: '一线访谈洞察',
        subtitle: '定性研究',
        description: '深度访谈提炼三大痛点：流程脱节·协作缺失·结果不可信',
        metric: '+30-50%',
        metricLabel: '作业时间增加',
        icon: <Users size={18} />,
        color: 'from-blue-500 to-indigo-600',
    },
]

// ============ PPT画廊组件 ============
export function PPTGallery() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isAutoPlay, setIsAutoPlay] = useState(true)

    useEffect(() => {
        if (!isAutoPlay || isFullscreen) return
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % pptSlides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [isAutoPlay, isFullscreen])

    const nextSlide = () => { setIsAutoPlay(false); setCurrentIndex((prev) => (prev + 1) % pptSlides.length) }
    const prevSlide = () => { setIsAutoPlay(false); setCurrentIndex((prev) => (prev - 1 + pptSlides.length) % pptSlides.length) }

    const current = pptSlides[currentIndex]

    return (
        <>
            <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
                <div className="flex items-baseline justify-between p-6 pb-4">
                    <h3 className="text-lg font-semibold text-foreground">PPT作品展示</h3>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Design</span>
                </div>

                <div className="px-6 pb-6">
                    {/* Large Image Display */}
                    <div
                        className="relative rounded-xl overflow-hidden bg-muted/30 group cursor-pointer mb-4"
                        onClick={() => setIsFullscreen(true)}
                        onMouseEnter={() => setIsAutoPlay(false)}
                        onMouseLeave={() => setIsAutoPlay(true)}
                    >
                        <div className="aspect-[16/9] relative overflow-hidden">
                            <img
                                src={current.image}
                                alt={current.title}
                                className="w-full h-full object-contain bg-white transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity p-3 rounded-full bg-black/50 text-white">
                                    <Maximize2 size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-5 pt-10">
                            <h4 className="text-white font-bold text-lg mb-1">{current.title}</h4>
                            <p className="text-white/80 text-sm">{current.description}</p>
                        </div>

                        {/* Nav Arrows */}
                        <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 shadow-lg text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 shadow-lg text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                            <ChevronRight size={20} />
                        </button>

                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 text-white text-xs font-medium">
                            {currentIndex + 1} / {pptSlides.length}
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-3 justify-center">
                        {pptSlides.map((slide, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setCurrentIndex(idx); setIsAutoPlay(false); }}
                                className={`relative w-24 h-14 rounded-lg overflow-hidden border-2 transition-all ${idx === currentIndex ? 'border-primary ring-2 ring-primary/30 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <img src={slide.image} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setIsFullscreen(false)}>
                    <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20" onClick={() => setIsFullscreen(false)}><X size={24} /></button>
                    <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronLeft size={28} /></button>
                    <div className="max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
                        <img src={current.image} alt={current.title} className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
                        <div className="text-center mt-4">
                            <h4 className="text-white font-bold text-xl">{current.title}</h4>
                            <p className="text-white/70 text-sm mt-1">{current.description}</p>
                        </div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronRight size={28} /></button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {pptSlides.map((_, idx) => (
                            <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }} className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/40'}`} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

// ============ 方案能力组件 ============
export function SolutionSkills() {
    return (
        <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            <div className="flex items-baseline justify-between p-6 pb-4">
                <h3 className="text-lg font-semibold text-foreground">方案能力</h3>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Skills</span>
            </div>

            <div className="px-6 pb-6">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {skillCards.map((card) => (
                        <div
                            key={card.id}
                            className="rounded-xl p-4 bg-secondary/30 border border-border/30 hover:bg-secondary/50 transition-colors group"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    {card.icon}
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-primary">{card.metric}</div>
                                    <div className="text-[10px] text-muted-foreground">{card.metricLabel}</div>
                                </div>
                            </div>

                            <div className="text-xs text-muted-foreground mb-1">{card.subtitle}</div>
                            <div className="font-semibold text-sm text-foreground mb-2">{card.title}</div>
                            <div className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{card.description}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-dashed border-border text-center">
                    <div className="text-xs text-muted-foreground">
                        💡 基于真实项目提炼的分析框架 · 完整方案按面试阶段提供
                    </div>
                </div>
            </div>
        </div>
    )
}

// ============ 默认导出：组合组件 ============
export default function PortfolioShowcase() {
    return (
        <div className="space-y-6 md:col-span-2">
            <PPTGallery />
            <SolutionSkills />
        </div>
    )
}
