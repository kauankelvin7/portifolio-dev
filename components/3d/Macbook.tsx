"use client";

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type GLTFResult = GLTF & {
  nodes: {
    Object_12: THREE.Mesh;
    Object_20: THREE.Mesh;
    Object_35: THREE.Mesh;
    Object_53: THREE.Mesh;
    Object_55: THREE.Mesh;
    Object_62: THREE.Mesh;
    Object_69: THREE.Mesh;
    Object_77: THREE.Mesh;
    Object_83: THREE.Mesh;
    Object_91: THREE.Mesh;
    Object_100: THREE.Mesh;
    Object_107: THREE.Mesh;
  };
  materials: {
    zNRfbdNyoCOxSDD: THREE.MeshStandardMaterial;
    PaletteMaterial001: THREE.MeshStandardMaterial;
    GzMrvkTsmRxvOJz: THREE.MeshStandardMaterial;
    ItKEDAaOJloGKSH: THREE.MeshStandardMaterial;
    xEcnbqMzoZoLkIZ: THREE.MeshStandardMaterial;
    YMmdfGRsPviDXYd: THREE.MeshStandardMaterial;
    sqkqSXQCeccDMmm: THREE.MeshStandardMaterial;
    WiyOPYJEeiHNVjF: THREE.MeshStandardMaterial;
    PaletteMaterial002: THREE.MeshStandardMaterial;
    DthpMXUDOFLFvyk: THREE.MeshStandardMaterial;
    PaletteMaterial003: THREE.MeshPhysicalMaterial;
    HlQwFCAPWzetDQy: THREE.MeshPhysicalMaterial;
  };
};

type MacbookProps = React.ComponentProps<"group"> & { 
  showScreen?: boolean; 
  isMobile: boolean;
  isLowEnd?: boolean;
};

export function Macbook({ showScreen = true, isMobile, isLowEnd, ...props }: MacbookProps) {
  const { nodes, materials } = useGLTF("/macbook-transformed.glb") as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);

  const responsiveScale = isMobile ? 5.0 : 10;
  const responsivePosition: [number, number, number] = [0, isMobile ? -0.5 : -1, 0];
  
  const screenPosition: [number, number, number] = isMobile
    ? [0, 0.103, -0.150]
    : [0, 0.1, -0.149];

  // Simplified materials for low end
  const mat003 = isLowEnd ? new THREE.MeshStandardMaterial({ color: materials.PaletteMaterial003.color }) : materials.PaletteMaterial003;
  const matHlQw = isLowEnd ? new THREE.MeshStandardMaterial({ color: materials.HlQwFCAPWzetDQy.color }) : materials.HlQwFCAPWzetDQy;

  const { prefersReduced } = useReducedMotion();

  // 3. Floating Animation
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
        <mesh geometry={nodes.Object_12.geometry} material={materials.zNRfbdNyoCOxSDD} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_20.geometry} material={materials.PaletteMaterial001} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_35.geometry} material={materials.GzMrvkTsmRxvOJz} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_53.geometry} material={materials.ItKEDAaOJloGKSH} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_55.geometry} material={materials.xEcnbqMzoZoLkIZ} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_62.geometry} material={materials.YMmdfGRsPviDXYd} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_69.geometry} material={materials.sqkqSXQCeccDMmm} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_77.geometry} material={materials.WiyOPYJEeiHNVjF} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_83.geometry} material={materials.PaletteMaterial002} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_91.geometry} material={materials.DthpMXUDOFLFvyk} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_100.geometry} material={mat003} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh geometry={nodes.Object_107.geometry} material={matHlQw} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>

      <group position={screenPosition} rotation={[-0.35, 0, 0]}>
        {showScreen && (
          <Html
            transform
            occlude={!isLowEnd}
            distanceFactor={0.25}
            position={[0, 0, 0]}
            style={{
              width: '481px',
              height: '300px',
              background: '#1e1e1e',
              borderRadius: '2px 2px 0 0',
              overflow: 'hidden',
              boxShadow: isLowEnd ? 'none' : '0 0 10px rgba(0,0,0,0.5)'
            }}
          >
            <div className="flex flex-col h-full w-full font-mono text-[10px] text-gray-300 selection:bg-white/15 selection:text-white">

              <div className="bg-[#2d2d2d] h-6 flex items-center px-3 space-x-2 w-full border-b border-black/20">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <div className="flex-1 text-center text-gray-400 opacity-80">Portfolio.tsx — Visual Studio Code</div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                <div className="w-10 bg-[#333333] flex flex-col items-center py-3 space-y-4 text-gray-400 border-r border-black/20">
                  <div className="hover:text-white cursor-pointer">📁</div>
                  <div className="hover:text-white cursor-pointer">🔍</div>
                  <div className="hover:text-white cursor-pointer">git</div>
                </div>

                <div className="flex-1 bg-[#1e1e1e] p-3 overflow-hidden relative">
                  <div className="absolute left-0 top-3 bottom-0 w-8 text-right pr-2 text-gray-600 select-none text-[9px] leading-5">
                    1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10
                  </div>

                  <div className="pl-8 font-mono leading-5">
                    <div>
                      <span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">React</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">&apos;react&apos;</span>;
                    </div>
                    <div className="h-1"></div>
                    <div>
                      <span className="text-[#569cd6]">export</span> <span className="text-[#569cd6]">function</span> <span className="text-[#dcdcaa]">Future</span>() &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">stack</span> = [<span className="text-[#ce9178]">&apos;Next.js 15&apos;</span>, <span className="text-[#ce9178]">&apos;React 19&apos;</span>];
                    </div>
                    <div className="pl-4">
                      <span className="text-[#569cd6]">return</span> (
                    </div>
                    <div className="pl-8">
                      <span className="text-[#808080]">&lt;</span><span className="text-[#569cd6]">div</span> <span className="text-[#9cdcfe]">className</span>=<span className="text-[#ce9178]">&quot;senior-dev&quot;</span><span className="text-[#808080]">&gt;</span>
                    </div>
                    <div className="pl-12">
                      <span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0]">Hero</span> <span className="text-[#9cdcfe]">version</span>=<span className="text-[#b5cea8]">&#123;2.0&#125;</span> /<span className="text-[#808080]">&gt;</span>
                    </div>
                    <div className="pl-12"><span className="text-[#6a9955]">Coding the future...</span></div>

                    <div className="pl-12 flex items-center">
                      <span className="text-[#6a9955] animate-pulse h-3 w-1 bg-white inline-block ml-1"></span>
                    </div>

                    <div className="pl-8">
                      <span className="text-[#808080]">&lt;/</span><span className="text-[#569cd6]">div</span><span className="text-[#808080]">&gt;</span>
                    </div>
                    <div className="pl-4">);</div>
                    <div>&#125;</div>
                  </div>
                </div>
              </div>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/macbook-transformed.glb");