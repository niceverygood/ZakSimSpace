import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

/**
 * Supabase OAuth callback. After Kakao auth at
 * https://<project>.supabase.co/auth/v1/callback, Supabase redirects here
 * with ?code=...&next=/some/path. We exchange the code for a session
 * (cookies set by createClient) and forward the user on.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/me";

  if (code) {
    const supabase = createClient(await cookies());
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${url.origin}${next}`);
    }
  }

  return NextResponse.redirect(
    `${url.origin}/login?error=${encodeURIComponent("로그인에 실패했어요. 다시 시도해 주세요.")}`,
  );
}
