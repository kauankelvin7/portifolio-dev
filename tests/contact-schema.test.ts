import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CONTACT_MIN_FILL_TIME_MS,
  createContactFormSchema,
  hasHumanFillTime,
} from "../features/contact/contact-schema.ts";

const schema = createContactFormSchema({
  name: "invalid name",
  email: "invalid email",
  message: "invalid message",
  tooLong: "too long",
});

describe("contact form schema", () => {
  it("normalizes header-sensitive name input and message line endings", () => {
    const result = schema.parse({
      name: "  Kauan\r\nKelvin  ",
      email: "  person@example.com ",
      message: "Line one\r\nLine two without a null byte\u0000",
    });

    assert.deepEqual(result, {
      name: "Kauan Kelvin",
      email: "person@example.com",
      message: "Line one\nLine two without a null byte",
    });
  });

  it("rejects invalid fields and enforces configured limits", () => {
    const result = schema.safeParse({
      name: "K",
      email: "not-an-email",
      message: "short",
    });

    assert.equal(result.success, false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      assert.deepEqual(errors.name, ["invalid name"]);
      assert.deepEqual(errors.email, ["invalid email"]);
      assert.deepEqual(errors.message, ["invalid message"]);
    }
  });
});

describe("minimum fill time", () => {
  it("accepts submissions at or above the threshold", () => {
    const now = 10_000;
    assert.equal(hasHumanFillTime(String(now - CONTACT_MIN_FILL_TIME_MS), now), true);
  });

  it("rejects missing, future and implausibly fast timestamps", () => {
    const now = 10_000;
    assert.equal(hasHumanFillTime(null, now), false);
    assert.equal(hasHumanFillTime(String(now + 1), now), false);
    assert.equal(hasHumanFillTime(String(now - CONTACT_MIN_FILL_TIME_MS + 1), now), false);
  });
});
