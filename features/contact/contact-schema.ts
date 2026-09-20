import { z } from "zod";

export const CONTACT_MIN_FILL_TIME_MS = 1_500;

export type ContactValidationMessages = {
  name: string;
  email: string;
  message: string;
  tooLong: string;
};

function normalizeSingleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

function normalizeMessage(value: string) {
  return value.replace(/\r\n?/g, "\n").replace(/\u0000/g, "").trim();
}

export function createContactFormSchema(messages: ContactValidationMessages) {
  return z.object({
    name: z
      .string()
      .transform(normalizeSingleLine)
      .pipe(z.string().min(2, messages.name).max(80, messages.tooLong)),
    email: z
      .string()
      .trim()
      .max(254, messages.tooLong)
      .email(messages.email),
    message: z
      .string()
      .transform(normalizeMessage)
      .pipe(z.string().min(10, messages.message).max(3000, messages.tooLong)),
  });
}

export function hasHumanFillTime(value: FormDataEntryValue | null, now = Date.now()) {
  const startedAt = Number(value);

  return (
    Number.isFinite(startedAt) &&
    startedAt > 0 &&
    startedAt <= now &&
    now - startedAt >= CONTACT_MIN_FILL_TIME_MS
  );
}
