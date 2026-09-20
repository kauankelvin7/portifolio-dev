"use client";

import { useEffect, useState } from "react";

interface ExtendedNavigator extends Navigator {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
}

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2")
      ?? canvas.getContext("webgl");
    const available = Boolean(context);
    const extension = context?.getExtension("WEBGL_lose_context");
    extension?.loseContext();
    return available;
  } catch {
    return false;
  }
}

function isLowCapacity(device: ExtendedNavigator) {
  return (device.deviceMemory !== undefined && device.deviceMemory < 4)
    || (device.hardwareConcurrency !== undefined && device.hardwareConcurrency <= 2);
}

function getFallbackReason(reduceMotion: MediaQueryList, force: boolean) {
  const device = navigator as ExtendedNavigator;
  if (new URLSearchParams(window.location.search).get("3d") === "off") return "off";
  if (reduceMotion.matches) return "reduced-motion";
  if (device.connection?.saveData) return "save-data";
  if (!hasWebGL()) return "no-webgl";
  if (!force && isLowCapacity(device)) return "low-capacity";
  return null;
}

export function useThreeCapability() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const force = new URLSearchParams(window.location.search).get("3d") === "force";
    const targets = [...document.querySelectorAll<HTMLElement>("[data-three-scene]")];
    let observer: IntersectionObserver | undefined;
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const setState = (state: string) => {
      targets.forEach((target) => { target.dataset.threeState = state; });
    };

    setState("fallback:not-visible");

    const cancelIdle = () => {
      const idleWindow = window as IdleWindow;
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
    };

    const schedule = () => {
      if (cancelled) return;
      const reason = getFallbackReason(reduceMotion, force);
      if (reason) {
        setState(`fallback:${reason}`);
        setEnabled(false);
        return;
      }
      const idleWindow = window as IdleWindow;
      const activate = () => {
        if (!cancelled && !getFallbackReason(reduceMotion, force)) setEnabled(true);
      };

      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(activate, { timeout: 1_200 });
      } else {
        timeoutHandle = setTimeout(activate, 350);
      }
    };

    if (targets.length && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect();
          schedule();
        }
      }, { rootMargin: "200px" });
      targets.forEach((target) => observer?.observe(target));
    } else {
      schedule();
    }

    const onMotionChange = () => {
      cancelIdle();
      if (reduceMotion.matches) {
        setEnabled(false);
        setState("fallback:reduced-motion");
      } else schedule();
    };
    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelled = true;
      observer?.disconnect();
      cancelIdle();
      reduceMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return enabled;
}
