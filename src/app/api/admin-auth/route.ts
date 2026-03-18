import { NextRequest, NextResponse } from "next/server";

// ── Password is stored as env var ─────────────────────────────────────────
// Set ADMIN_PASSWORD in your .env.local or Vercel environment variables
// Default password: admin123 (CHANGE THIS before deploying!)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@hindiaudiobook";
const COOKIE_NAME = "admin_session";
// Simple session token — in production use a proper random token
const SESSION_TOKEN = process.env.SESSION_SECRET || "hindiaudiobook_admin_2024";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ success: false, error: "Password daalein" }, { status: 400 });
    }

    if (password !== ADMIN_PASSWORD) {
      // Small delay to prevent brute force
      await new Promise((r) => setTimeout(r, 800));
      return NextResponse.json({ success: false, error: "Galat password! Dobara try karein." }, { status: 401 });
    }

    // Set secure httpOnly cookie — expires in 24 hours
    const response = NextResponse.json({
      success: true,
      message: "Login successful! Admin panel khul raha hai...",
    });

    response.cookies.set(COOKIE_NAME, SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/admin",
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  // Logout — clear cookie
  const response = NextResponse.json({ success: true, message: "Logout ho gaye" });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
