"use client";

import { Suspense, useState, useMemo } from "react";
import SafeCanvas from "./SafeCanvas";
import { Environment, OrbitControls, Preload, PerformanceMonitor, Html } from "@react-three/drei";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { Cyberlaptop } from "./Cyberlaptop";
import BootLoader from "./BootLoader";
import Effects from "./Effects";
import Image from "next/image";
import CanvasLoader from "@/components/ui/CanvasLoader";

export default function SceneCyber() {
  const isMobile = useIsMobile();
  const { tier, isLowEnd, isHigh, prefersReducedMotion, webglSupported } = useDeviceCapability();
  const [showModel, setShowModel] = useState(false);  
  const [performanceCrashed, setPerformanceCrashed] = useState(false);

  const SceneCompleta = useMemo(() => (
    <>
      {isHigh && !isMobile && <Effects />}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ff0000" />
      <pointLight position={[-5, 2, -5]} intensity={2} color="#00ffff" />
      <Suspense fallback={<Html center><CanvasLoader /></Html>}>
        <Environment preset="night" />
      </Suspense>
    </>
  ), [isHigh, isMobile]);

  const SceneSimples = useMemo(() => (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00ffff" />
    </>
  ), []);

  const FallbackContent = (
    <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      <div className="relative w-[85%] h-[85%] md:w-[60%] md:h-[60%] flex items-center justify-center">
          <Image 
              src="/models/preview-cyber5.png"
              alt="Cyber Setup Preview" 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
              className="object-contain"
              priority
          />
      </div>

      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-red-200/50 bg-red-900/20 px-2 py-1 rounded backdrop-blur-sm border border-red-500/10">
          [ {performanceCrashed ? 'LOW POWER MODE' : 'OFFLINE (WEBGL OFF)'} ]
      </div>
    </div>
  );

  if (performanceCrashed || isLowEnd) {
    return FallbackContent;
  }

  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-auto">
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
        camera={{ position: [0, 2, 10], fov: 40 }}
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
               <Cyberlaptop showScreen={showModel} isMobile={isMobile} />
            </group>

            <Preload all />
        </Suspense>
        
        {!isMobile && (
            <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            target={[0, 0, 0]}
            />
        )}
      </SafeCanvas>
    </div>
  );
};