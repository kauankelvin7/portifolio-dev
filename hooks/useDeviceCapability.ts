"use client";

import { useState, useEffect } from 'react';

export const useDeviceCapability = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    const checkCapability = () => {
      // hardwareConcurrency: number of logical processor cores
      const cores = navigator.hardwareConcurrency || 4;
      
      // deviceMemory: approximate amount of device memory in gigabytes
      // Type assertion for deviceMemory as it's not in all lib.dom versions
      const memory = (navigator as any).deviceMemory || 4;
      
      // Screen width check
      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      // Low end criteria:
      // - 4 cores or less
      // - 2GB RAM or less
      // - Mobile screen
      const lowEnd = cores <= 4 || memory <= 2 || isMobile;
      
      setIsLowEnd(lowEnd);
    };

    checkCapability();
    
    // Optional: add listener for resize if we want to update dynamically
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleResize = () => checkCapability();
    
    mediaQuery.addEventListener('change', handleResize);
    
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return { isLowEnd };
};
