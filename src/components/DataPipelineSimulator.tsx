import { useState, useEffect, useRef } from 'react'
import { Play, FolderOpen, FileText, BarChart3, Settings, Terminal, CheckCircle2, AlertCircle, Loader2, X, RefreshCw, Search, FileSpreadsheet, Filter, Table, FileUp, FilePenLine } from 'lucide-react'

// Simulation steps for "One Click Run"
const SIMULATION_STEPS = [
    { msg: '--- 步骤 1/5: extract_archives.py ---', delay: 800 },
    { msg: '正在扫描输入目录: tender/input/archives...', delay: 1200 },
    { msg: '发现压缩包: 2024-Jiangsu-Tender-Batch-01.zip', delay: 1500 },
    { msg: '正在解压... [OK]', delay: 2000 },
    { msg: '发现压缩包: 2024-Jiangsu-Tender-Batch-02.zip', delay: 2300 },
    { msg: '正在解压... [OK]', delay: 2800 },
    { msg: '压缩包提取完成！共提取 124 个文件。', delay: 3000 },

    { msg: '--- 步骤 2/5: check_extract_status.py ---', delay: 3500 },
    { msg: '校验文件完整性... 通过', delay: 3800 },

    { msg: '--- 步骤 3/5: excel_to_csv.py ---', delay: 4500 },
    { msg: '正在转换 Excel 至 CSV...', delay: 4800 },
    { msg: '警告: 文件 tender_2024_03_15.xlsx 包含不规则表头，尝试自动修复... [成功]', delay: 5500, type: 'warning' },
    { msg: '转换完成: 124/124 个文件成功。', delay: 6000 },

    { msg: '--- 步骤 4/5: merge_raw_csvs.py ---', delay: 7000 },
    { msg: '加载过滤配置: config/keywords.json', delay: 7200 },
    { msg: '应用白名单: ["软件", "信息化", "调度", "运检"]', delay: 7500 },
    { msg: '应用黑名单: ["土建", "绿化", "食堂"]', delay: 7800 },
    { msg: '正在合并数据...', delay: 8500 },
    { msg: '合并完成！输出文件: tender/outputs/reports/原始数据合并.csv', delay: 9000, type: 'success' },

    { msg: '--- 步骤 5/5: analyze_software_tenders.py ---', delay: 10000 },
    { msg: '正在进行商机挖掘...', delay: 10500 },
    { msg: '识别到高价值商机: "江苏省电力公司2025年第一次信息化物资招标"', delay: 11000, type: 'highlight' },
    { msg: '识别到高价值商机: "南京供电公司变电站智能运检系统"', delay: 11500, type: 'highlight' },
    { msg: '=== 全流程执行完毕 ===', delay: 12500, type: 'success' },
]

