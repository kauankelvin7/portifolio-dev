import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

function leafKeys(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    return child && typeof child === "object" && !Array.isArray(child) ? leafKeys(child, next) : [next];
  });
}

test("pt, en and es expose the same translation keys", () => {
  const locales = ["pt", "en", "es"];
  const dictionaries = locales.map((locale) => JSON.parse(fs.readFileSync(path.join(process.cwd(), "messages", `${locale}.json`), "utf8")));
  const expected = leafKeys(dictionaries[0]).sort();
  for (let index = 1; index < dictionaries.length; index += 1) {
    assert.deepEqual(leafKeys(dictionaries[index]).sort(), expected, `messages/${locales[index]}.json is out of sync`);
  }
});
