"use client";

import { CheckCircle2, Github, Linkedin, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect, useRef } from "react";
import { sendEmail } from "@/actions/send-email";
import { siteConfig } from "@/config/site";

export default function ContactSection() {
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
      <section id="contact" className="contact-section section-shell">
        <div className="container-shell relative z-10">
          <span className="contact-eyebrow inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
            {t("location")}
          </span>

          <div className="mt-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="motion-reveal">
              <h2 className="max-w-[8ch] font-display text-[clamp(3.4rem,9vw,7.5rem)] leading-[0.86] tracking-[-0.055em] text-[var(--text)]">
                {tSection("title")}
              </h2>
              <p className="contact-copy mt-8 max-w-md text-base leading-7">{tSection("subtitle")}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a className="contact-social" href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={18} aria-hidden="true" />
                </a>
                <a className="contact-social" href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} aria-hidden="true" />
                </a>
                <a className="contact-social" href={`mailto:${siteConfig.email}`} aria-label={tSection("email_link_label")}>
                  <Mail size={18} aria-hidden="true" />
                </a>
              </div>

              <p className="mt-8 text-sm font-semibold text-[var(--text-muted)]">{tSection("availability")}</p>
            </div>

            <form ref={formRef} action={formAction} className="contact-card motion-reveal relative p-5 md:p-7">
              <input type="hidden" name="locale" value={locale} />

              <label className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="contact-label text-xs font-semibold">{tSection("name_label")}</span>
                  <input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder={tSection("name_placeholder")} className="contact-field" disabled={isPending} />
                  {state?.errors?.name?.[0] && <span className="text-xs font-semibold text-[var(--accent-strong)]">{state.errors.name[0]}</span>}
                </label>
                <label className="grid gap-2">
                  <span className="contact-label text-xs font-semibold">{tSection("email_label")}</span>
                  <input name="email" type="email" required maxLength={254} autoComplete="email" placeholder={tSection("email_placeholder")} className="contact-field" disabled={isPending} />
                  {state?.errors?.email?.[0] && <span className="text-xs font-semibold text-[var(--accent-strong)]">{state.errors.email[0]}</span>}
                </label>
              </div>

              <label className="mt-4 grid gap-2">
                <span className="contact-label text-xs font-semibold">{tSection("message_label")}</span>
                <textarea name="message" rows={6} required minLength={10} maxLength={3000} placeholder={tSection("project_placeholder")} className="contact-field py-4" disabled={isPending} />
                {state?.errors?.message?.[0] && <span className="text-xs font-semibold text-[var(--accent-strong)]">{state.errors.message[0]}</span>}
              </label>

              {state?.message && (
                <div className="contact-status mt-4 flex items-start gap-3 rounded-xl p-4 text-sm leading-6" role="status" aria-live="polite">
                  {state.success && <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--accent)]" size={18} aria-hidden="true" />}
                  <span>{state.message}</span>
                </div>
              )}

              <button type="submit" disabled={isPending} className="contact-submit mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 text-sm font-bold disabled:cursor-wait disabled:opacity-70">
                {isPending ? tSection("sending") : tSection("submit_button")}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--background)] py-7">
        <div className="container-shell flex flex-col gap-3 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>{t("footer1")}</span>
          <span>{t("footer2")}</span>
        </div>
      </footer>
    </div>
  );
}
