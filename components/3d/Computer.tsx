"use client";

import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    retro_computer_setup_retro_computer_setup_Mat_0: THREE.Mesh;
  };
  materials: {
    retro_computer_setup_Mat: THREE.MeshStandardMaterial;
  };
};

type ComputerProps = React.JSX.IntrinsicElements["group"] & {
  isMobile: boolean;
};

export function Computer({ isMobile, ...props }: ComputerProps) {
  const { nodes, materials } = useGLTF("/computer-transformed.glb") as unknown as GLTFResult;
  const { isLowEnd, isHigh, prefersReducedMotion } = useDeviceCapability();
  const groupRef = useRef<THREE.Group>(null);
  const scrollY = useRef(0);
  const initialScroll = useRef(0);

  useEffect(() => {
    initialScroll.current = window.scrollY;
    scrollY.current = 0; // Relative to start
    
    const handleScroll = () => {
      scrollY.current = window.scrollY - initialScroll.current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const responsiveScale = isMobile ? 0.13 : 0.16;
  const responsivePosition: [number, number, number] = [0, isMobile ? -1.2 : -3.5, 0];

  const isFirstFrame = useRef(true);

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;

    if (isFirstFrame.current) {
        groupRef.current.rotation.y = 0;
        isFirstFrame.current = false;
    }

    const t = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    const scrollFactor = scrollY.current * 0.0005;
    
    // Smooth follow + Scroll Offset
    const lerpFactor = isLowEnd ? 0.03 : 0.08;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (mouseX * 0.4) + scrollFactor, lerpFactor);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.3, lerpFactor);
    
    // Constant slow rotation + Floating + Extra depth
    if (!isLowEnd) {
        groupRef.current.rotation.y += Math.sin(t * 0.3) * 0.008;
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mouseX * 0.1, lerpFactor);
        groupRef.current.position.y = responsivePosition[1] + Math.sin(t) * 0.15;
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
      <mesh
        geometry={nodes.retro_computer_setup_retro_computer_setup_Mat_0.geometry}
        material={materials.retro_computer_setup_Mat}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/computer-transformed.glb");