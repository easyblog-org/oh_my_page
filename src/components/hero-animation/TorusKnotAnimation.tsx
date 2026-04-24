import { useRef, useEffect } from "react";
import type * as THREE from "three";
import type { HeroAnimationProps } from "./types";

export function TorusKnotAnimation({ width, height, className }: HeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let mesh: THREE.Mesh | null = null;

    const initThree = async () => {
      try {
        const THREE_MOD = await import("three");

        scene = new THREE_MOD.Scene();
        camera = new THREE_MOD.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE_MOD.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
          containerRef.current.appendChild(renderer.domElement);
        }

        const geometry = new THREE_MOD.TorusKnotGeometry(1.2, 0.4, 100, 16);
        const material = new THREE_MOD.MeshBasicMaterial({
          color: 0x3b82f6,
          wireframe: true,
          transparent: true,
          opacity: 0.6,
        });
        mesh = new THREE_MOD.Mesh(geometry, material);
        scene.add(mesh);

        const animate = () => {
          animFrameRef.current = requestAnimationFrame(animate);
          if (mesh) {
            mesh.rotation.y += 0.005;
            mesh.rotation.x += 0.002;
          }
          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
        };
        animate();
      } catch {
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="width:${width}px;height:${height}px;display:flex;align-items:center;justify-content:center;">
              <div style="width:200px;height:200px;border:2px solid rgba(59,130,246,0.3);border-radius:50%;"></div>
            </div>
          `;
        }
      }
    };

    initThree();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      className={`hidden md:flex items-center justify-center ${className ?? ""}`}
      style={{ width, height }}
    />
  );
}
