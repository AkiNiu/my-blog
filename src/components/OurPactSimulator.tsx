import { useState, useEffect, useRef } from 'react'
import { X, ChevronRight, Users, Home, Building, GraduationCap, MessageCircle, Sparkles, Check, ArrowLeft, Send, Heart, Lightbulb, Bot, Zap, Star, RefreshCw, ThumbsUp } from 'lucide-react'

type Template = {
    id: string
    name: string
    icon: React.ReactNode
    desc: string
    aiPersona: string
    aiGreetings: string[]
    presets: string[]
    color: string
    sampleComplaint: string
    sampleTransform: string[]
}

const TEMPLATES: Template[] = [
    {
        id: 'family',
        name: '家庭/伴侣',
        icon: <Home size={28} />,
        desc: '适用于夫妻、情侣，建立温馨默契。',
        aiPersona: 'AI伴侣管家',
        aiGreetings: [
            '你好呀！我是你们的「伴侣管家」✨',
            '有任何想说的，都可以先告诉我，我会帮你温柔地转达~'
        ],
        presets: ['#家务分担', '#纪念日', '#亲密时光', '#财务透明'],
        color: 'rose',
        sampleComplaint: '他总是把脏衣服乱扔，说了好多次都不改！',
        sampleTransform: [
            '收到，听起来这让你很沮丧……',
            '我理解"物品归位"对你来说很重要。作为你们共同的「管家」，我会帮你把这个想法转化为一个温和的「愿景」：',
            '💡 愿景：#物品归位 — "希望我们都能养成用完即收的习惯，让家更整洁舒适。"',
            '我会在合适的时机，用不带指责的方式转达给对方，并一起商量一个可执行的小约定，好吗？'
        ]
    },
    {
        id: 'dorm',
        name: '宿舍/合租',
        icon: <Users size={28} />,
        desc: '适用于室友，建立清晰的"室友公约"。',
        aiPersona: 'AI舍长',
        aiGreetings: [
            '嗨！我是你们的「AI舍长」🎓',
            '有啥想吐槽的？放心说，我会帮你匿名整理成议题~'
        ],
        presets: ['#卫生轮值', '#访客规定', '#安静时段', '#公共采购'],
        color: 'sky',
        sampleComplaint: '有人老是半夜打游戏开麦，吵死了！',
        sampleTransform: [
            'OK，收到一条关于「#安静时段#」的吐槽。',
            '我先帮你把它转成一个中立的议题存入「宿舍愿景池」：',
            '💡 愿景：#安静时段 — "希望晚上11点后能保持安静，方便大家休息。"',
            '这个议题会在下次「宿舍卧谈会」上集中讨论，届时我会匿名呈现，大家一起投票决定规则~ 放心，不会暴露是谁提的！'
        ]
    },
    {
        id: 'neighbor',
        name: '邻里社区',
        icon: <Building size={28} />,
        desc: '适用于同楼层邻居，文明共处。',
        aiPersona: 'AI社区调解员',
        aiGreetings: [
            '您好，我是本楼层的「AI社区调解员」🏢',
            '如有任何关于邻里共处的期待，请告诉我，我会以最温和的方式协调处理。'
        ],
        presets: ['#噪音管理', '#宠物礼仪', '#公共空间', '#包裹互助'],
        color: 'emerald',
        sampleComplaint: '楼上每天跳绳，晚上10点还在蹦！',
        sampleTransform: [
            '您好，已收到您关于「夜间噪音」的反馈。',
            '为保持社区和谐，我已将您的期待转化为一个「#安静环境#」愿景：',
            '💡 愿景：#夜间安静 — "建议晚9点后避免剧烈运动产生的噪音，共同维护安静的休息环境。"',
            '我会发起一次「异步议事」，邀请相关邻居在48小时内匿名投票。若通过，将形成楼层公约并友善通知各户。全程匿名，无需直接对话。'
        ]
    },
    {
        id: 'project',
        name: '校园/项目小组',
        icon: <GraduationCap size={28} />,
        desc: '适用于课程小组、团队项目，高效协作。',
        aiPersona: 'AI项目教练',
        aiGreetings: [
            'Hi! 我是你们的「AI项目教练」🚀',
            '有任何协作问题？告诉我，我帮你们高效对齐！'
        ],
        presets: ['#DDL', '#任务分配', '#资料共享', '#会议纪要'],
        color: 'violet',
        sampleComplaint: '有个组员总是拖延，每次都卡我们进度！',
        sampleTransform: [
            '收到。检测到一个关于「#任务进度#」的关注点。',
            '我把它转化成一个可追踪的议题加入「Sprint Backlog」：',
            '💡 议题：#进度同步 — "建议明确每个任务的Deadline和负责人，增加进度透明度。"',
            '我会在周五的「Weekly Sync」上引导大家对齐进度，顺便用一个"任务认领看板"让分工更清晰。这样既解决问题，又不显得针对个人，行不行？'
        ]
    },
]

