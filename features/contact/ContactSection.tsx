"use client";

import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect, useRef } from "react";
import { sendEmail } from "@/actions/send-email";
import { siteConfig } from "@/config/site";

export default function ContactSection() {
  const t = useTranslations("Contact");
  const tSection = useTranslations("ContactSection");
  const locale = useLocale();
  const location = (siteConfig as typeof siteConfig & { location?: string }).location ?? t("location");
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [state, formAction, isPending] = useActionState(sendEmail, null);

  useEffect(() => {
    if (!startedAtRef.current) return;
    startedAtRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      formRef.current?.reset();
      if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
      statusRef.current?.focus({ preventScroll: true });
      return;
    }

    const firstInvalidField = state.errors?.name
      ? nameRef.current
      : state.errors?.email
        ? emailRef.current
        : state.errors?.message
          ? messageRef.current
          : null;

    if (firstInvalidField) {
      firstInvalidField.focus();
    } else {
      statusRef.current?.focus();
    }
  }, [state]);

  return (
    <div>
      <section id="contact" className="contact-v4">
        <div className="container-shell">
          <div className="section-heading contact-v4__statement">
            <h2>{tSection("title")}</h2>
            <div className="contact-v4__mark" aria-hidden="true">
              <Image src="/brand/mark.svg" width={78} height={78} alt="" />
            </div>
          </div>

          <div className="contact-v4__grid">
            <div className="contact-v4__intro">
              <p>{tSection("subtitle")}</p>

              <div className="contact-v4__links">
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} /></a>
                <a href={`mailto:${siteConfig.email}`}>E-mail <ArrowUpRight size={13} /></a>
              </div>

              <span className="contact-v4__availability">{location}</span>
              <span className="contact-v4__availability">{tSection("availability")}</span>
            </div>

            <form
              ref={formRef}
              action={formAction}
              className="contact-v4__form"
              aria-busy={isPending}
            >
              <input type="hidden" name="locale" value={locale} />
              <input ref={startedAtRef} type="hidden" name="formStartedAt" defaultValue="" />

              <label className="sr-only" aria-hidden="true">
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>

              <label className="contact-v4__field">
                <span id="contact-name-label">{tSection("name_label")}</span>
                <input
                  ref={nameRef}
                  id="contact-name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder={tSection("name_placeholder")}
                  disabled={isPending}
                  aria-labelledby="contact-name-label"
                  aria-describedby={state?.errors?.name ? "contact-name-error" : undefined}
                  aria-invalid={Boolean(state?.errors?.name)}
                />
                {state?.errors?.name?.[0] && <small id="contact-name-error">{state.errors.name[0]}</small>}
              </label>

              <label className="contact-v4__field">
                <span id="contact-email-label">{tSection("email_label")}</span>
                <input
                  ref={emailRef}
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  inputMode="email"
                  placeholder={tSection("email_placeholder")}
                  disabled={isPending}
                  aria-labelledby="contact-email-label"
                  aria-describedby={state?.errors?.email ? "contact-email-error" : undefined}
                  aria-invalid={Boolean(state?.errors?.email)}
                />
                {state?.errors?.email?.[0] && <small id="contact-email-error">{state.errors.email[0]}</small>}
              </label>

              <label className="contact-v4__field">
                <span id="contact-message-label">{tSection("message_label")}</span>
                <textarea
                  ref={messageRef}
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  maxLength={3000}
                  placeholder={tSection("project_placeholder")}
                  disabled={isPending}
                  aria-labelledby="contact-message-label"
                  aria-describedby={state?.errors?.message ? "contact-message-error" : undefined}
                  aria-invalid={Boolean(state?.errors?.message)}
                />
                {state?.errors?.message?.[0] && <small id="contact-message-error">{state.errors.message[0]}</small>}
              </label>

              {state?.message && (
                <div
                  ref={statusRef}
                  className="contact-v4__status"
                  role={state.success ? "status" : "alert"}
                  aria-live={state.success ? "polite" : "assertive"}
                  aria-atomic="true"
                  tabIndex={-1}
                >
                  {state.success && <CheckCircle2 size={16} aria-hidden="true" />}
                  <span>{state.message}</span>
                </div>
              )}

              <button type="submit" disabled={isPending} className="button button--primary contact-v4__submit">
                {isPending ? tSection("sending") : tSection("submit_button")}
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer" role="contentinfo">
        <div className="container-shell">
          <span>{t("footer1")}</span>
          <span>{t("footer2")}</span>
        </div>
      </footer>
    </div>
  );
}
