"use client";

import React from 'react';
import { MotionConfig } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AccessibleMotionProps {
  children: React.ReactNode;
}

export const AccessibleMotion: React.FC<AccessibleMotionProps> = ({ children }) => {
  const { prefersReduced } = useReducedMotion();

  return (
    <MotionConfig reducedMotion={prefersReduced ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
};
