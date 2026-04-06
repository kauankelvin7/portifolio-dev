import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'pt';
  const response = NextResponse.next();
  
  // Ensure the cookie is present for the client if it's missing
  if (!request.cookies.has('NEXT_LOCALE')) {
    response.cookies.set('NEXT_LOCALE', 'pt', { path: '/' });
  }

  return response;
}

export const config = {
  // Skip all internal paths (_next)
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};