function colorClasses(color: string) {
    const map: Record<string, { bg: string; bgLight: string; border: string; text: string; ring: string; gradientFrom: string; gradientTo: string }> = {
        rose: { bg: 'bg-rose-500', bgLight: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-600', ring: 'ring-rose-200', gradientFrom: 'from-rose-400', gradientTo: 'to-pink-500' },
        sky: { bg: 'bg-sky-500', bgLight: 'bg-sky-50', border: 'border-sky-300', text: 'text-sky-600', ring: 'ring-sky-200', gradientFrom: 'from-sky-400', gradientTo: 'to-blue-500' },
        emerald: { bg: 'bg-emerald-500', bgLight: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-600', ring: 'ring-emerald-200', gradientFrom: 'from-emerald-400', gradientTo: 'to-teal-500' },
        violet: { bg: 'bg-violet-500', bgLight: 'bg-violet-50', border: 'border-violet-300', text: 'text-violet-600', ring: 'ring-violet-200', gradientFrom: 'from-violet-400', gradientTo: 'to-purple-500' },
    }
    return map[color] || map.rose
}

type ChatMessage = {
    role: 'ai' | 'user'
    text: string
    isTyping?: boolean
}

export default function OurPactSimulator({ onClose }: { onClose: () => void }) {
    // Steps: 0=welcome, 1=select, 2=AI greeting, 3=AI demo (chat), 4=dashboard, 5=kudos
    const [step, setStep] = useState(0)
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
    const [isAiTyping, setIsAiTyping] = useState(false)
    const [userHasSent, setUserHasSent] = useState(false)
    const [showKudos, setShowKudos] = useState(false)
    const chatEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatMessages])

    const handleSelectTemplate = (t: Template) => {
        setSelectedTemplate(t)
        setChatMessages([])
        setUserHasSent(false)
        setStep(2)
    }

    // Simulate AI typing effect
    const typeAiMessages = async (messages: string[]) => {
        setIsAiTyping(true)
        for (const msg of messages) {
            await new Promise(r => setTimeout(r, 600))
            setChatMessages(prev => [...prev, { role: 'ai', text: msg }])
        }
        setIsAiTyping(false)
    }

    // Step 2: Show AI greeting
    useEffect(() => {
        if (step === 2 && selectedTemplate) {
            setChatMessages([])
            typeAiMessages(selectedTemplate.aiGreetings)
        }
    }, [step, selectedTemplate])

    const handleUserSendComplaint = () => {
        if (!selectedTemplate || userHasSent) return
        setUserHasSent(true)
        setChatMessages(prev => [...prev, { role: 'user', text: selectedTemplate.sampleComplaint }])
        setTimeout(() => {
            typeAiMessages(selectedTemplate.sampleTransform)
        }, 400)
    }

    const reset = () => {
        setStep(0)
        setSelectedTemplate(null)
        setChatMessages([])
        setUserHasSent(false)
        setShowKudos(false)
    }

    const c = selectedTemplate ? colorClasses(selectedTemplate.color) : colorClasses('rose')

    return (
        <div className="flex items-center justify-center">
            {/* Phone Frame */}
            <div className="relative w-[380px] h-[760px] bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20"></div>

                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-[2.4rem] overflow-hidden flex flex-col relative">

                    {/* Status Bar */}
                    <div className="h-10 flex items-center justify-between px-6 text-[10px] text-gray-500 dark:text-gray-400 pt-4">
                        <span>22:23</span>
                        <div className="flex gap-1 items-center">
                            <span>5G</span>
                            <span>📶</span>
                            <span>🔋</span>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-30 p-1.5 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                    >
                        <X size={16} />
                    </button>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto flex flex-col">

                        {/* Step 0: Welcome */}
                        {step === 0 && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 animate-in fade-in duration-300">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl mb-6 shadow-lg">
                                    🤝
                                </div>
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">我们的公约</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 max-w-[260px]">
                                    为共同生活、学习和协作的群体，提供一个创建和执行"微型公约"的平台。
                                </p>
                                <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 mb-8 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full">
                                    <Bot size={14} />
                                    <span>AI 温和调解 · 将「摩擦」转化为「默契」</span>
                                </div>
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95"
                                >
                                    开始体验 <ChevronRight size={18} />
                                </button>
                            </div>
                        )}

                        {/* Step 1: Select Template */}
                        {step === 1 && (
                            <div className="flex-1 px-5 pt-4 pb-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-1">选择公约类型</h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">不同的场景，不同的 AI 人设</p>
                                <div className="space-y-3">
                                    {TEMPLATES.map((t) => {
                                        const tc = colorClasses(t.color)
                                        return (
                                            <button
                                                key={t.id}
                                                onClick={() => handleSelectTemplate(t)}
                                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 ${tc.border} bg-white dark:bg-slate-800 hover:ring-4 ${tc.ring} transition-all text-left`}
                                            >
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tc.gradientFrom} ${tc.gradientTo} text-white flex items-center justify-center shrink-0`}>
                                                    {t.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-semibold text-gray-800 dark:text-white">{t.name}</div>
                                                    <div className="text-[11px] text-gray-500 dark:text-gray-400">{t.aiPersona}</div>
                                                </div>
                                                <ChevronRight size={20} className="text-gray-400 shrink-0" />
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 2 & 3: AI Chat Demo */}
                        {(step === 2 || step === 3) && selectedTemplate && (
                            <div className="flex-1 flex flex-col animate-in fade-in duration-300">
                                {/* Chat Header */}
                                <div className={`bg-gradient-to-r ${c.gradientFrom} ${c.gradientTo} px-5 py-3 flex items-center gap-3`}>
                                    <button onClick={() => setStep(1)} className="text-white/80 hover:text-white">
                                        <ArrowLeft size={18} />
                                    </button>
                                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">
                                        <Sparkles size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-white font-semibold text-sm">{selectedTemplate.aiPersona}</div>
                                        <div className="text-white/70 text-[10px]">{selectedTemplate.name}公约 · AI 助手</div>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-slate-800/50">
                                    {chatMessages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${msg.role === 'user'
                                                ? `bg-gradient-to-br ${c.gradientFrom} ${c.gradientTo} text-white rounded-br-sm`
                                                : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-bl-sm'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isAiTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-white dark:bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>

                                {/* Chat Input Area */}
                                <div className="p-3 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700">
                                    {!userHasSent ? (
                                        <button
                                            onClick={handleUserSendComplaint}
                                            disabled={isAiTyping}
                                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${isAiTyping
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : `bg-gradient-to-r ${c.gradientFrom} ${c.gradientTo} text-white shadow-lg active:scale-[0.98]`
                                                }`}
                                        >
                                            <Send size={16} />
                                            点击发送一条「抱怨」，看 AI 如何转化
                                        </button>
                                    ) : !isAiTyping && chatMessages.length > 2 ? (
                                        <button
                                            onClick={() => setStep(4)}
                                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium bg-gradient-to-r ${c.gradientFrom} ${c.gradientTo} text-white shadow-lg active:scale-[0.98] transition-all`}
                                        >
                                            <Zap size={16} />
                                            进入公约仪表盘
                                        </button>
                                    ) : (
                                        <div className="text-center text-xs text-gray-400 py-2">AI 正在思考...</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Dashboard */}
                        {step === 4 && selectedTemplate && (
                            <div className="flex-1 flex flex-col animate-in fade-in duration-300">
                                {/* Dashboard Header */}
                                <div className={`bg-gradient-to-r ${c.gradientFrom} ${c.gradientTo} px-5 py-4`}>
                                    <div className="text-white/70 text-[10px] mb-1">当前公约</div>
                                    <div className="text-white font-bold text-lg">{selectedTemplate.name}公约</div>
                                </div>

                                {/* Dashboard Content */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {/* Vision Pool */}
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Lightbulb size={16} className={c.text} />
                                            <span className="font-semibold text-gray-800 dark:text-white text-sm">愿景池</span>
                                            <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded-full">2 条待讨论</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className={`${c.bgLight} dark:bg-opacity-20 rounded-xl p-3 border ${c.border}`}>
                                                <div className={`text-xs font-semibold ${c.text} mb-1`}>#安静环境</div>
                                                <div className="text-xs text-gray-600 dark:text-gray-300">"希望晚上11点后能保持安静，方便大家休息。"</div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[10px] text-gray-400">👍 3票</span>
                                                    <span className="text-[10px] text-gray-400">💬 1条建议</span>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-3 border border-gray-200 dark:border-gray-600">
                                                <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">#物品归位</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">"希望公共区域的物品用完后能放回原位。"</div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-[10px] text-gray-400">👍 2票</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kudos Section */}
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Heart size={16} className="text-pink-500" />
                                            <span className="font-semibold text-gray-800 dark:text-white text-sm">夸夸墙</span>
                                            <span className="text-[10px] bg-pink-50 text-pink-500 px-2 py-0.5 rounded-full">正向激励</span>
                                        </div>
                                        {!showKudos ? (
                                            <button
                                                onClick={() => setShowKudos(true)}
                                                className="w-full py-3 rounded-xl border-2 border-dashed border-pink-200 text-pink-500 text-sm font-medium hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ThumbsUp size={16} />
                                                点击发一条「夸夸」
                                            </button>
                                        ) : (
                                            <div className="space-y-2 animate-in fade-in duration-300">
                                                <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-3 border border-pink-100">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div className="w-6 h-6 rounded-full bg-pink-400 text-white text-[10px] flex items-center justify-center font-bold">你</div>
                                                        <span className="text-[10px] text-gray-400">刚刚</span>
                                                    </div>
                                                    <div className="text-xs text-gray-700 dark:text-gray-200">
                                                        <span className="text-pink-500 font-semibold">Kudos</span> @室友A：感谢帮我带了快递！🎉
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div className="w-6 h-6 rounded-full bg-blue-400 text-white text-[10px] flex items-center justify-center font-bold">A</div>
                                                        <span className="text-[10px] text-gray-400">昨天</span>
                                                    </div>
                                                    <div className="text-xs text-gray-600 dark:text-gray-300">
                                                        <span className="text-pink-500 font-semibold">Kudos</span> @你：这周值日打扫得超干净！
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* AI Tip */}
                                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-800">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white shrink-0">
                                                <Bot size={16} />
                                            </div>
                                            <div>
                                                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">{selectedTemplate.aiPersona} 提示</div>
                                                <div className="text-xs text-gray-600 dark:text-gray-300">
                                                    愿景池里有 2 条议题啦！要不要发起一次「{selectedTemplate.id === 'dorm' ? '宿舍卧谈会' : selectedTemplate.id === 'neighbor' ? '异步议事' : '家庭会议'}」来讨论？
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Actions */}
                                <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                                    <button
                                        onClick={reset}
                                        className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <RefreshCw size={14} />
                                        重新体验
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r ${c.gradientFrom} ${c.gradientTo} shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
                                    >
                                        <Star size={14} />
                                        完成演示
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Home Indicator */}
                    <div className="h-7 flex items-center justify-center">
                        <div className="w-28 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
