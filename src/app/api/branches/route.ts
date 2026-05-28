import { NextResponse } from "next/server";
import { loadBranches } from "@/lib/branches-loader";

/**
 * Returns the same branch list /locations sees, so the contract modal and
 * other client-side surfaces can stay in sync with the live Google Sheets.
 * loadBranches() already caches reads 60s, so this is cheap to hit.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const branches = await loadBranches();
    return NextResponse.json({ branches });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "load failed" },
      { status: 500 },
    );
  }
}
