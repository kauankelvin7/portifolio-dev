import type { CSSProperties } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  startDelay?: number;
  speed?: number;
}

type MotionStyle = CSSProperties & {
  "--char-index"?: number;
  "--type-start"?: string;
  "--type-step"?: string;
  "--type-end"?: string;
};

export function TypewriterText({
  text,
  className,
  startDelay = 220,
  speed = 26,
}: TypewriterTextProps) {
  const chars = Array.from(text);
  const endDelay = startDelay + chars.length * speed;

  return (
    <span
      className={className}
      aria-label={text}
      style={{
        "--type-start": `${startDelay}ms`,
        "--type-step": `${speed}ms`,
        "--type-end": `${endDelay}ms`,
      } as MotionStyle}
    >
      <span aria-hidden="true">
        {chars.map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="typewriter-char"
            style={{ "--char-index": index } as MotionStyle}
          >
            {char}
          </span>
        ))}
      </span>
      <span className="typewriter-caret" aria-hidden="true" />
    </span>
  );
}
