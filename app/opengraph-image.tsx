import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Kauan Kelvin — Engenharia de Software, Back-end e Automação";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          background: "#090d09",
          color: "#f0f4ed",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "560px",
            height: "560px",
            right: "-120px",
            top: "-120px",
            borderRadius: "999px",
            background: "rgba(139, 170, 125, 0.10)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "22px", color: "#8f9b8a" }}>
          <span style={{ width: "36px", height: "4px", background: "#8baa7d", borderRadius: "99px" }} />
          Software Engineering · Back-end · Automation
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "960px", zIndex: 1 }}>
          <h1 style={{ margin: 0, fontSize: "118px", lineHeight: 0.85, letterSpacing: "-0.065em", fontWeight: 900 }}>
            KAUAN <span style={{ color: "#8baa7d" }}>KELVIN</span>
          </h1>
          <p style={{ margin: "34px 0 0", maxWidth: "820px", fontSize: "30px", lineHeight: 1.35, color: "#bcc7b8" }}>
            Projetos em Java, Spring Boot, Python, automação e aplicações web.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", color: "#71806e", zIndex: 1 }}>
          <span>Portfólio · 2026</span>
          <span>kauankelvindev.vercel.app</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
