"use client";

import { Suspense, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, PerformanceMonitor, Html } from "@react-three/drei";
import { useTranslations } from "next-intl";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { Macbook } from "./Macbook";
import BootLoader from "./BootLoader";
import Effects from "./Effects";
import Image from "next/image";
import CanvasLoader from "@/components/ui/CanvasLoader";

export default function SceneMacbook() {
  const isMobile = useIsMobile();
  const { isLowEnd } = useDeviceCapability();
  const [showModel, setShowModel] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const t = useTranslations('UI');

  const SceneCompleta = useMemo(() => (
    <>
      {!isMobile && <Effects />}
      <ambientLight intensity={1.5} />
      <directionalLight position={[-5, 5, 5]} intensity={2} color="#4f46e5" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
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
        <div className="relative w-[85%] h-[85%] md:w-[60%] md:h-[60%] flex items-center justify-center">
          <Image
            src="/models/preview-macbook3.png"
            alt="Macbook Preview"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="absolute bottom-6 right-6 text-[10px] font-mono text-red-200/50 bg-red-900/20 px-2 py-1 rounded backdrop-blur-sm border border-red-500/10">
          [ LOW POWER MODE ]
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-auto">
      <Canvas
        dpr={isLowEnd ? 1 : [1, 1.5]}
        gl={{ 
            powerPreference: "high-performance", 
            antialias: false,
            alpha: true,
            stencil: false,
            depth: true
        }}
        camera={{ position: [0, 5, 10], fov: 35 }}
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
            <Macbook showScreen={showModel} isMobile={isMobile} isLowEnd={isLowEnd} />
            
            {/* Interaction Hint */}
            <Html
              position={[0, -5, 0]}
              center
              distanceFactor={8}
              style={{
                transition: 'all 0.5s',
                opacity: showModel ? 0.6 : 0,
                pointerEvents: 'none',
                width: '300px',
                textAlign: 'center'
              }}
            >
              <div className="flex flex-col items-center gap-2">
                 <div className="w-px h-6 bg-linear-to-b from-transparent to-[#e5591d]/40" />
                 <span 
                   className="font-mono text-[9px] tracking-[0.3em] text-[#e5591d] uppercase animate-pulse"
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
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
        )}
      </Canvas>
    </div>
  );
}