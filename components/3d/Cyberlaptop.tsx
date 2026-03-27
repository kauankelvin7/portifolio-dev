"use client";

import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
    defaultMaterial_1: THREE.Mesh;
    defaultMaterial_2: THREE.Mesh;
    defaultMaterial_3: THREE.Mesh;
    defaultMaterial_4: THREE.Mesh;
    defaultMaterial_5: THREE.Mesh;
    defaultMaterial_6: THREE.Mesh;
    defaultMaterial_7: THREE.Mesh;
  };
  materials: {
    Pantalla: THREE.MeshPhysicalMaterial;
    Detalles: THREE.MeshStandardMaterial;
    Bisagras: THREE.MeshStandardMaterial;
    Bases: THREE.MeshStandardMaterial;
    Marcos: THREE.MeshStandardMaterial;
    Forros: THREE.MeshStandardMaterial;
    Carcasa_2: THREE.MeshStandardMaterial;
    Carcasa_1: THREE.MeshStandardMaterial;
  };
};

type CyberlaptopProps = React.ComponentProps<"group"> & { 
  showScreen?: boolean; 
  isMobile: boolean;
};

export function Cyberlaptop({ showScreen = true, isMobile, ...props }: CyberlaptopProps) {
  const { nodes, materials } = useGLTF("/cyberlaptop-transformed.glb") as unknown as GLTFResult;
  const { isLowEnd, isHigh, prefersReducedMotion } = useDeviceCapability();
  const groupRef = useRef<THREE.Group>(null);
  
  const responsiveScale = isMobile ? 0.9 : 1.7; 
  const responsivePosition: [number, number, number] = [0, isMobile ? -0.7 : -0.4, 0];

  const screenPosition: [number, number, number] = isMobile
    ? [0, -0.100, -0.460]
    : [0, 0.120, -0.517];
  const responsiveDistanceFactor = isMobile ? 1.1 : 1.1;

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setLogs(["CONNECTION ESTABLISHED."]);
      return;
    }

    const commands = [
      "INITIALIZING NEURAL NET...",
      "BYPASSING SECURITY NODE [443]",
      "ACCESS GRANTED.",
      "DOWNLOADING DATA PACKET...",
      "DECRYPTING: 0x4F 0xA2...",
      "SYSTEM OVERRIDE: ACTIVE",
      "CONNECTION ESTABLISHED."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev: string[]) => [...prev.slice(-8), commands[i % commands.length]]);
      i++;
      if (i >= commands.length && !isHigh) clearInterval(interval); // Stop loop if not high end
    }, 500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isHigh]);

  const scrollY = useRef(0);
  const initialScroll = useRef(0);

  useEffect(() => {
    initialScroll.current = window.scrollY;
    scrollY.current = 0;
    
    const handleScroll = () => {
      scrollY.current = window.scrollY - initialScroll.current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFirstFrame = useRef(true);

  const matPantalla = isLowEnd ? new THREE.MeshStandardMaterial({ color: materials.Pantalla.color }) : materials.Pantalla;

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;

    if (isFirstFrame.current) {
        groupRef.current.rotation.y = 0;
        isFirstFrame.current = false;
    }

    const t = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    const scrollFactor = scrollY.current * 0.0004;

    // Smooth follow + Scroll Offset
    const lerpFactor = isLowEnd ? 0.03 : 0.08;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (mouseX * 0.25) + scrollFactor, lerpFactor);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.15, lerpFactor);

    // Floating
    if (!isLowEnd) {
      groupRef.current.position.y = responsivePosition[1] + Math.sin(t) * 0.06;
    }
  });

  return (
    <group 
      ref={groupRef} 
      {...props} 
      dispose={null} 
      scale={responsiveScale} 
      position={responsivePosition}
    >
      <group>
        <mesh geometry={nodes.defaultMaterial.geometry} material={matPantalla} />
        <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.Detalles} />
        <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.Bisagras} />
        <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.Bases} />
        <mesh geometry={nodes.defaultMaterial_4.geometry} material={materials.Marcos} />
        <mesh geometry={nodes.defaultMaterial_5.geometry} material={materials.Forros} />
        <mesh geometry={nodes.defaultMaterial_6.geometry} material={materials.Carcasa_2} />
        <mesh geometry={nodes.defaultMaterial_7.geometry} material={materials.Carcasa_1} />
      </group>

      <group position={screenPosition} rotation={[-0.250, 0, 0]}>
        
        {showScreen && (
          <Html 
            transform 
            occlude={!isLowEnd} 
            distanceFactor={responsiveDistanceFactor} 
            position={[0, 0, 0.01]} // Slightly forward
            style={{
              width: '486px', // Adjusted
              height: '370px',
              background: '#050505',
              border: isLowEnd ? '1px solid rgba(34, 197, 94, 0.3)' : '2px solid rgba(34, 197, 94, 0.5)', 
              boxShadow: isLowEnd ? 'none' : '0 0 30px rgba(34, 197, 94, 0.15)',
              overflow: 'hidden',
              fontFamily: 'monospace',
              borderRadius: '4px'
            }}
          >
            <div className="w-full h-full p-6 text-green-500 text-xs md:text-sm font-mono flex flex-col relative select-none pointer-events-none tracking-wider">
              <style>{`
                @keyframes flicker {
                  0% { opacity: 0.97; }
                  5% { opacity: 0.95; }
                  10% { opacity: 0.97; }
                  15% { opacity: 0.9; }
                  20% { opacity: 0.97; }
                  100% { opacity: 0.98; }
                }
              `}</style>
              
              <div className="flex justify-between border-b border-green-900/50 pb-2 mb-4 opacity-80" style={{ animation: 'flicker 0.15s infinite' }}>
                 <span>root@cyberdeck:~# ./init_sequence.sh</span>
                 <span className="animate-pulse text-green-400">● LIVE</span>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col justify-end space-y-1">
                 {logs.map((log: string, index: number) => (
                   <div key={index} className="opacity-90 flex" style={{ animation: `flicker ${0.1 + Math.random() * 0.2}s infinite` }}>
                     <span className="text-green-700 mr-3">[{new Date().toLocaleTimeString()}]</span>
                     <span className="text-green-400 font-bold">{log}</span>
                   </div>
                 ))}
                 <div className="mt-2 animate-pulse text-green-300">_</div>
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-size[:100%_4px,6px_100%] opacity-40"></div>
              <div className="absolute inset-0 bg-radial-gradient(circle, transparent 60%, black 100%) pointer-events-none opacity-50"></div>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/cyberlaptop-transformed.glb");