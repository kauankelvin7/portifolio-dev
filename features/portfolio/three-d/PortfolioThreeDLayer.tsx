"use client";

import dynamic from "next/dynamic";
import { useThreeCapability } from "./useThreeCapability";

const ThreeCanvasRuntime = dynamic(
  () => import("./ThreeCanvasRuntime").then((module) => module.ThreeCanvasRuntime),
  { ssr: false },
);

export function PortfolioThreeDLayer() {
  const enabled = useThreeCapability();
  return enabled ? <ThreeCanvasRuntime /> : null;
}
