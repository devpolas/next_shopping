import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { session } from "./lib/actions/auth.actions";

const AUTH_PATH = ["/signin", "/signup"];

const PROTECTED_PATHS = ["/dashboard", "/profile"];

function safeRedirect(url: string) {
  if (!url.startsWith("/")) return "/";
  return url;
}

export async function proxy(request: NextRequest) {
  const sessionUser = await session();
  const isAdminOrModerator =
    sessionUser?.role === "ADMIN" || sessionUser?.role === "MODERATOR";
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const sessionCookie =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isLoggedIn = Boolean(sessionCookie);

  if (isLoggedIn && AUTH_PATH.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isLoggedIn && pathname.startsWith("/dashboard")) {
    if (!isAdminOrModerator) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!isLoggedIn && !AUTH_PATH.includes(pathname)) {
    const callbackURL = safeRedirect(pathname + search);
    const loginUrl = new URL("/signin", request.url);
    loginUrl.searchParams.set("callbackURL", callbackURL);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/signin", "/signup"],
};
