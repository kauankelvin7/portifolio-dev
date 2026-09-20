"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Component, useEffect, useMemo, useRef, useState, type ErrorInfo, type RefObject, type ReactNode } from "react";
import * as THREE from "three";
import styles from "./three-d.module.css";
import type { ThreeScene } from "./types";

type Target = { element: HTMLElement; id: string; scene: ThreeScene };

interface ThreeErrorBoundaryProps {
  children: ReactNode;
  onError: (error: Error, info: ErrorInfo) => void;
}

interface ThreeErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<ThreeErrorBoundaryProps, ThreeErrorBoundaryState> {
  state: ThreeErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ThreeErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError(error, info);
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

const K_BLOCKS: Array<[number, number]> = [
  [-1.05, 1.2], [-1.05, 0.6], [-1.05, 0], [-1.05, -0.6], [-1.05, -1.2],
  [-0.45, 0], [0.1, 0.5], [0.68, 1.05], [0.1, -0.5], [0.68, -1.05],
];

function HeroStructure({ pulse }: { pulse: number }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const started = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>('[data-three-scene="hero"]');
    if (!target) return;
    const move = (event: PointerEvent) => {
      const rect = target.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.3;
      pointer.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.2;
    };
    target.addEventListener("pointermove", move, { passive: true });
    return () => target.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => { started.current = performance.now(); }, [pulse]);

  useFrame((state) => {
    if (!mesh.current || !group.current) return;
    const elapsed = (performance.now() - started.current) / 1_000;
    const form = THREE.MathUtils.smoothstep(elapsed, 0.15, 1.9);
    const wave = elapsed < 0.75 ? Math.sin((elapsed / 0.75) * Math.PI) * 0.18 : 0;
    K_BLOCKS.forEach(([x, y], index) => {
      const delay = index * 0.035;
      const progress = THREE.MathUtils.smoothstep(form, delay, Math.min(1, delay + 0.42));
      const scatter = 1 - progress;
      dummy.position.set(x + Math.sin(index * 2.3) * scatter * 1.7, y + Math.cos(index * 1.7) * scatter * 1.5, Math.sin(index) * scatter * 1.4 + wave * (index % 3));
      dummy.rotation.set(scatter * index * 0.22, scatter * index * 0.31, 0.06 * Math.sin(state.clock.elapsedTime * 0.65 + index));
      dummy.scale.setScalar(0.92 + wave);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.current.x, 0.045);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.current.y, 0.045);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.06;
  });

  return (
    <group ref={group} rotation={[0.08, -0.18, -0.03]}>
      <instancedMesh ref={mesh} args={[undefined, undefined, K_BLOCKS.length]}>
        <boxGeometry args={[0.48, 0.48, 0.48]} />
        <meshStandardMaterial color="#8baa7d" roughness={0.58} metalness={0.08} />
      </instancedMesh>
      <lineSegments scale={1.08}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.7, 3.2, 0.08)]} />
        <lineBasicMaterial color="#8baa7d" transparent opacity={0.17} />
      </lineSegments>
    </group>
  );
}

function LeveMotif() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (group.current) group.current.rotation.z = clock.elapsedTime * 0.08; });
  return <group ref={group}><mesh rotation={[1.12, 0.15, 0]}><torusGeometry args={[1.05, 0.035, 8, 48]} /><meshBasicMaterial color="#8baa7d" /></mesh><mesh rotation={[0.28, 0.9, 0.4]}><torusGeometry args={[0.72, 0.025, 8, 40]} /><meshBasicMaterial color="#c2cdb9" transparent opacity={0.55} /></mesh></group>;
}

function OmniMotif() {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => [[-1, .5, 0], [-.5, -.65, .3], [.15, .2, 0], [.85, -.4, .2], [.9, .8, -.2]] as Array<[number,number,number]>, []);
  useFrame(({ clock }) => { if (group.current) group.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.2; });
  return <group ref={group}>{points.map((point,index)=><mesh position={point} key={index}><sphereGeometry args={[index===2?.16:.1,12,12]} /><meshStandardMaterial color={index===2?"#f1f3ec":"#8baa7d"} /></mesh>)}<line><bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array(points.flatMap((p,i)=> i ? [...points[i-1],...p] : p)),3]} /></bufferGeometry><lineBasicMaterial color="#8baa7d" transparent opacity={0.45} /></line></group>;
}

