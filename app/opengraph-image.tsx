import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Kauan Kelvin — Engenharia de Software, Back-end e Automação';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0c0b09',
          color: '#f7f4ee',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '22px', color: '#9b9488' }}>
          <span style={{ width: '36px', height: '4px', background: '#e8612a', borderRadius: '99px' }} />
          Software Engineering · Back-end · Automation
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '960px' }}>
          <h1 style={{ margin: 0, fontSize: '118px', lineHeight: 0.85, letterSpacing: '-0.065em', fontWeight: 900 }}>
            KAUAN <span style={{ color: '#e8612a' }}>KELVIN</span>
          </h1>
          <p style={{ margin: '34px 0 0', maxWidth: '820px', fontSize: '30px', lineHeight: 1.35, color: '#b8b1a6' }}>
            Projetos em Java, Spring Boot, Python, automação e aplicações web.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: '#777064' }}>
          <span>Portfólio · 2026</span>
          <span>kauankelvindev.vercel.app</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
