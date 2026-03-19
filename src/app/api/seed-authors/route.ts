import { NextResponse } from "next/server";
import { saveAllAuthors } from "@/lib/db";
import { SEED_AUTHORS } from "@/data/authors";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await saveAllAuthors(SEED_AUTHORS);
    return NextResponse.json({
      success: true,
      message: `${SEED_AUTHORS.length} authors seeded to KV`,
      authors: SEED_AUTHORS.map((a) => ({ slug: a.slug, name: a.name })),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
