import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { resumeKnowledge } from '../data/resumeKnowledge';

export default function HRActions() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // 生成二维码名片
        const { profile, contact } = resumeKnowledge;
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
ORG:东华大学 材料与化工硕士
TEL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.github}
ADR:;;南京;;;;
NOTE:材料与化工方向，熟悉纺织复合材料、有限元分析
END:VCARD`;
        QRCode.toCanvas(canvasRef.current!, vCard, { width: 160, margin: 2 }, (err) => {
            if (err) console.error(err);
        });
    }, []);

    const handleCall = () => {
        window.location.href = `tel:${resumeKnowledge.contact.phone}`;
    };
    const handleEmail = () => {
        window.location.href = `mailto:${resumeKnowledge.contact.email}`;
    };
    const handleDownloadPDF = () => {
        const link = document.createElement('a');
        link.href = `${import.meta.env.BASE_URL}resume.pdf`;
        link.download = '刘生杰-简历.pdf';
        link.click();
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 py-6">
            <button
                onClick={handleCall}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition shadow"
                aria-label="一键拨号"
            >
                <span>📞</span>
                <span>152-2228-0915</span>
            </button>
            <button
                onClick={handleEmail}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow"
                aria-label="发送邮件"
            >
                <span>✉️</span>
                <span>15222280915@163.com</span>
            </button>
            <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition shadow"
                aria-label="下载PDF"
            >
                <span>📄</span>
                <span>下载PDF</span>
            </button>
            <div className="flex flex-col items-center gap-2">
                <canvas ref={canvasRef} className="rounded-lg shadow" />
                <span className="text-xs text-gray-600">扫码保存名片</span>
            </div>
        </div>
    );
}
