import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Check if current hostname is admin domain
  // Adjust "admin." to match your desired subdomain
  const isAdmin = hostname.startsWith("admin.");

  if (isAdmin && !url.pathname.startsWith("/api")) {
    // Rewrite to /admin path for internal routing
    // e.g. admin.localhost/ -> /admin
    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
