import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

/**
 * If Supabase's "Site URL" is set to the app root, OAuth callbacks land at
 * `/?code=...` instead of `/auth/callback?code=...`. Intercept that here and
 * forward to the proper callback route so the code gets exchanged regardless
 * of how the Redirect URL allow-list is configured.
 *
 * Skips API routes, Next internals, the callback itself, and asset paths.
 */
export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const code = searchParams.get("code");

  if (
    code &&
    !pathname.startsWith("/auth/callback") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/callback";
    url.searchParams.set("code", code);
    // Send the user back to whatever path they were on (default /me).
    const next =
      pathname === "/" ? "/me" : pathname + (request.nextUrl.search || "");
    url.searchParams.set("next", next);
    url.searchParams.delete("code");
    url.searchParams.set("code", code);
    return NextResponse.redirect(url);
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    // Run on every path except Next internals and static assets.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|manifest|json)$).*)",
  ],
};