function CinesiaMotif() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (group.current) group.current.rotation.y = Math.sin(clock.elapsedTime * .55) * .16; });
  return <group ref={group}>{[0,1,2,3].map((index)=><mesh key={index} position={[-.5+index*.28,-.48+index*.3,index*-.08]} rotation={[0,index*.08,-.08+index*.04]}><boxGeometry args={[1.35,.88,.08]} /><meshStandardMaterial color={index===3?"#8baa7d":"#273329"} roughness={.75} /></mesh>)}</group>;
}

function AutomationMotif() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (group.current) group.current.position.x = ((clock.elapsedTime*.22)%1)-.5; });
  return <group ref={group}>{[-1,0,1].map((x,index)=><mesh key={x} position={[x*.72,index%2?.15:-.1,0]}><boxGeometry args={[.48,.48,.48]} /><meshStandardMaterial color={index===1?"#8baa7d":"#344237"} /></mesh>)}</group>;
}

function Scene({ scene, pulse }: { scene: ThreeScene; pulse: number }) {
  if (scene === "hero") return <HeroStructure pulse={pulse} />;
  if (scene === "leve") return <LeveMotif />;
  if (scene === "omni") return <OmniMotif />;
  if (scene === "cinesia") return <CinesiaMotif />;
  return <AutomationMotif />;
}

function DemandInvalidation({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);
  useFrame(() => {
    if (active && !document.hidden) invalidate();
  });
  useEffect(() => {
    const onVisibility = () => { if (!document.hidden) invalidate(); };
    document.addEventListener("visibilitychange", onVisibility);
    if (active) invalidate();
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [active, invalidate]);
  return null;
}

export function ThreeCanvasRuntime() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [pulse, setPulse] = useState(0);
  const [active, setActive] = useState(true);
  const [failed, setFailed] = useState(false);
  const visibleTargets = useRef(new Set<HTMLElement>());

  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>("[data-three-scene]")];
    const frame = requestAnimationFrame(() => setTargets(elements.map((element, index) => ({
      element,
      id: element.id || `scene-${index}`,
      scene: (element.dataset.threeScene || "hero") as ThreeScene,
    }))));
    const hero = elements.find((element) => element.dataset.threeScene === "hero");
    const onClick = () => setPulse((value) => value + 1);
    hero?.addEventListener("click", onClick);
    const visible = visibleTargets.current;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          visible.add(target);
        } else {
          visible.delete(target);
          if (!failed) target.dataset.threeState = "fallback:not-visible";
        }
      }
      setActive(visible.size > 0);
    }, { rootMargin: "120px" });
    elements.forEach((element) => observer.observe(element));
      document.documentElement.dataset.threeReady = "true";
    return () => {
      hero?.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibleTargets.current.clear();
      delete document.documentElement.dataset.threeReady;
    };
  }, []);

  const handleCanvasCreated = () => {
    if (failed) return;
    targets.forEach(({ element }) => {
      if (visibleTargets.current.has(element)) element.dataset.threeState = "mounted";
    });
  };

  const handleCanvasError = (error: Error, info: ErrorInfo) => {
    console.warn("[three-d] Canvas mount failed; using static fallback.", { error, info });
    setFailed(true);
    targets.forEach(({ element }) => { element.dataset.threeState = "fallback:error"; });
    delete document.documentElement.dataset.threeReady;
  };

  if (!targets.length || failed) return null;

  return (
    <ThreeErrorBoundary onError={handleCanvasError}>
      <Canvas onCreated={handleCanvasCreated} aria-hidden="true" className={styles.canvasLayer} dpr={[1, typeof window !== "undefined" && window.innerWidth < 768 ? 1.5 : 2]} frameloop="demand" camera={{ position: [0, 0, 5.2], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        {targets.map((target, index) => (
          <View key={target.id} track={{ current: target.element } as RefObject<HTMLElement>} index={index + 1}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 4, 5]} intensity={2.1} />
            <Scene scene={target.scene} pulse={pulse} />
          </View>
        ))}
        <DemandInvalidation active={active} />
        <View.Port />
      </Canvas>
    </ThreeErrorBoundary>
  );
}
