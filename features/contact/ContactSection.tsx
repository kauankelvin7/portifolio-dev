"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
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
    <div>
      <section id="contact" className="editorial-section contact-v3">
        <div className="container-shell">
          <div className="section-intro">
            <span className="section-index">06</span>
            <span className="section-kicker">{t("location")}</span>
          </div>

          <div className="contact-v3__grid">
            <div className="contact-v3__intro reveal-stagger">
              <h2>{tSection("title")}</h2>
              <p>{tSection("subtitle")}</p>

              <div className="contact-v3__links">
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} /></a>
                <a href={`mailto:${siteConfig.email}`}>E-mail <ArrowUpRight size={13} /></a>
              </div>

              <span className="contact-v3__availability">{tSection("availability")}</span>
            </div>

            <form ref={formRef} action={formAction} className="contact-v3__form reveal-stagger">
              <input type="hidden" name="locale" value={locale} />

              <label className="sr-only" aria-hidden="true">
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>

              <label className="contact-v3__field">
                <span>{tSection("name_label")}</span>
                <input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder={tSection("name_placeholder")} disabled={isPending} />
                {state?.errors?.name?.[0] && <small>{state.errors.name[0]}</small>}
              </label>

              <label className="contact-v3__field">
                <span>{tSection("email_label")}</span>
                <input name="email" type="email" required maxLength={254} autoComplete="email" placeholder={tSection("email_placeholder")} disabled={isPending} />
                {state?.errors?.email?.[0] && <small>{state.errors.email[0]}</small>}
              </label>

              <label className="contact-v3__field">
                <span>{tSection("message_label")}</span>
                <textarea name="message" rows={5} required minLength={10} maxLength={3000} placeholder={tSection("project_placeholder")} disabled={isPending} />
                {state?.errors?.message?.[0] && <small>{state.errors.message[0]}</small>}
              </label>

              {state?.message && (
                <div className="contact-v3__status" role="status" aria-live="polite">
                  {state.success && <CheckCircle2 size={16} aria-hidden="true" />}
                  <span>{state.message}</span>
                </div>
              )}

              <button type="submit" disabled={isPending} className="editorial-button contact-v3__submit">
                {isPending ? tSection("sending") : tSection("submit_button")}
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container-shell">
          <span>{t("footer1")}</span>
          <span>{t("footer2")}</span>
        </div>
      </footer>
    </div>
  );
}
