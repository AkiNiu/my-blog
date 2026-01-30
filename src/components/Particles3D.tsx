import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Particles3D() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const mount = mountRef.current;

        // 场景、相机、渲染器
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // 粒子几何体与材质
        const count = 800;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 60;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0x22d3ee, // cyan-400
            size: 0.4,
            transparent: true,
            opacity: 0.7,
        });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 30;

        // 动画循环
        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            particles.rotation.x += 0.0004;
            particles.rotation.y += 0.0006;
            renderer.render(scene, camera);
        };
        animate();

        // 响应式
        const handleResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="fixed inset-0 -z-10" />;
}