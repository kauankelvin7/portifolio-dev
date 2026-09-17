"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2, Github, Linkedin, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { sendEmail } from "@/actions/send-email";

export default function ContactFooter() {
  const t = useTranslations("Contact");
  const tSection = useTranslations("ContactSection");
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(sendEmail, null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  return (
    <div className="relative z-20 w-full overflow-hidden">
      <section id="contact" className="section-shell bg-[var(--accent)] text-[#140d09]">
        <div className="container-shell">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-black/60">
            {t('location')}
          </span>

          <div className="mt-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <h2 className="max-w-[8ch] font-display text-[clamp(3.4rem,9vw,7.5rem)] leading-[0.86] tracking-[-0.055em]">
                {tSection('title')}
              </h2>
              <p className="mt-8 max-w-md text-base leading-7 text-black/70">{tSection('subtitle')}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0c0b09] text-white transition-transform hover:-translate-y-0.5" href="https://github.com/kauankelvin7" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={18} aria-hidden="true" />
                </a>
                <a className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0c0b09] text-white transition-transform hover:-translate-y-0.5" href="https://www.linkedin.com/in/kauan-kelvin/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} aria-hidden="true" />
                </a>
                <a className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0c0b09] text-white transition-transform hover:-translate-y-0.5" href="mailto:kelvinkauan722@gmail.com" aria-label={tSection('email_link_label')}>
                  <Mail size={18} aria-hidden="true" />
                </a>
              </div>

              <p className="mt-8 text-sm font-semibold text-black/65">{tSection('availability')}</p>
            </div>

            <form ref={formRef} action={formAction} className="rounded-[var(--radius-lg)] border border-black/10 bg-black/[0.07] p-5 md:p-7">
              <input type="hidden" name="locale" value={locale} />

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs font-semibold text-black/60">{tSection('name_label')}</span>
                  <input name="name" required placeholder={tSection('name_placeholder')} className="min-h-12 rounded-xl border border-black/15 bg-white/25 px-4 text-sm text-[#140d09] outline-none placeholder:text-black/35 focus:border-black/40" disabled={isPending} />
                  {state?.errors?.name?.[0] && <span className="text-xs font-semibold text-black/70">{state.errors.name[0]}</span>}
                </label>
                <label className="grid gap-2">
                  <span className="text-xs font-semibold text-black/60">{tSection('email_label')}</span>
                  <input name="email" type="email" required placeholder={tSection('email_placeholder')} className="min-h-12 rounded-xl border border-black/15 bg-white/25 px-4 text-sm text-[#140d09] outline-none placeholder:text-black/35 focus:border-black/40" disabled={isPending} />
                  {state?.errors?.email?.[0] && <span className="text-xs font-semibold text-black/70">{state.errors.email[0]}</span>}
                </label>
              </div>

              <label className="mt-4 grid gap-2">
                <span className="text-xs font-semibold text-black/60">{tSection('message_label')}</span>
                <textarea name="message" rows={6} required placeholder={tSection('project_placeholder')} className="rounded-xl border border-black/15 bg-white/25 px-4 py-4 text-sm leading-6 text-[#140d09] outline-none placeholder:text-black/35 focus:border-black/40" disabled={isPending} />
                {state?.errors?.message?.[0] && <span className="text-xs font-semibold text-black/70">{state.errors.message[0]}</span>}
              </label>

              {state?.message && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-black/10 bg-white/20 p-4 text-sm leading-6 text-black/75">
                  {state.success && <CheckCircle2 className="mt-0.5 shrink-0" size={18} aria-hidden="true" />}
                  <span>{state.message}</span>
                </div>
              )}

              <button type="submit" disabled={isPending} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#0c0b09] px-5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70">
                {isPending ? tSection('sending') : tSection('submit_button')}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--background)] py-7">
        <div className="container-shell flex flex-col gap-3 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>{t('footer1')}</span>
          <span>{t('footer2')}</span>
        </div>
      </footer>
    </div>
  );
}
