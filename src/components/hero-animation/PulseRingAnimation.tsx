import { useRef, useEffect } from "react";
import type * as THREE from "three";
import type { HeroAnimationProps } from "./types";

const RING_COUNT = 3;
const MIN_RADIUS = 0.5;
const MAX_RADIUS = 2.8;
const RING_TUBE = 0.025;
const BASE_COLOR = 0x3b82f6;
const HIGHLIGHT_COLOR = 0x60a5fa;
const EXPAND_DURATION = 0.8;
const RESET_DELAY = 0.2;
const PARTICLE_COUNT = 50;
const PARTICLE_LIFETIME = 1.0;
const PARTICLE_SPEED = 1.5;

type RingPhase = "expanding" | "waiting";

interface RingState {
  mesh: THREE.Mesh;
  phase: RingPhase;
  elapsed: number;
  delay: number;
  baseRotation: { x: number; y: number; z: number };
}

interface ParticleState {
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function initMobileFallback(container: HTMLDivElement, w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  container.innerHTML = "";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return () => { };

  const rings = [
    { radius: 0, speed: 40, opacity: 0.6 },
    { radius: 0, speed: 30, opacity: 0.4 },
  ];
  let offset = 0;
  let frameId = 0;

  const draw = () => {
    frameId = requestAnimationFrame(draw);
    ctx!.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(w, h) * 0.4;

    for (const ring of rings) {
      ring.radius += ring.speed * 0.016;
      if (ring.radius > maxR) ring.radius = 0;

      const progress = ring.radius / maxR;
      const alpha = ring.opacity * (1 - progress);

      ctx!.beginPath();
      ctx!.arc(cx, cy, ring.radius, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
      ctx!.lineWidth = 2;
      ctx!.stroke();
    }

    const glowR = 6 + 2 * Math.sin(offset * 0.05);
    const gradient = ctx!.createRadialGradient(cx, cy, 0, cx, cy, glowR * 3);
    gradient.addColorStop(0, "rgba(96, 165, 250, 0.8)");
    gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
    ctx!.beginPath();
    ctx!.arc(cx, cy, glowR * 3, 0, Math.PI * 2);
    ctx!.fillStyle = gradient;
    ctx!.fill();

    offset++;
  };

  draw();
  return () => cancelAnimationFrame(frameId);
}

export function PulseRingAnimation({ width, height, className }: HeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const isDesktop = window.innerWidth >= 768;

    if (!isDesktop) {
      const cleanup = initMobileFallback(containerRef.current, width, height);
      return cleanup;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const cleanup = initMobileFallback(containerRef.current, width, height);
      return cleanup;
    }

    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let centerSphere: THREE.Mesh | null = null;
    let centerLight: THREE.PointLight | null = null;
    let points: THREE.Points | null = null;
    let pointsGeometry: THREE.BufferGeometry | null = null;
    let pointsMaterial: THREE.PointsMaterial | null = null;
    const rings: RingState[] = [];
    const sharedGeometry: THREE.TorusGeometry | null = null;
    const geometries: THREE.TorusGeometry[] = [];
    const materials: THREE.MeshStandardMaterial[] = [];
    const particleStates: ParticleState[] = [];
    const disposables: THREE.Material[] = [];

    const init = async () => {
      try {
        const THREE_MOD = await import("three");

        scene = new THREE_MOD.Scene();
        camera = new THREE_MOD.PerspectiveCamera(50, width / height, 0.1, 100);
        camera.position.set(0, 0.8, 5.5);
        camera.lookAt(0, 0, 0);

        renderer = new THREE_MOD.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
          containerRef.current.appendChild(renderer.domElement);
        }

        const ambientLight = new THREE_MOD.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        const dirLight = new THREE_MOD.DirectionalLight(0xffffff, 0.5);
        dirLight.position.set(1, 2, 1);
        scene.add(dirLight);

        centerLight = new THREE_MOD.PointLight(BASE_COLOR, 2, 6);
        centerLight.position.set(0, 0, 0);
        scene.add(centerLight);

        const sharedGeo = new THREE_MOD.TorusGeometry(1, RING_TUBE, 16, 128);
        geometries.push(sharedGeo);

        for (let i = 0; i < RING_COUNT; i++) {
          const material = new THREE_MOD.MeshStandardMaterial({
            color: BASE_COLOR,
            emissive: BASE_COLOR,
            emissiveIntensity: 0.6,
            transparent: true,
            opacity: 0.9,
            side: THREE_MOD.DoubleSide,
            metalness: 0.3,
            roughness: 0.4,
          });

          const mesh = new THREE_MOD.Mesh(sharedGeo, material);

          const tiltX = 0.15 + i * 0.12;
          const tiltY = i * 0.25;
          const tiltZ = i * 0.08;
          mesh.rotation.set(tiltX, tiltY, tiltZ);

          scene.add(mesh);
          materials.push(material);

          rings.push({
            mesh,
            phase: "expanding",
            elapsed: (i * (EXPAND_DURATION + RESET_DELAY)) / RING_COUNT,
            delay: 0,
            baseRotation: { x: tiltX, y: tiltY, z: tiltZ },
          });
        }

        const sphereGeo = new THREE_MOD.SphereGeometry(0.1, 32, 32);
        const sphereMat = new THREE_MOD.MeshStandardMaterial({
          color: HIGHLIGHT_COLOR,
          emissive: BASE_COLOR,
          emissiveIntensity: 1.2,
          transparent: true,
          opacity: 0.95,
          metalness: 0.5,
          roughness: 0.2,
        });
        centerSphere = new THREE_MOD.Mesh(sphereGeo, sphereMat);
        scene.add(centerSphere);
        geometries.push(sphereGeo);
        disposables.push(sphereMat);

        pointsGeometry = new THREE_MOD.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          positions[i * 3] = 0;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = 0;
          sizes[i] = 0;

          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const speed = PARTICLE_SPEED * (0.5 + Math.random() * 0.5);

          particleStates.push({
            velocity: new THREE_MOD.Vector3(
              Math.sin(phi) * Math.cos(theta) * speed,
              Math.sin(phi) * Math.sin(theta) * speed,
              Math.cos(phi) * speed
            ),
            life: Math.random() * PARTICLE_LIFETIME,
            maxLife: PARTICLE_LIFETIME * (0.6 + Math.random() * 0.4),
          });
        }

        pointsGeometry.setAttribute("position", new THREE_MOD.BufferAttribute(positions, 3));
        pointsGeometry.setAttribute("size", new THREE_MOD.BufferAttribute(sizes, 1));

        pointsMaterial = new THREE_MOD.PointsMaterial({
          color: HIGHLIGHT_COLOR,
          size: 0.04,
          transparent: true,
          opacity: 0.8,
          blending: THREE_MOD.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
        });

        points = new THREE_MOD.Points(pointsGeometry, pointsMaterial);
        scene.add(points);

        const clock = new THREE_MOD.Clock();

        const animate = () => {
          animFrameRef.current = requestAnimationFrame(animate);
          const delta = clock.getDelta();
          const elapsed = clock.getElapsedTime();

          for (const ring of rings) {
            if (ring.phase === "expanding") {
              ring.elapsed += delta;
              const t = Math.min(ring.elapsed / EXPAND_DURATION, 1);
              const easedT = easeOutCubic(t);

              const currentRadius = MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * easedT;
              const scale = currentRadius / 1;
              ring.mesh.scale.setScalar(scale);

              const opacity = 0.9 * (1 - t * 0.9);
              (ring.mesh.material as THREE.MeshStandardMaterial).opacity = opacity;
              (ring.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 * (1 - t * 0.7);

              ring.mesh.rotation.x = ring.baseRotation.x + Math.sin(elapsed * 0.3 + ring.baseRotation.y) * 0.05;
              ring.mesh.rotation.y = ring.baseRotation.y + elapsed * 0.15;

              if (t >= 1) {
                ring.phase = "waiting";
                ring.delay = 0;
              }
            } else {
              ring.delay += delta;
              (ring.mesh.material as THREE.MeshStandardMaterial).opacity = 0;

              if (ring.delay >= RESET_DELAY) {
                ring.phase = "expanding";
                ring.elapsed = 0;
                ring.mesh.scale.setScalar(MIN_RADIUS);
              }
            }
          }

          if (centerSphere) {
            (centerSphere.material as THREE.MeshStandardMaterial).opacity = 0.7 + 0.25 * Math.sin(elapsed * 3);
            (centerSphere.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8 + 0.4 * Math.sin(elapsed * 3);
          }
          if (centerLight) {
            centerLight.intensity = 1.5 + 0.8 * Math.sin(elapsed * 3);
          }

          if (pointsGeometry && particleStates.length > 0) {
            const posAttr = pointsGeometry.getAttribute("position") as THREE.BufferAttribute;
            const sizeAttr = pointsGeometry.getAttribute("size") as THREE.BufferAttribute;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
              const p = particleStates[i];
              p.life += delta;

              if (p.life >= p.maxLife) {
                p.life = 0;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const speed = PARTICLE_SPEED * (0.5 + Math.random() * 0.5);
                p.velocity.set(
                  Math.sin(phi) * Math.cos(theta) * speed,
                  Math.sin(phi) * Math.sin(theta) * speed,
                  Math.cos(phi) * speed
                );
                p.maxLife = PARTICLE_LIFETIME * (0.6 + Math.random() * 0.4);
                posAttr.setXYZ(i, 0, 0, 0);
                sizeAttr.setX(i, 0.04);
              } else {
                const lifeRatio = p.life / p.maxLife;
                posAttr.setXYZ(
                  i,
                  p.velocity.x * p.life,
                  p.velocity.y * p.life,
                  p.velocity.z * p.life
                );
                sizeAttr.setX(i, 0.04 * (1 - lifeRatio));
              }
            }

            posAttr.needsUpdate = true;
            sizeAttr.needsUpdate = true;
          }

          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
        };
        animate();
      } catch {
        if (containerRef.current) {
          initMobileFallback(containerRef.current, width, height);
        }
      }
    };

    init();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      disposables.forEach((m) => m.dispose());
      if (pointsGeometry) pointsGeometry.dispose();
      if (pointsMaterial) pointsMaterial.dispose();
      if (renderer) renderer.dispose();
    };
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center ${className ?? ""}`}
      style={{ width, height }}
    />
  );
}
