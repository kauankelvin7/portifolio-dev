"use client";

import { useEffect, useState } from "react";

type NavigatorWithDeviceMemory = Navigator & {
  deviceMemory?: number;
};

type DeviceCapability = {
  isLowEnd: boolean;
  webglSupported: boolean;
  isReady: boolean;
};

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

export const useDeviceCapability = (): DeviceCapability => {
  const [capability, setCapability] = useState<DeviceCapability>({
    isLowEnd: false,
    webglSupported: true,
    isReady: false,
  });

  useEffect(() => {
    const checkCapability = () => {
      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as NavigatorWithDeviceMemory).deviceMemory || 4;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      setCapability({
        isLowEnd: cores <= 4 || memory <= 2 || isMobile,
        webglSupported: supportsWebGL(),
        isReady: true,
      });
    };

    checkCapability();

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", checkCapability);

    return () => mediaQuery.removeEventListener("change", checkCapability);
  }, []);

  return capability;
};
