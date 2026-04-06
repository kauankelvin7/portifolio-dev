"use client";

import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
  isLowEnd?: boolean;
};

export function Cyberlaptop({ showScreen = true, isMobile, isLowEnd, ...props }: CyberlaptopProps) {
  const { nodes, materials } = useGLTF("/cyberlaptop-transformed.glb") as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  
  const responsiveScale = isMobile ? 0.8 : 1.5; 
  const responsivePosition: [number, number, number] = [0, isMobile ? -0.5 : -0.2, 0];
  const screenPosition: [number, number, number] = isMobile
    ? [0, -0.100, -0.460]
    : [0, 0.120, -0.517];
  const responsiveDistanceFactor = isMobile ? 1.1 : 1.1;

  // Simplified materials for low end
  const matPantalla = isLowEnd ? new THREE.MeshStandardMaterial({ color: materials.Pantalla.color }) : materials.Pantalla;

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
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
      setLogs(prev => [...prev.slice(-8), commands[i % commands.length]]);
      i++;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const { prefersReduced } = useReducedMotion();

  useFrame((state) => {
    if (groupRef.current && !prefersReduced) {
      groupRef.current.position.y = responsivePosition[1] + Math.sin(state.clock.elapsedTime) * 0.05;
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
            position={[0, 0, 0]}
            style={{
              width: '490px',
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
              
              <div className="flex justify-between border-b border-green-900/50 pb-2 mb-4 opacity-80">
                 <span>root@cyberdeck:~# ./init_sequence.sh</span>
                 <span className="animate-pulse text-green-400">● LIVE</span>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col justify-end space-y-1">
                 {logs.map((log, index) => (
                   <div key={index} className="opacity-90 flex">
                     <span className="text-green-700 mr-3">[{new Date().toLocaleTimeString()}]</span>
                     <span className="text-green-400 font-bold">{log}</span>
                   </div>
                 ))}
                 {!prefersReduced && <div className="mt-2 animate-pulse text-green-300">_</div>}
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