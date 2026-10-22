import { NextRequest, NextResponse } from "next/server";

// Shared by middleware (/admin/*), /api/admin-auth (login) and every admin-only API route.
// TODO: the hard-coded fallback means anyone who knows it can forge the cookie when
// SESSION_SECRET is unset — set SESSION_SECRET in Vercel and then remove the fallback.
export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_SESSION_TOKEN = process.env.SESSION_SECRET || "hindiaudiobook_admin_2024";

export function isAdminRequest(req: NextRequest): boolean {
  return req.cookies.get(ADMIN_COOKIE_NAME)?.value === ADMIN_SESSION_TOKEN;
}

/** Returns a 401 response if the request has no valid admin session, else null. */
export function requireAdmin(req: NextRequest): NextResponse | null {
  if (isAdminRequest(req)) return null;
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}
