"use client";

import { useEffect, useRef } from "react";

export function RebirthRadial() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let x = 0, y = 0, vx = 0, vy = 0;
    let targetX = 0, targetY = 0;
    let disposed = false;

    const paint = () => {
      context.clearRect(0, 0, width, height);
      const unit = Math.min(width, height);
      const cx = width * .5, cy = height * .5;
      const colors = ["#aa594a", "#45536a", "#8592a2"];
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = Math.max(10, unit * .020) + "px monospace";
      for (let ring = 2; ring <= 15; ring++) {
        const radius = ring * unit * .029;
        const count = Math.floor(13 + ring * 4.5);
        for (let i = 0; i < count; i++) {
          const a = i / count * Math.PI * 2 + ring * .27;
          const drift = x * Math.cos(a) * unit * .044 + y * Math.sin(a) * unit * .044;
          const px = cx + Math.cos(a) * (radius + drift);
          const py = cy + Math.sin(a) * (radius + drift);
          const intensity = Math.min(.9, .2 + ring / 24);
          context.globalAlpha = intensity;
          context.fillStyle = colors[(i + ring) % colors.length];
          context.fillText((i + ring) % 9 === 0 ? "+" : (i + ring) % 3 === 0 ? ":" : "·", px, py);
        }
      }
      context.globalAlpha = 1;
    };
    const tick = (timestamp: number) => {
      frame = 0;
      if (disposed) return;
      const dt = Math.min((timestamp - (last || timestamp)) / 1000, .032) || 1 / 60;
      last = timestamp;
      const stiffness = 180, damping = 25;
      vx += ((targetX - x) * stiffness - vx * damping) * dt;
      vy += ((targetY - y) * stiffness - vy * damping) * dt;
      x += vx * dt; y += vy * dt;
      paint();
      if (Math.abs(vx) + Math.abs(vy) + Math.abs(targetX - x) + Math.abs(targetY - y) > .004) frame = requestAnimationFrame(tick);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
    };
    const pointerMove = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType === "touch") return;
      const box = canvas.getBoundingClientRect();
      targetX = ((event.clientX - box.left) / Math.max(box.width, 1) - .5) * 2;
      targetY = ((event.clientY - box.top) / Math.max(box.height, 1) - .5) * 2;
      request();
    };
    const pointerLeave = () => { targetX = 0; targetY = 0; request(); };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", pointerMove, { passive: true });
    canvas.addEventListener("pointerleave", pointerLeave);
    resize();
    return () => {
      disposed = true;
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerleave", pointerLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="rebirth-radial">
    <canvas ref={canvasRef} aria-hidden="true" className="rebirth-radial__canvas" />
    <div className="rebirth-radial__core" aria-hidden="true">
      <span>ENGINEERING</span><strong>K.</strong><span>IN MOTION</span>
    </div>
    <p className="rebirth-radial__label">ASCII / PHYSICS · 2026</p>
  </div>;
}
