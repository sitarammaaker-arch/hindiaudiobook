import { NextRequest, NextResponse } from "next/server";
import { readJSONAsync, writeJSONAsync } from "@/lib/db";

export const dynamic = "force-dynamic";

type Subscriber = {
  email: string;
  name?: string;
  subscribedAt: string;
  source: string;
};

export async function POST(req: NextRequest) {
  try {
    const { email, name, source } = await req.json();

    if (!email?.trim() || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Valid email daalo" }, { status: 400 });
    }

    const subscribers = await readJSONAsync<Subscriber>("subscribers.json");

    // Check duplicate
    if (subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ success: false, error: "Yeh email already subscribed hai!" }, { status: 409 });
    }

    const newSub: Subscriber = {
      email: email.trim().toLowerCase(),
      name: name?.trim() || "",
      subscribedAt: new Date().toISOString(),
      source: source || "homepage",
    };

    subscribers.push(newSub);
    await writeJSONAsync("subscribers.json", subscribers);

    return NextResponse.json({
      success: true,
      message: "✅ Subscribe ho gaye! Nayi audiobooks ki notification milegi.",
      total: subscribers.length,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const subscribers = await readJSONAsync<Subscriber>("subscribers.json");
    return NextResponse.json({ success: true, count: subscribers.length, data: subscribers });
  } catch {
    return NextResponse.json({ success: true, count: 0, data: [] });
  }
}