export default function DataPipelineSimulator({ onClose }: { onClose: () => void }) {
    const [activeTab, setActiveTab] = useState('tender')
    const [logs, setLogs] = useState<{ text: string; type?: string }[]>([
        { text: '系统初始化完成...' },
        { text: '当前工作区: D:/Projects/Jiangsu_Bidding_Data' },
        { text: '等待指令...' },
    ])
    const [isRunning, setIsRunning] = useState(false)
    const [progress, setProgress] = useState(0)
    const consoleRef = useRef<HTMLDivElement>(null)

    // Auto-scroll console
    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight
        }
    }, [logs])

    const addLog = (text: string, type?: string) => {
        setLogs((prev) => [...prev, { text, type }])
    }

    const runPipeline = async () => {
        if (isRunning) return
        setIsRunning(true)
        setLogs([])
        addLog('=== 开始执行一键全流程处理 ===')
        setProgress(5)

        let stepIndex = 0
        const totalDuration = SIMULATION_STEPS[SIMULATION_STEPS.length - 1].delay

        SIMULATION_STEPS.forEach((step) => {
            setTimeout(() => {
                addLog(step.msg, step.type)
                // Update progress roughly based on time
                setProgress(Math.min(95, Math.floor((step.delay / totalDuration) * 100)))
                stepIndex++
                if (stepIndex === SIMULATION_STEPS.length) {
                    setIsRunning(false)
                    setProgress(100)
                }
            }, step.delay)
        })
    }

    return (
        <div className="flex flex-col h-[85vh] w-full max-w-5xl bg-[#f0f0f0] dark:bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-300 dark:border-gray-700 text-sm font-sans select-none">
            {/* Title Bar - Windows Style */}
            <div className="bg-white dark:bg-[#2d2d2d] border-b border-gray-300 dark:border-black/20 flex items-center justify-between px-3 py-2 select-none drag-handle">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">Py</div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">江苏省招投标数据智能化清洗系统 v1.0</span>
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={onClose} className="p-1 hover:bg-red-500 hover:text-white rounded transition-colors text-gray-500">
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-[#f9f9f9] dark:bg-[#252525] border-b border-gray-300 dark:border-black/20 p-2 flex items-center justify-between">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        onClick={runPipeline}
                        disabled={isRunning}
                        className={`flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white shadow-sm transition-all ${isRunning ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:translate-y-0.5'}`}
                    >
                        {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
                        <span>一键全流程处理</span>
                    </button>
                    <span className="text-gray-400 text-xs hidden sm:inline-block">（自动执行：解压 -&gt; 清洗 -&gt; 过滤 -&gt; 报告）</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-[#1e1e1e] px-2 py-1 rounded border border-gray-300 dark:border-gray-600">
                    <FolderOpen size={12} />
                    <span>工作区: D:/Projects/Jiangsu_Bidding_Data</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Main Interface */}
                <div className="flex-1 flex flex-col p-2 sm:p-3 gap-3 overflow-hidden">

                    {/* Tabs */}
                    <div className="flex items-end gap-1 border-b border-gray-300 dark:border-gray-600 px-1 overflow-x-auto scrollbar-none">
                        {[
                            { id: 'tender', label: '1. 招标数据处理', icon: FileText },
                            { id: 'award', label: '2. 中标数据处理', icon: CheckCircle2 },
                            { id: 'analysis', label: '3. 数据融合与分析', icon: BarChart3 },
                            { id: 'settings', label: '设置', icon: Settings }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-t-lg transition-colors text-xs font-medium border-t border-l border-r whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-white dark:bg-[#1e1e1e] border-gray-300 dark:border-gray-600 border-b-white dark:border-b-[#1e1e1e] text-blue-600 dark:text-blue-400 relative top-[1px]'
                                    : 'bg-gray-100 dark:bg-[#252525] border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-gray-600 rounded-b-lg rounded-tr-lg p-3 sm:p-4 overflow-y-auto">
                        {activeTab === 'tender' && (
                            <div className="space-y-4 sm:space-y-6">
                                {/* Group 1 */}
                                <fieldset className="border border-gray-200 dark:border-gray-700 rounded p-3 relative">
                                    <legend className="text-xs px-1 text-blue-600 font-semibold bg-white dark:bg-[#1e1e1e] ml-2">1. 压缩包处理</legend>
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-3">
                                        <button className="btn-secondary"><FolderOpen size={20} className="sm:mb-1 text-yellow-500" /> 导入压缩包</button>
                                        <button className="btn-secondary"><Play size={20} className="sm:mb-1 text-green-500" /> 提取压缩包</button>
                                        <button className="btn-secondary"><CheckCircle2 size={20} className="sm:mb-1 text-blue-500" /> 检查状态</button>
                                    </div>
                                    <div className="bg-white border inset-border h-24 p-2 overflow-y-auto text-xs font-mono">
                                        <div className="text-green-600">[已处理] 2024-Jiangsu-Tender-Batch-01.zip</div>
                                        <div className="text-green-600">[已处理] 2024-Jiangsu-Tender-Batch-02.zip</div>
                                        <div className="text-gray-400">[待处理] 2025-Jiangsu-Tender-New.zip</div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">已导入压缩包 (共 3 个)</div>
                                </fieldset>

                                {/* Group 2 */}
                                <fieldset className="border border-gray-200 dark:border-gray-700 rounded p-3 relative">
                                    <legend className="text-xs px-1 text-blue-600 font-semibold bg-white dark:bg-[#1e1e1e] ml-2">2. Excel数据处理</legend>
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-2">
                                        <button className="btn-secondary">
                                            <FileSpreadsheet size={20} className="sm:mb-1 text-green-600" />
                                            Excel转CSV
                                        </button>
                                        <button className="btn-secondary">
                                            <Filter size={20} className="sm:mb-1 text-blue-600" />
                                            过滤与合并
                                        </button>
                                        <button className="btn-secondary">
                                            <Table size={20} className="sm:mb-1 text-purple-600" />
                                            查看合并结果
                                        </button>
                                        <button className="btn-secondary">
                                            <Settings size={20} className="sm:mb-1 text-gray-600" />
                                            配置规则
                                        </button>
                                    </div>
                                </fieldset>
                            </div>
                        )}

                        {activeTab === 'award' && (
                            <div className="space-y-6">
                                <fieldset className="border border-gray-200 dark:border-gray-700 rounded p-3 relative">
                                    <legend className="text-xs px-1 text-blue-600 font-semibold bg-white dark:bg-[#1e1e1e] ml-2">1. PDF预处理</legend>
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-2">
                                        <button className="btn-secondary">
                                            <FileUp size={20} className="sm:mb-1 text-orange-500" />
                                            导入中标PDF
                                        </button>
                                        <button className="btn-secondary">
                                            <FilePenLine size={20} className="sm:mb-1 text-blue-500" />
                                            PDF重命名
                                        </button>
                                    </div>
                                    <div className="bg-white border inset-border h-24 p-2 overflow-y-auto text-xs text-gray-400 italic">
                                        暂无导入文件...
                                    </div>
                                </fieldset>
                            </div>
                        )}

                        {activeTab === 'analysis' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-900 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:shadow-md transition-shadow">
                                        <BarChart3 size={32} className="text-blue-600" />
                                        <div className="font-semibold text-gray-800 dark:text-gray-200">生成数据仪表盘</div>
                                        <div className="text-xs text-gray-500">基于清洗后的数据生成可视化报告</div>
                                    </div>
                                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-100 dark:border-purple-900 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:shadow-md transition-shadow">
                                        <Search size={32} className="text-purple-600" />
                                        <div className="font-semibold text-gray-800 dark:text-gray-200">智能商机检索</div>
                                        <div className="text-xs text-gray-500">基于 keywords.json 挖掘高价值标段</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="p-4 text-xs text-gray-500 leading-relaxed">
                                <p>【使用说明】</p>
                                <p>1. 本工具依赖 Python 环境，请确保已安装 requirements.txt 中的依赖。</p>
                                <p>2. 所有操作基于当前项目目录结构，请勿随意移动 exe 文件位置。</p>
                            </div>
                        )}
                    </div>

                    {/* Console Output */}
                    <div className="h-32 sm:h-40 bg-[#1e1e1e] text-gray-300 font-mono text-xs rounded-lg flex flex-col overflow-hidden shadow-inner border border-gray-600 shrink-0">
                        <div className="bg-[#2d2d2d] px-2 py-1 text-[10px] text-gray-500 flex justify-between items-center border-b border-black/40">
                            <span className="flex items-center gap-1"><Terminal size={10} /> 执行日志</span>
                            <button title="Clear" onClick={() => setLogs([])} className="hover:text-white"><RefreshCw size={10} /></button>
                        </div>
                        {isRunning && (
                            <div className="h-[2px] bg-[#2d2d2d] w-full">
                                <div className="h-full bg-blue-500 transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
                            </div>
                        )}
                        <div ref={consoleRef} className="flex-1 p-2 overflow-y-auto space-y-1">
                            {logs.map((log, i) => (
                                <div key={i} className={`${log.type === 'warning' ? 'text-yellow-400' : log.type === 'success' ? 'text-green-400' : log.type === 'highlight' ? 'text-cyan-400 font-bold' : ''}`}>
                                    {log.text}
                                </div>
                            ))}
                            {isRunning && <div className="animate-pulse">_</div>}
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
        .btn-secondary {
            @apply flex sm:flex-col flex-row items-center sm:justify-center justify-start gap-3 sm:gap-0 w-full sm:w-24 h-10 sm:h-16 px-3 sm:p-1 rounded bg-white dark:bg-[#2d2d2d] border border-transparent hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-[#333] text-gray-700 dark:text-gray-300 text-xs transition-colors active:scale-95 text-center;
        }
        .inset-border {
             box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
        }
        /* Custom scrollbar hiding */
        .scrollbar-none::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
        </div>
    )
}
