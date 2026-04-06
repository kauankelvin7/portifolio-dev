'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0c0b09] px-6 text-center font-body selection:bg-[#e5591d] selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <span 
          style={{ 
            fontSize: '11px', 
            color: '#e5591d', 
            letterSpacing: '0.4em', 
            textTransform: 'uppercase', 
            fontWeight: 900,
            display: 'block',
            marginBottom: '24px'
          }}
        >
          ERRO 404 / PERDIDO NO CÓDIGO
        </span>

        <h1 
          style={{ 
            fontSize: 'clamp(100px, 20vw, 220px)', 
            fontWeight: 900, 
            lineHeight: 0.8, 
            letterSpacing: '-0.06em', 
            fontFamily: 'var(--font-display)',
            color: '#ffffff'
          }}
          className="mb-8 uppercase"
        >
          OPS<span style={{ color: '#e5591d' }}>.</span>
        </h1>

        <p 
          style={{ 
            fontSize: '18px', 
            lineHeight: 1.6, 
            color: '#888888',
            marginBottom: '48px',
            maxWidth: '500px',
            marginInline: 'auto'
          }}
        >
          O sistema não conseguiu encontrar o recurso solicitado. Parece que você navegou para uma área não mapeada.
        </p>

        <Link 
          href="/"
          className="group relative inline-flex items-center gap-4 overflow-hidden transition-all duration-300"
          style={{
            background: '#e5591d',
            color: '#ffffff',
            padding: '18px 40px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 900,
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}
        >
          <span className="relative z-10 transition-transform group-hover:-translate-x-2">
            VOLTAR AO INÍCIO
          </span>
          <span className="relative z-10 transition-transform group-hover:translate-x-2">
            →
          </span>
          <div 
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
          />
        </Link>
      </motion.div>
      
      {/* Background Decor */}
      <div 
        className="absolute bottom-10 left-10 opacity-10 pointer-events-none select-none"
        style={{ fontSize: '12px', color: '#ffffff', fontFamily: 'var(--font-mono)' }}
      >
        [ SYSTEM_ID: ERROR_NOT_FOUND ]
      </div>
    </div>
  );
}
