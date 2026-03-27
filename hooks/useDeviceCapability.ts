"use client";

import { useState, useEffect } from 'react';

export type DeviceTier = 'high' | 'medium' | 'low';

export const useDeviceCapability = () => {
  const [tier, setTier] = useState<DeviceTier>('medium');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const detectTier = (): DeviceTier => {
      // 1. Check CPU cores
      const cores = navigator.hardwareConcurrency ?? 2;

      // 2. Check RAM
      const memory = (navigator as any).deviceMemory ?? 2;

      // 3. Check WebGL and GPU
      let gpuTier: DeviceTier = 'medium';
      let webgl = false;
      
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          webgl = true;
          const ext = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
          if (ext) {
            const renderer = (gl as WebGLRenderingContext)
              .getParameter(ext.UNMASKED_RENDERER_WEBGL).toLowerCase();
            
            const highEnd = ['rtx', 'rx 6', 'rx 7', 'radeon rx', 'apple m',
                             'iris pro', 'gtx 10', 'gtx 16', 'gtx 20'];
            const lowEnd  = ['mali-4', 'mali-3', 'adreno 3', 'adreno 4',
                             'intel hd 4', 'intel hd 3', 'sgx'];
            
            if (highEnd.some(g => renderer.includes(g))) gpuTier = 'high';
            else if (lowEnd.some(g => renderer.includes(g))) gpuTier = 'low';
          }
        }
      } catch (e) {
        webgl = false;
      }
      setWebglSupported(webgl);

      // 4. Quick CPU Benchmark
      const start = performance.now();
      let x = 0;
      for (let i = 0; i < 500000; i++) x += Math.sqrt(i);
      const benchmarkMs = performance.now() - start;

      // 5. Final decision
      if (cores >= 8 && memory >= 4 && gpuTier !== 'low' && benchmarkMs < 50) {
        return 'high';
      }
      if (cores >= 4 && memory >= 2 && gpuTier !== 'low' && benchmarkMs < 150) {
        return 'medium';
      }
      return 'low';
    };

    // Set prefersReducedMotion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const calculatedTier = detectTier();
    setTier(calculatedTier);
    setIsReady(true);
  }, []);

  return { 
    tier, 
    isLowEnd: tier === 'low', 
    isMedium: tier === 'medium',
    isHigh: tier === 'high',
    prefersReducedMotion,
    webglSupported,
    isReady 
  };
};
