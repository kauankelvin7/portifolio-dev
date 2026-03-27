"use client";

import { Suspense, useState, useMemo } from "react";
import SafeCanvas from "./SafeCanvas";
import { Environment, OrbitControls, Preload, PerformanceMonitor, Html } from "@react-three/drei";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { Computer } from "@/components/3d/Computer";
import BootLoader from "./BootLoader";
import Effects from "./Effects";
import Image from "next/image";
import CanvasLoader from "@/components/ui/CanvasLoader";

export default function Scene() {
    const isMobile = useIsMobile();
    const { tier, isLowEnd, isHigh, prefersReducedMotion, webglSupported } = useDeviceCapability();
    const [showModel, setShowModel] = useState(false);
    const [performanceCrashed, setPerformanceCrashed] = useState(false);

    const SceneCompleta = useMemo(() => (
        <>
            {isHigh && !isMobile && <Effects />}
            <ambientLight intensity={1} />
            <directionalLight position={[5, 10, 5]} intensity={2} />
            <pointLight position={[-2, -2, -2]} intensity={5} color="#ff6b00" />
            <Suspense fallback={<Html center><CanvasLoader /></Html>}>
                <Environment preset="city" />
            </Suspense>
        </>
    ), [isHigh, isMobile]);

    const SceneSimples = useMemo(() => (
        <>
            <ambientLight intensity={1.5} />
            <pointLight position={[5, 5, 5]} intensity={2} />
        </>
    ), []);

    const FallbackContent = (
        <div className="w-full h-full absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
            <div className="relative w-[85%] h-[85%] md:w-[70%] md:h-[70%] flex items-center justify-center">
                <Image
                    src="/models/preview-hero2.png"
                    alt="3D Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                    className="object-contain"
                    priority
                />
            </div>

            <div className="absolute bottom-6 right-6 text-[10px] font-display text-brand-orange/80 bg-brand-orange/10 px-2 py-1 rounded backdrop-blur-sm border border-brand-orange/20">
                [ {performanceCrashed ? 'MODO ECONOMIA DE ENERGIA' : 'MODO 2D (WEBGL OFF)'} ]
            </div>
        </div>
    );

    if (performanceCrashed || isLowEnd) {
        return FallbackContent;
    }

    return (
        <div className={`w-full h-full absolute inset-0 z-10 ${isMobile ? 'pointer-events-none' : 'pointer-events-auto'}`}>
            <SafeCanvas
                fallback={FallbackContent}
                dpr={isHigh ? [1, 2] : [1, 1.5]}
                gl={{ 
                    powerPreference: "high-performance", 
                    antialias: false,
                    alpha: true,
                    stencil: false,
                    depth: true
                }}
                camera={{ position: [0, 0, 30], fov: 40 }}
                className="w-full h-full"
                style={{ touchAction: 'pan-y' }}
            >
                <PerformanceMonitor
                    onFallback={() => isMobile && setPerformanceCrashed(true)} 
                    threshold={0.4} 
                    flipflops={5}   
                />

                <BootLoader onReady={() => setTimeout(() => setShowModel(true), 500)} />

                {!isHigh ? SceneSimples : SceneCompleta}

                <Suspense fallback={<Html center><CanvasLoader /></Html>}>
                    <group visible={showModel}>
                        <Computer isMobile={isMobile} />
                    </group>

                    <Preload all />
                </Suspense>

                {!isMobile && (
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false} // Disable to avoid conflict with follow/parallax
                        target={[0, 0, 0]}
                    />
                )}
            </SafeCanvas>
        </div>
    )
};