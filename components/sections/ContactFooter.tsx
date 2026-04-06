"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import LiquidSpotlightButton from "@/components/ui/LiquidSpotlightButton";
import { useActionState, useEffect, useRef } from "react";
import { sendEmail } from "@/actions/send-email";

export default function ContactFooter() {
  const t = useTranslations('Contact');
  const tSection = useTranslations('ContactSection');
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(sendEmail, null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="relative z-20 w-full overflow-hidden">
      {/* Contact Section (Stacked Vertical Layout for Zero Overlap) */}
      <section
        id="contact"
        className="w-full flex flex-col items-center justify-center font-body"
        style={{
          background: '#e5591d',
          padding: '120px 28px',
          borderBottom: '4px solid #0c0b09'
        }}
      >
        <div className="max-w-6xl w-full mx-auto flex flex-col items-start gap-24">
          
          {/* Row 1: Header / Giant Title */}
          <div className="w-full flex flex-col">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: '24px', height: '1px', background: '#0c0b09' }}></div>
                <span 
                  style={{
                    fontSize: '11px',
                    color: '#0c0b09',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 900
                  }}
                >
                  {t('location')}
                </span>
              </div>
              
              <h2 
                className="uppercase text-[#0c0b09]"
                style={{
                  fontSize: 'clamp(62px, 15vw, 160px)', // Even bigger and more "Brutal"
                  fontWeight: 900,
                  lineHeight: 0.8,
                  letterSpacing: '-0.06em',
                  fontFamily: 'var(--font-display)'
                }}
              >
                {tSection('title').split('.')[0]}<em style={{ fontStyle: 'normal', color: '#ffffff' }}>.</em>
              </h2>
            </FadeIn>
          </div>

          {/* Row 2: Form Column and Extra Details */}
          <div className="w-full grid lg:grid-cols-5 gap-16 items-start">
            
            {/* Form Area (3/5 width on large screens) */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.2}>
                <form 
                  ref={formRef}
                  action={formAction}
                  className="w-full space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <input 
                        name="name"
                        type="text" 
                        required
                        placeholder={tSection('name_placeholder')}
                        style={{
                          width: '100%',
                          background: 'rgba(0,0,0,0.08)',
                          border: '1px solid rgba(12, 11, 9, 0.15)',
                          padding: '18px 24px',
                          borderRadius: '12px',
                          color: '#0c0b09',
                          fontSize: '15px',
                          outline: 'none',
                          transition: 'all 0.3s'
                        }}
                        className="placeholder:text-[#0c0b09]/40 focus:border-[#0c0b09] focus:bg-transparent disabled:opacity-50"
                        disabled={isPending}
                      />
                      {state?.errors?.name && (
                        <p className="text-xs font-bold text-white bg-black/20 px-2 py-1 rounded inline-block">
                          {state.errors.name[0]}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input 
                        name="email"
                        type="email" 
                        required
                        placeholder={tSection('email_placeholder')}
                        style={{
                          width: '100%',
                          background: 'rgba(0,0,0,0.08)',
                          border: '1px solid rgba(12, 11, 9, 0.15)',
                          padding: '18px 24px',
                          borderRadius: '12px',
                          color: '#0c0b09',
                          fontSize: '15px',
                          outline: 'none',
                          transition: 'all 0.3s'
                        }}
                        className="placeholder:text-[#0c0b09]/40 focus:border-[#0c0b09] focus:bg-transparent disabled:opacity-50"
                        disabled={isPending}
                      />
                      {state?.errors?.email && (
                        <p className="text-xs font-bold text-white bg-black/20 px-2 py-1 rounded inline-block">
                          {state.errors.email[0]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <textarea 
                      name="message"
                      rows={6}
                      required
                      placeholder={tSection('project_placeholder')}
                      style={{
                        width: '100%',
                        background: 'rgba(0,0,0,0.08)',
                        border: '1px solid rgba(12, 11, 9, 0.15)',
                        padding: '18px 24px',
                        borderRadius: '12px',
                        color: '#0c0b09',
                        fontSize: '15px',
                        outline: 'none',
                        resize: 'none',
                        transition: 'all 0.3s'
                      }}
                      className="placeholder:text-[#0c0b09]/40 focus:border-[#0c0b09] focus:bg-transparent disabled:opacity-50"
                      disabled={isPending}
                    />
                    {state?.errors?.message && (
                      <p className="text-xs font-bold text-white bg-black/20 px-2 py-1 rounded inline-block">
                        {state.errors.message[0]}
                      </p>
                    )}
                  </div>

                  {/* Feedback Messages */}
                  {state?.message && !state.success && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-700 text-sm font-bold">
                      <AlertCircle size={18} />
                      {state.message}
                    </div>
                  )}

                  {state?.success && (
                    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-500">
                      <div className="flex items-center gap-3 p-6 bg-white/5 border border-[#e5591d]/30 rounded-xl text-white text-base font-bold backdrop-blur-sm">
                        <CheckCircle2 size={24} className="text-[#e5591d]" />
                        {state.message || "Mensagem enviada com sucesso!"}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          formRef.current?.reset();
                          // Force state reset by reloading or using a local state if needed
                          window.location.reload(); // Simple way to reset useActionState for now
                        }}
                        className="text-[10px] uppercase tracking-widest text-[#666666] hover:text-[#e5591d] transition-colors font-black flex items-center gap-2 self-start"
                      >
                        ← Enviar outra mensagem
                      </button>
                    </div>
                  )}

                  {!state?.success && (
                    <button 
                      type="submit"
                      disabled={isPending}
                      className="group relative w-full overflow-hidden disabled:cursor-not-allowed"
                      style={{
                        background: isPending ? '#222' : '#0c0b09',
                        color: '#ffffff',
                        padding: '20px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 900,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        border: 'none',
                        cursor: isPending ? 'wait' : 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      <div className="flex items-center justify-center gap-4 transition-transform group-hover:scale-[1.01]">
                        {isPending ? 'Enviando...' : tSection('submit_button')}
                        {!isPending && <span className="inline-block transition-transform group-hover:translate-x-1">→</span>}
                      </div>
                    </button>
                  )}
                </form>
              </FadeIn>
            </div>

            {/* Side Info Area (2/5 width) */}
            <div className="lg:col-span-2 space-y-12">
              <FadeIn delay={0.4}>
                <h4 className="text-[#0c0b09] font-black text-xs tracking-widest uppercase mb-8 opacity-60">SOCIAL CONNECT</h4>
                <div className="flex flex-wrap gap-4">
                   <LiquidSpotlightButton href="https://github.com/kauankelvin7" className="!px-6" ariaLabel="GitHub Profile">
                      <Github size={20} color="#ffffff" />
                   </LiquidSpotlightButton>
                   <LiquidSpotlightButton href="https://www.linkedin.com/in/kauan-kelvin/" className="!px-6" ariaLabel="LinkedIn Profile">
                      <Linkedin size={20} color="#ffffff" />
                   </LiquidSpotlightButton>
                   <LiquidSpotlightButton href="mailto:kelvinkauan722@gmail.com" className="!px-6" ariaLabel="Send Email">
                      <Mail size={20} color="#ffffff" />
                   </LiquidSpotlightButton>
                </div>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div 
                  className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex flex-col gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </div>
                    <span className="text-[#0c0b09] font-black text-[10px] tracking-widest uppercase">
                      ACTIVE & AVAILABLE
                    </span>
                  </div>
                  <p className="text-[#0c0b09] text-sm leading-relaxed font-medium">
                    {t('description')}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
          
        </div>
      </section>

      {/* Footer Bar (Minimal Dark) */}
      <footer 
        className="w-full flex flex-col md:flex-row items-center justify-between"
        style={{
          background: '#0c0b09',
          padding: '40px 28px',
          borderTop: '1px solid #1a1815'
        }}
      >
        <div 
          style={{
            fontSize: '10px',
            color: '#444444',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)'
          }}
        >
          {t('footer1')}
        </div>

        <div 
          style={{
            fontSize: '10px',
            color: '#444444',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            marginTop: '16px'
          }}
          className="md:mt-0 flex items-center gap-6"
        >
          {t('footer2')}
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors"
          >
            <span className="hidden md:inline">VOLTAR AO TOPO</span>
            <div className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full group-hover:border-[#e5591d] transition-colors">
              <span className="transform -rotate-45 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">↑</span>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
