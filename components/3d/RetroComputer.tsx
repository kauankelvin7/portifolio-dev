"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";

export function RetroComputer() {
    const meshRef = useRef<Mesh>(null);

    const { viewport } = useThree();

    useFrame((state) => {
        if (!meshRef.current) return;

        const mouseX = state.pointer.x;
        const mouseY = state.pointer.y;

        meshRef.current.rotation.y = mouseX * 0.5;
        meshRef.current.rotation.x = mouseY * 0.5;
    });

    const isMobile = viewport.width < 5;
    const responsiveScale = isMobile ? 0.8 : 1.5;

    return (
        <mesh ref={meshRef} scale={responsiveScale}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial 
                color="#e5e5e5"
                wireframe={true}
                emissive="#ffffff"
                emissiveIntensity={0.1}
            />
        </mesh>
    )
}