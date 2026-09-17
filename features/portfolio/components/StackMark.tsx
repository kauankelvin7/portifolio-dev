type StackMarkProps = {
  name: string;
};

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function StackMark({ name }: StackMarkProps) {
  const key = name.toLowerCase();

  if (key.includes("react")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="1.7" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="3.7" stroke="currentColor" strokeWidth="1.25" />
        <ellipse cx="12" cy="12" rx="9" ry="3.7" stroke="currentColor" strokeWidth="1.25" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.7" stroke="currentColor" strokeWidth="1.25" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  if (key.includes("spring")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 4C10.5 4.3 5.2 8.6 5 15.6c3.5-2.9 6.7-4.2 10-4.5-4 1.6-6.8 4-8.6 7.2 6.3 1.2 12.4-2 13.6-14.3Z" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" />
        <path d="M4 20c2.8-4.6 6.2-7.5 11-9" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes("python")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3H8.4C6.5 3 5.5 4.1 5.5 6v3.2h6.7v1.5H4.8C3.1 10.7 2 12 2 14v2.2C2 18 3.1 19 4.8 19h2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        <path d="M12 21h3.6c1.9 0 2.9-1.1 2.9-3v-3.2h-6.7v-1.5h7.4c1.7 0 2.8-1.3 2.8-3.3V7.8C22 6 20.9 5 19.2 5h-2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        <circle cx="8.7" cy="6.7" r="1" fill="currentColor" />
        <circle cx="15.3" cy="17.3" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (key.includes("docker")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 10h3v3H4zM8 10h3v3H8zM12 10h3v3h-3zM8 6h3v3H8zM12 6h3v3h-3zM16 10h3v3h-3z" stroke="currentColor" strokeWidth="1.1" />
        <path d="M3 14.5c1.3 3.2 4.2 5.1 8.6 5.1 4.9 0 8.1-2.4 9.4-6.6-1 .5-2 .7-3.1.5-.6-.1-1.1-.4-1.6-.8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes("firebase")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m5 18 2.2-13.3 4 7.3L14 3l5 15-7 3-7-3Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
        <path d="m7.2 4.7 8.2 10.6L5 18" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round" />
      </svg>
    );
  }

  if (key.includes("postgres") || key === "sql" || key.includes("mysql")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.35" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke="currentColor" strokeWidth="1.35" />
      </svg>
    );
  }

  if (key.includes("git")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m12 3 9 9-9 9-9-9 9-9Z" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="9" cy="9" r="1.4" fill="currentColor" />
        <circle cx="15.3" cy="15.2" r="1.4" fill="currentColor" />
        <path d="M10 10l4.3 4.2M9 10.5v5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes("java")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9.5 4.2c3.8 2.1-3.2 3.3.4 5.3M13 3c4 2.6-3 4 1 6.4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M6 11.5h10.5v3.3c0 2.3-2.1 4.2-5.2 4.2S6 17.1 6 14.8v-3.3ZM16.5 12.5H19c1.1 0 1.7.7 1.7 1.6 0 1.3-1.1 2.2-3.6 2.2" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M5 21h13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes("type") || key.includes("next") || key.includes("node") || key.includes("express") || key.includes("vite")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="currentColor" strokeWidth="1.25" />
        <path d="M7.5 9h9M12 9v7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    );
  }

  return <span className="text-[9px] font-semibold tracking-[-0.02em]">{initials(name)}</span>;
}
