"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useMemo } from "react";
import { Environment, OrbitControls, Preload, PerformanceMonitor, Html } from "@react-three/drei";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { Computer } from "@/components/3d/Computer";
import BootLoader from "./BootLoader";
import Effects from "./Effects";
import Image from "next/image";
import CanvasLoader from "@/components/ui/CanvasLoader";

export default function Scene() {
    const isMobile = useIsMobile();
    const { isLowEnd } = useDeviceCapability();
    const [showModel, setShowModel] = useState(false);
    const [crashed, setCrashed] = useState(false);
    const t = useTranslations('UI');

    const SceneCompleta = useMemo(() => (
        <>
            {!isMobile && <Effects />}
            <ambientLight intensity={1} />
            <directionalLight position={[5, 10, 5]} intensity={2} />
            <pointLight position={[-2, -2, -2]} intensity={5} color="#ff6b00" />
            <Suspense fallback={<Html center><CanvasLoader label={t('loading_scene')} /></Html>}>
                <Environment preset="city" />
            </Suspense>
        </>
    ), [isMobile, t]);

    const SceneSimples = useMemo(() => (
        <>
            <ambientLight intensity={1.5} />
            <pointLight position={[5, 5, 5]} intensity={2} />
        </>
    ), []);

    if (crashed) {
        return (
            <div className="w-full h-full absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
                <div className="relative w-[85%] h-[85%] md:w-[70%] md:h-[70%] flex items-center justify-center">
                    <Image
                        src="/models/preview-hero2.png"
                        alt="3D Preview"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <div className="absolute bottom-6 right-6 text-[10px] font-display text-brand-orange/80 bg-brand-orange/10 px-2 py-1 rounded backdrop-blur-sm border border-brand-orange/20">
                    [ MODO ECONOMIA DE ENERGIA ]
                </div>
            </div>
        )
    }

    return (
        <div className={`w-full h-full absolute inset-0 z-10 ${isMobile ? 'pointer-events-none' : 'pointer-events-auto'}`}>
            <Canvas
                dpr={isLowEnd ? 1 : [1, 1.5]}
                gl={{ 
                    powerPreference: "high-performance", 
                    antialias: false,
                    alpha: true,
                    stencil: false,
                    depth: true
                }}
                camera={{ position: [0, 2, 35], fov: 45 }}
                className="w-full h-full"
                style={{ touchAction: 'pan-y' }}
            >
                <PerformanceMonitor
                    onFallback={() => setCrashed(true)}
                    flipflops={3}
                    onDecline={() => {
                        if (isMobile) setCrashed(true);
                    }}
                />

                <BootLoader onReady={() => setTimeout(() => setShowModel(true), 500)} />

                {isLowEnd ? SceneSimples : SceneCompleta}

                <Suspense fallback={<Html center><CanvasLoader label={t('loading_scene')} /></Html>}>
                    <group visible={showModel}>
                        <Computer isMobile={isMobile} isLowEnd={isLowEnd} />
                        
                        {/* Interaction Hint */}
                        <Html
                          position={[0, -18, 0]}
                          center
                          distanceFactor={15}
                          style={{
                            transition: 'all 0.5s',
                            opacity: showModel ? 0.6 : 0,
                            pointerEvents: 'none',
                            width: '400px',
                            textAlign: 'center'
                          }}
                        >
                          <div className="flex flex-col items-center gap-2">
                             <div className="w-px h-12 bg-linear-to-b from-transparent to-[#e5591d]/40" />
                             <span 
                               className="font-mono text-[10px] tracking-[0.3em] text-[#e5591d] uppercase animate-pulse"
                               style={{ textShadow: '0 0 10px rgba(229,89,29,0.5)' }}
                             >
                               {isMobile ? t('interactivity_mobile') : t('interactivity_hint')}
                             </span>
                          </div>
                        </Html>
                    </group>

                    <Preload all />
                </Suspense>

                {!isMobile && (
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={true}
                        minPolarAngle={Math.PI / 2.5}
                        maxPolarAngle={Math.PI / 2}
                    />
                )}
            </Canvas>
        </div>
    )
};