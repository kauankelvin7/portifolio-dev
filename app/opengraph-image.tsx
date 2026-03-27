import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Kauan Kelvin — Dev Fullstack';
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
          background: '#ff6b00',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          border: '20px solid #0a0a0a',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#faf9f6',
            padding: '40px 80px',
            border: '8px solid #0a0a0a',
            boxShadow: '20px 20px 0px 0px #0a0a0a',
          }}
        >
          <h1
            style={{
              fontSize: '100px',
              fontWeight: 900,
              color: '#0a0a0a',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '-0.05em',
            }}
          >
            Kauan Kelvin
          </h1>
          <p
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#ff6b00',
              margin: '20px 0 0 0',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              background: '#0a0a0a',
              padding: '8px 20px',
            }}
          >
            Dev Frontend · 3D · Performance
          </p>
        </div>
        
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            fontSize: '20px',
            fontWeight: 800,
            color: '#0a0a0a',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          kauankelvindev.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
