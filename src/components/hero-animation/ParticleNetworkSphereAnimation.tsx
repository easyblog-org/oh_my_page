import { useRef, useEffect } from "react";
import type * as THREE from "three";
import type { HeroAnimationProps } from "./types";

const PARTICLE_COUNT = 600;
const SPHERE_RADIUS = 2.0;
const LINE_DISTANCE_THRESHOLD = SPHERE_RADIUS * 0.35;
const MAX_LINES = 2000;
const BASE_COLOR = 0x3b82f6;
const HIGHLIGHT_COLOR = 0x60a5fa;
const ROTATION_SPEED_Y = 0.15;
const WOBBLE_SPEED_X = 0.08;
const WOBBLE_AMOUNT = 0.15;

function fibonacciSphere(count: number, radius: number): { x: number; y: number; z: number }[] {
  const points: { x: number; y: number; z: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;

    points.push({
      x: Math.cos(theta) * radiusAtY * radius,
      y: y * radius,
      z: Math.sin(theta) * radiusAtY * radius,
    });
  }

  return points;
}

function createCircleTexture(THREE_MOD: typeof import("three")): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const center = size / 2;

  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, "rgba(96, 165, 250, 1)");
  gradient.addColorStop(0.3, "rgba(59, 130, 246, 0.8)");
  gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE_MOD.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function computeLinePositions(spherePoints: { x: number; y: number; z: number }[]): number[] {
  const linePositions: number[] = [];

  for (let i = 0; i < PARTICLE_COUNT && linePositions.length / 3 < MAX_LINES * 2; i++) {
    for (let j = i + 1; j < PARTICLE_COUNT && linePositions.length / 3 < MAX_LINES * 2; j++) {
      const dx = spherePoints[i].x - spherePoints[j].x;
      const dy = spherePoints[i].y - spherePoints[j].y;
      const dz = spherePoints[i].z - spherePoints[j].z;
      const distSq = dx * dx + dy * dy + dz * dz;
      const thresholdSq = LINE_DISTANCE_THRESHOLD * LINE_DISTANCE_THRESHOLD;

      if (distSq < thresholdSq) {
        linePositions.push(
          spherePoints[i].x, spherePoints[i].y, spherePoints[i].z,
          spherePoints[j].x, spherePoints[j].y, spherePoints[j].z
        );
      }
    }
  }

  return linePositions;
}

function disposeObject3D(obj: THREE.Object3D) {
  if ((obj as THREE.Mesh).geometry) {
    (obj as THREE.Mesh).geometry.dispose();
  }
  const mat = (obj as THREE.Mesh).material;
  if (mat) {
    if (Array.isArray(mat)) {
      mat.forEach((m) => m.dispose());
    } else {
      mat.dispose();
    }
  }
  if (obj.children) {
    obj.children.forEach(disposeObject3D);
  }
}

export function ParticleNetworkSphereAnimation({ width, height, className }: HeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const idleCallbackRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let sphereGroup: THREE.Group | null = null;
    let pointsGeometry: THREE.BufferGeometry | null = null;
    let pointsMaterial: THREE.PointsMaterial | null = null;
    let lineGeometry: THREE.BufferGeometry | null = null;
    let lineMaterial: THREE.LineBasicMaterial | null = null;
    let circleTexture: THREE.Texture | null = null;
    let disposed = false;

    const init = async () => {
      try {
        const THREE_MOD = await import("three");

        if (disposed) return;

        scene = new THREE_MOD.Scene();
        camera = new THREE_MOD.PerspectiveCamera(50, width / height, 0.1, 100);
        camera.position.set(0, 0, 6);
        camera.lookAt(0, 0, 0);

        renderer = new THREE_MOD.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
          containerRef.current.appendChild(renderer.domElement);
        }

        const ambientLight = new THREE_MOD.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        const pointLight = new THREE_MOD.PointLight(BASE_COLOR, 1.5, 10);
        pointLight.position.set(0, 0, 0);
        scene.add(pointLight);

        sphereGroup = new THREE_MOD.Group();
        scene.add(sphereGroup);

        const spherePoints = fibonacciSphere(PARTICLE_COUNT, SPHERE_RADIUS);
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          positions[i * 3] = spherePoints[i].x;
          positions[i * 3 + 1] = spherePoints[i].y;
          positions[i * 3 + 2] = spherePoints[i].z;
        }

        pointsGeometry = new THREE_MOD.BufferGeometry();
        pointsGeometry.setAttribute("position", new THREE_MOD.BufferAttribute(positions, 3));

        circleTexture = createCircleTexture(THREE_MOD);

        pointsMaterial = new THREE_MOD.PointsMaterial({
          color: HIGHLIGHT_COLOR,
          size: 0.06,
          map: circleTexture,
          transparent: true,
          opacity: 0.9,
          blending: THREE_MOD.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
        });

        const points = new THREE_MOD.Points(pointsGeometry, pointsMaterial);
        sphereGroup.add(points);

        const scheduleIdle = (typeof window !== "undefined" && "requestIdleCallback" in window)
          ? window.requestIdleCallback
          : (cb: () => void) => window.setTimeout(cb, 1);

        idleCallbackRef.current = scheduleIdle(() => {
          if (disposed) return;

          const linePositions = computeLinePositions(spherePoints);

          if (disposed || linePositions.length === 0) return;

          lineGeometry = new THREE_MOD.BufferGeometry();
          lineGeometry.setAttribute("position", new THREE_MOD.Float32BufferAttribute(linePositions, 3));

          lineMaterial = new THREE_MOD.LineBasicMaterial({
            color: BASE_COLOR,
            transparent: true,
            opacity: 0.25,
            blending: THREE_MOD.AdditiveBlending,
            depthWrite: false,
          });

          const lineSegments = new THREE_MOD.LineSegments(lineGeometry, lineMaterial);
          if (sphereGroup) {
            sphereGroup.add(lineSegments);
          }
        });

        const clock = new THREE_MOD.Clock();

        const animate = () => {
          animFrameRef.current = requestAnimationFrame(animate);
          const elapsed = clock.getElapsedTime();

          if (sphereGroup) {
            sphereGroup.rotation.y = elapsed * ROTATION_SPEED_Y;
            sphereGroup.rotation.x = Math.sin(elapsed * WOBBLE_SPEED_X) * WOBBLE_AMOUNT;
          }

          if (lineMaterial) {
            lineMaterial.opacity = 0.2 + 0.08 * Math.sin(elapsed * 1.5);
          }

          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
        };
        animate();
      } catch {
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
      }
    };

    init();

    return () => {
      disposed = true;

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (idleCallbackRef.current) {
        const cancelIdle = (typeof window !== "undefined" && "cancelIdleCallback" in window)
          ? window.cancelIdleCallback
          : window.clearTimeout;
        cancelIdle(idleCallbackRef.current);
      }

      if (sphereGroup) {
        disposeObject3D(sphereGroup);
      }
      if (circleTexture) circleTexture.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
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
