import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Check if the request is for the admin subdomain
  const isAdminSubdomain =
    hostname.startsWith('admin.localhost') ||
    hostname.startsWith('admin.127.0.0.1');

  // Skip middleware for API routes and static files
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // If on admin subdomain, rewrite to /admin/* routes
  if (isAdminSubdomain) {
    // If already pointing to /admin, let it through
    if (url.pathname.startsWith('/admin')) {
      return NextResponse.next();
    }
    // Rewrite root and all other paths to /admin/*
    url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // If on the shop domain but trying to access /admin, block it
  if (url.pathname.startsWith('/admin')) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
