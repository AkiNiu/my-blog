import { useState } from 'react';

const timeline = [
    {
        date: '2021.09 – 至今',
        title: '东华大学 纺织学院',
        subtitle: '研究生二年级在读',
        desc: '平均成绩86.9/100，前25%，主研纬向V形三维间隔织物结构及复材力学性能。',
    },
    {
        date: '2019.05 – 2020.08',
        title: '江苏舜天服饰有限公司',
        subtitle: '外贸业务助理',
        desc: '翻译BOM&CMMTS，与供应商英文往来，解决样衣/大货生产问题。',
    },
    {
        date: '2017.09 – 2018.07',
        title: '天津市大学生创新训练计划',
        subtitle: '项目负责人',
        desc: '氯化锂+超声改性芳纶纤维并上机织造，结题优秀。',
    },
    {
        date: '2015.09 – 2018.07',
        title: '天津工业大学 团联副部长/学生班主任',
        subtitle: '校级卓越管理者',
        desc: '组织党团活动、公众号运营、带队获市级健美操三等奖。',
    },
];

export default function Timeline() {
    const [active, setActive] = useState<number | null>(null);

    return (
        <div className="relative w-full max-w-3xl mx-auto py-8">
            {/* 中线 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-indigo-500 -translate-x-1/2" />
            {timeline.map((item, idx) => {
                const side = idx % 2 === 0 ? 'left' : 'right';
                return (
                    <div
                        key={idx}
                        className={`relative flex items-center mb-12 ${side === 'left' ? 'justify-start' : 'justify-end'}`}
                        onMouseEnter={() => setActive(idx)}
                        onMouseLeave={() => setActive(null)}
                    >
                        {/* 节点 */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 border-cyan-400 shadow" />
                        {/* 卡片 */}
                        <div
                            className={`w-5/12 p-4 rounded-xl shadow-lg bg-white/80 backdrop-blur transition-all duration-300 ${side === 'left' ? 'mr-auto pr-8' : 'ml-auto pl-8'} ${active === idx ? 'scale-105 shadow-cyan-400/40' : ''}`}
                        >
                            <div className="text-sm text-cyan-600 font-semibold">{item.date}</div>
                            <div className="text-lg font-bold text-gray-800">{item.title}</div>
                            <div className="text-sm text-gray-600 mb-2">{item.subtitle}</div>
                            <div className="text-sm text-gray-700">{item.desc}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}