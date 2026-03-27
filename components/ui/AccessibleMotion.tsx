"use client";

import React from 'react';
import { MotionConfig } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface AccessibleMotionProps {
  children: React.ReactNode;
}

export const AccessibleMotion: React.FC<AccessibleMotionProps> = ({ children }) => {
  const { prefersReducedMotion, isLowEnd } = useDeviceCapability();

  return (
    <MotionConfig reducedMotion={prefersReducedMotion || isLowEnd ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
};
