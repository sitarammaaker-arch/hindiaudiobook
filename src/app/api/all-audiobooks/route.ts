import { NextResponse } from "next/server";
import { getAllAudiobooks } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const books = getAllAudiobooks();
  return NextResponse.json({ success: true, data: books });
}
