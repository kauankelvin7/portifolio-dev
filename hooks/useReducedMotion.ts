"use client";

import { useDeviceCapability } from './useDeviceCapability';

export const useReducedMotion = () => {
  const { prefersReducedMotion, isLowEnd } = useDeviceCapability();
  
  // Treat 'low' tier as 'prefers reduced motion' to simplify existing components
  return { 
    prefersReduced: prefersReducedMotion || isLowEnd,
    isLowEnd 
  };
};
