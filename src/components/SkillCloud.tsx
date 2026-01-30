import { useEffect, useRef } from 'react';

const skills = [
    { name: 'Word', color: '#2B579A' },
    { name: 'Excel', color: '#217346' },
    { name: 'PowerPoint', color: '#D04424' },
    { name: 'SolidWorks', color: '#18365D' },
    { name: 'Abaqus', color: '#1F77B4' },
    { name: 'Photoshop', color: '#31A8FF' },
    { name: 'Vos-viewer', color: '#FF7F0E' },
    { name: 'Cite-space', color: '#9467BD' },
];

export default function SkillCloud() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = 220;
        const radius = Math.min(width, height) / 2 - 20;

        // 清空旧节点
        container.innerHTML = '';

        skills.forEach((skill, i) => {
            const angle = (i / skills.length) * 2 * Math.PI;
            const x = radius * Math.cos(angle) + width / 2;
            const y = radius * Math.sin(angle) + height / 2;

            const span = document.createElement('span');
            span.textContent = skill.name;
            span.className = 'absolute px-3 py-1 rounded-full text-white text-sm font-medium shadow-lg transition-transform duration-300 hover:scale-110 cursor-pointer';
            span.style.backgroundColor = skill.color;
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;
            span.style.transform = 'translate(-50%, -50%)';

            // 悬浮动画
            let floatOffset = 0;
            const float = () => {
                floatOffset += 0.02;
                const dy = Math.sin(floatOffset + i) * 4;
                span.style.transform = `translate(-50%, calc(-50% + ${dy}px))`;
                requestAnimationFrame(float);
            };
            float();

            container.appendChild(span);
        });
    }, []);

    return (
        <div className="relative w-full h-56 overflow-hidden" ref={containerRef} />
    );
}