import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";
const SESSION_TOKEN = process.env.SESSION_SECRET || "hindiaudiobook_admin_2024";
const LOGIN_PAGE = "/admin/login";
const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin/* routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow login page through
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check session cookie
  const session = req.cookies.get(COOKIE_NAME)?.value;

  if (session !== SESSION_TOKEN) {
    // Redirect to login with return URL
    const loginUrl = new URL(LOGIN_PAGE, req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
