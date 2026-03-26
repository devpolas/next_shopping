import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { healthCheck } from "@/lib/prisma-health";

const AUTH_PATH = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip Next.js internals
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  // Optional DB health check
  const dbHealthy = await healthCheck();
  if (!dbHealthy) {
    return new NextResponse("Service Unavailable", { status: 503 });
  }

  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const isLoggedIn = Boolean(sessionCookie);

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && AUTH_PATH.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users trying to access protected pages
  if (!isLoggedIn && !AUTH_PATH.includes(pathname)) {
    const callbackURL = pathname + search;
    const loginUrl = new URL("/signin", request.url);
    loginUrl.searchParams.set("callbackURL", callbackURL);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
