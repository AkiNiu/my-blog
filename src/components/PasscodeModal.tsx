import { useState, useRef, useEffect } from 'react'
import { X, Download, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'

type PasscodeModalProps = {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    correctCode: string
}

export default function PasscodeModal({ isOpen, onClose, onSuccess, correctCode }: PasscodeModalProps) {
    const [code, setCode] = useState(['', '', '', ''])
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        if (isOpen) {
            setCode(['', '', '', ''])
            setError(false)
            setSuccess(false)
            setTimeout(() => inputRefs.current[0]?.focus(), 100)
        }
    }, [isOpen])

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return // Only allow digits

        const newCode = [...code]
        newCode[index] = value.slice(-1) // Only take last digit
        setCode(newCode)
        setError(false)

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus()
        }

        // Auto-submit when all 4 digits entered
        if (newCode.every(c => c !== '')) {
            const enteredCode = newCode.join('')
            if (enteredCode === correctCode) {
                setSuccess(true)
                setTimeout(() => {
                    onSuccess()
                    onClose()
                }, 500)
            } else {
                setError(true)
                setCode(['', '', '', ''])
                setTimeout(() => inputRefs.current[0]?.focus(), 100)
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <X size={18} />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${success ? 'bg-green-100 dark:bg-green-900/30' : 'bg-primary/10'
                        }`}>
                        {success ? (
                            <CheckCircle2 size={32} className="text-green-600" />
                        ) : (
                            <Lock size={28} className="text-primary" />
                        )}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2">
                    {success ? '验证成功！' : '简历访问验证'}
                </h3>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                    {success ? '正在下载简历...' : '请输入 4 位数字码以获取简历'}
                </p>

                {/* Code Input */}
                {!success && (
                    <>
                        <div className="flex justify-center gap-3 mb-4">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => { inputRefs.current[index] = el }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleChange(index, e.target.value)}
                                    onKeyDown={e => handleKeyDown(index, e)}
                                    className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all outline-none ${error
                                            ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 animate-shake'
                                            : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="flex items-center justify-center gap-2 text-red-500 text-sm mb-4 animate-in fade-in duration-200">
                                <AlertCircle size={14} />
                                <span>验证码错误，请重试</span>
                            </div>
                        )}

                        {/* Hint */}
                        <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                            💡 提示：数字码可通过社交媒体 / 面试沟通获取
                        </p>
                    </>
                )}

                <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-4px); }
            40%, 80% { transform: translateX(4px); }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
        `}</style>
            </div>
        </div>
    )
}
