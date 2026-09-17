import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supportedLocales = new Set(["pt", "en", "es"]);

export function proxy(request: NextRequest) {
  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const response = NextResponse.next();

  if (!savedLocale || !supportedLocales.has(savedLocale)) {
    response.cookies.set("NEXT_LOCALE", "pt", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
