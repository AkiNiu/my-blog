import { useState } from 'react';

const awards = [
    { year: '2022', title: '硕士研究生学业二等奖学金', icon: '🎓' },
    { year: '2017', title: '校长二等奖学金', icon: '🏆' },
    { year: '2016', title: '校长三等奖学金', icon: '🥉' },
    { year: '2016', title: '校级“道德高尚”类单项奖学金', icon: '💡' },
    { year: '2015', title: '“律动青春”摄影大赛三等奖', icon: '📸' },
    { year: '2015', title: '学生骨干培训证书', icon: '📜' },
    { year: '2015–2017', title: '辅修二等奖学金（连续2年）', icon: '📚' },
    { year: '2014–2017', title: '优秀团干/团员（连续3年）', icon: '🏅' },
];

export default function TrophyWall() {
    const [flip, setFlip] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto py-8">
            {awards.map((item, idx) => (
                <div
                    key={idx}
                    className="group perspective-1000"
                    onMouseEnter={() => setFlip(idx)}
                    onMouseLeave={() => setFlip(null)}
                >
                    <div
                        className={`relative w-full h-32 rounded-2xl shadow-lg transition-transform duration-700 preserve-3d ${flip === idx ? 'rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* 正面 */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-2xl backface-hidden">
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <div className="text-white font-bold">{item.year}</div>
                        </div>
                        {/* 背面 */}
                        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl backface-hidden rotate-y-180">
                            <div className="text-center px-2">
                                <div className="text-gray-800 font-semibold text-sm">{item.title}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}