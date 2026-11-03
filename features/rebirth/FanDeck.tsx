"use client";

import { Pause, Play, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

export type FanCard = { title: string; category: string; image: string; href: string };

type Spring = { x: number; y: number; rotation: number; vx: number; vy: number; vr: number };

function move(value: number, velocity: number, target: number, dt: number): [number, number] {
  const acceleration = (target - value) * 138 - velocity * 21;
  const nextVelocity = velocity + acceleration * dt;
  return [value + nextVelocity * dt, nextVelocity];
}

export function RebirthFanDeck({ cards }: { cards: FanCard[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playingRef = useRef(true);
  const [playing, setPlaying] = useState(true);
  const locale = useLocale();
  const copy = {
    pt: { description: "Experimentos, produtos e engenharia aplicada.", pause: "Pausar", play: "Reproduzir", navigation: "Projetos da galeria" },
    en: { description: "Experiments, products and applied engineering.", pause: "Pause", play: "Play", navigation: "Gallery projects" },
    es: { description: "Experimentos, productos e ingeniería aplicada.", pause: "Pausar", play: "Reproducir", navigation: "Proyectos de la galería" },
  }[locale as "pt" | "en" | "es"] ?? { description: "Experimentos, produtos e engenharia aplicada.", pause: "Pausar", play: "Reproduzir", navigation: "Projetos da galeria" };

  useEffect(() => {
    playingRef.current = playing;
    canvasRef.current?.dispatchEvent(new Event("rebirth:play-toggle"));
  }, [playing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !cards.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const images = cards.map((card) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = card.image;
      return img;
    });
    const springs: Spring[] = cards.map(() => ({ x: 0, y: 0, rotation: 0, vx: 0, vy: 0, vr: 0 }));
    let width = 0;
    let height = 0;
    let elapsed = 5.5;
    let last = 0;
    let visible = false;
    let disposed = false;
    let frameId = 0;
    let pointer = 0;

    const draw = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      const cardWidth = Math.min(225, Math.max(135, width * 0.19));
      const cardHeight = cardWidth * 1.32;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const state = springs[i];
        ctx.save();
        ctx.translate(width / 2 + state.x, height * 0.52 + state.y);
        ctx.rotate(state.rotation);
        ctx.shadowColor = "rgba(19, 25, 39, .17)";
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 18;
        ctx.fillStyle = "#fffefa";
        ctx.beginPath();
        ctx.roundRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 14);
        ctx.fill();
        ctx.shadowColor = "transparent";
        const pad = cardWidth * 0.075;
        const mediaWidth = cardWidth - pad * 2;
        const mediaHeight = cardHeight * 0.68;
        ctx.fillStyle = "#e8e7e2";
        ctx.beginPath();
        ctx.roundRect(-mediaWidth / 2, -cardHeight / 2 + pad, mediaWidth, mediaHeight, 7);
        ctx.fill();
        const image = images[i];
        if (image.complete && image.naturalWidth > 0) {
          // Contain the whole original screenshot; never crop to fill the canvas card.
          const ratio = Math.min(mediaWidth / image.naturalWidth, mediaHeight / image.naturalHeight);
          const drawWidth = image.naturalWidth * ratio;
          const drawHeight = image.naturalHeight * ratio;
          ctx.drawImage(image, -drawWidth / 2, -cardHeight / 2 + pad + (mediaHeight - drawHeight) / 2, drawWidth, drawHeight);
        }
        ctx.fillStyle = "#9b4e39";
        ctx.font = "600 10px system-ui, sans-serif";
        ctx.fillText(String(i + 1).padStart(2, "0") + " / " + String(cards.length).padStart(2, "0"), -cardWidth / 2 + pad, cardHeight / 2 - 42);
        ctx.fillStyle = "#25303b";
        ctx.font = "600 " + Math.min(17, cardWidth * .087) + "px system-ui, sans-serif";
        ctx.fillText(card.title.slice(0, 21), -cardWidth / 2 + pad, cardHeight / 2 - 18, mediaWidth);
        ctx.restore();
      }
    };

    const tick = (now: number) => {
      frameId = 0;
      if (disposed || !visible || document.hidden) return;
      const dt = Math.min(Math.max((now - (last || now)) / 1000, 0), .04);
      last = now;
      const animated = !reduced.matches && playingRef.current;
      if (animated) elapsed += dt;
      const phase = (elapsed % 17.5) / 17.5;
      const opening = reduced.matches ? 1 : Math.min(1, Math.max(0, (phase - .03) / .17));
      const closing = reduced.matches ? 1 : Math.min(1, Math.max(0, (1 - phase) / .19));
      const spread = opening * closing;
      for (let i = 0; i < springs.length; i++) {
        const offset = i - (springs.length - 1) / 2;
        const targetX = offset * Math.min(185, width * .14) * spread;
        const targetY = (Math.abs(offset) * 20 - 18) * spread;
        const targetRotation = offset * .145 * spread + pointer * .05;
        const s = springs[i];
        [s.x, s.vx] = move(s.x, s.vx, targetX, dt || 1 / 60);
        [s.y, s.vy] = move(s.y, s.vy, targetY, dt || 1 / 60);
        [s.rotation, s.vr] = move(s.rotation, s.vr, targetRotation, dt || 1 / 60);
      }
      draw();
      if (animated || springs.some((s) => Math.abs(s.vx) + Math.abs(s.vy) + Math.abs(s.vr) > .1)) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const request = () => {
      if (!frameId && visible && !document.hidden) frameId = requestAnimationFrame(tick);
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      last = 0;
      request();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (!visible && frameId) cancelAnimationFrame(frameId);
      if (!visible) frameId = 0;
      else { last = 0; request(); }
    }, { threshold: .05 });
    intersectionObserver.observe(canvas);
    const pointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = (event.clientX - bounds.left) / Math.max(bounds.width, 1) * 2 - 1;
      request();
    };
    const pointerLeave = () => { pointer = 0; request(); };
    const visibility = () => { last = 0; request(); };
    canvas.addEventListener("pointermove", pointerMove, { passive: true });
    canvas.addEventListener("pointerleave", pointerLeave);
    canvas.addEventListener("rebirth:play-toggle", request);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", request);
    images.forEach((img) => { img.addEventListener("load", request); img.addEventListener("error", request); });
    resize();
    return () => {
      disposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerleave", pointerLeave);
      canvas.removeEventListener("rebirth:play-toggle", request);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", request);
      images.forEach((img) => { img.removeEventListener("load", request); img.removeEventListener("error", request); });
    };
  }, [cards]);

  return (
    <div className="rebirth-fan">
      <div className="rebirth-fan__top">
        <div><span className="rebirth-fan__eyebrow">VISUAL EXPLORER / 01—05</span><p>{copy.description}</p></div>
        <button type="button" onClick={() => { playingRef.current = !playing; setPlaying(!playing); }} aria-pressed={!playing} className="rebirth-fan__control">
          {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          {playing ? copy.pause : copy.play}
        </button>
      </div>
      <canvas ref={canvasRef} className="rebirth-fan__canvas" aria-hidden="true" />
      <nav aria-label={copy.navigation} className="rebirth-fan__links">
        {cards.map((card, index) => <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer">
          <span>{String(index + 1).padStart(2, "0")}</span>{card.title}<ArrowUpRight size={13} aria-hidden="true" />
        </a>)}
      </nav>
    </div>
  );
}
