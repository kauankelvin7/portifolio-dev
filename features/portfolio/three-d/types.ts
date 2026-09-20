export const THREE_SCENES = [
  "hero",
  "leve",
  "omni",
  "cinesia",
  "automation",
] as const;

export type ThreeScene = (typeof THREE_SCENES)[number];

export function isThreeScene(value: string | undefined): value is ThreeScene {
  return THREE_SCENES.includes(value as ThreeScene);
}

export interface ThreeTarget {
  element: HTMLElement;
  scene: ThreeScene;
}
