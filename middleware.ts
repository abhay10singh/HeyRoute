// heyroute / middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './src/lib/auth';
import { signToken } from './src/lib/auth';
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET ;

// middleware.ts


export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Skip public auth endpoints
  if (path.startsWith('/api/auth/login') ||
      path.startsWith('/api/auth/signup') ||
      path.startsWith('/api/auth/forgot-password')) {
    return NextResponse.next();
  }

  try {
    // Just verify the cookie-based token here:
    verifyToken(req);
    return NextResponse.next();
  } catch {
    if (path.startsWith('/api')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }
}


// middleware.ts
// middleware.ts
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/((?!api/auth|login|signup|_next/static|_next/image|favicon.ico|api/user/me).*)'
  ],
};

