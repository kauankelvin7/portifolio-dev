import type { ThreeScene } from "./types";
import styles from "./three-d.module.css";

interface ThreeFallbackProps {
  className?: string;
  scene: ThreeScene;
}

function HeroMark() {
  const blocks = [
    [36, 28], [36, 46], [36, 64], [36, 82], [36, 100],
    [54, 64], [68, 50], [82, 36], [68, 78], [82, 92],
  ];

  return (
    <svg className={styles.fallbackSvg} viewBox="0 0 120 128" role="presentation">
      <path className={styles.wireFaint} d="M16 108 60 8l44 100Z" />
      {blocks.map(([x, y], index) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <rect className={index % 3 === 0 ? styles.solid : styles.solidMuted} x="-7" y="-7" width="14" height="14" rx="1.5" />
          <path className={styles.wire} d="m-7-7 5-4h14l-5 4m5-4v14l-5 4m0-14v14h-14v-14Z" opacity={0.5 + index * 0.04} />
        </g>
      ))}
    </svg>
  );
}

function LeveMark() {
  return (
    <svg className={styles.fallbackSvg} viewBox="0 0 120 120" role="presentation">
      <ellipse className={styles.wire} cx="60" cy="60" rx="43" ry="19" transform="rotate(-18 60 60)" />
      <ellipse className={styles.wireFaint} cx="60" cy="60" rx="31" ry="47" transform="rotate(32 60 60)" />
      <circle className={styles.solid} cx="60" cy="60" r="9" />
      <circle className={styles.node} cx="97" cy="47" r="4" />
    </svg>
  );
}

function OmniMark() {
  const nodes = [[22, 72], [42, 30], [65, 59], [90, 24], [99, 88], [51, 99]];
  return (
    <svg className={styles.fallbackSvg} viewBox="0 0 120 120" role="presentation">
      <path className={styles.wire} d="M22 72 42 30l23 29 25-35 9 64-48 11-29-27 43-13 34 29" />
      {nodes.map(([x, y], index) => <circle key={`${x}-${y}`} className={index === 2 ? styles.solid : styles.node} cx={x} cy={y} r={index === 2 ? 7 : 4.5} />)}
    </svg>
  );
}

function CinesiaMark() {
  return (
    <svg className={styles.fallbackSvg} viewBox="0 0 120 120" role="presentation">
      {[0, 1, 2, 3].map((index) => (
        <g key={index} transform={`translate(${28 + index * 8} ${24 + index * 10}) rotate(${-5 + index * 3} 28 22)`}>
          <rect className={index === 3 ? styles.solid : styles.solidMuted} width="56" height="44" rx="3" />
          <path className={styles.wireFaint} d="M9 13h29M9 22h20M9 31h33" />
        </g>
      ))}
    </svg>
  );
}

function AutomationMark() {
  return (
    <svg className={styles.fallbackSvg} viewBox="0 0 120 120" role="presentation">
      <path className={styles.wireFaint} d="M11 83h98M17 91h86M21 83v8m18-8v8m20-8v8m20-8v8m20-8v8" />
      {[18, 47, 76].map((x, index) => (
        <g key={x} transform={`translate(${x} ${53 - index * 7})`}>
          <rect className={index === 1 ? styles.solid : styles.solidMuted} width="25" height="22" rx="2" />
          <path className={styles.wire} d="m0 0 6-5h25l-6 5m6-5v22l-6 5" opacity=".62" />
        </g>
      ))}
    </svg>
  );
}

export function ThreeFallback({ className = "", scene }: ThreeFallbackProps) {
  const Mark = {
    hero: HeroMark,
    leve: LeveMark,
    omni: OmniMark,
    cinesia: CinesiaMark,
    automation: AutomationMark,
  }[scene];

  return (
    <div
      aria-hidden="true"
      className={`${styles.fallback} ${scene === "hero" ? "" : styles.fallbackSmall} ${className}`}
      data-three-fallback={scene}
    >
      <Mark />
    </div>
  );
}
