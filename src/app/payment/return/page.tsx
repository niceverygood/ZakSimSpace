import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ApproveBridge } from "./ApproveBridge";

/**
 * NicePay POSTs the authentication result here as form-encoded data.
 * We then hand the payload to the client, which calls our /api/payment/approve
 * route. We can't accept POSTs in a server component, so we expose a small
 * client form that the user submits — for NicePay flow the popup automatically
 * navigates the *parent* window here, so we receive a fresh GET on opener
 * window. The actual params arrive via window.opener communication patterns
 * differ by integration; for the v1 SDK this page is loaded via popup form
 * submission and the popup window contains the params in its URL or POST body.
 *
 * To keep this universally working we accept the params via the request body
 * (POST) — Next.js doesn't render UI on POST by default, so we redirect into
 * an intermediate route that exposes the form values to the client. For the
 * common case (popup submits to opener via JS) the SDK sets window.opener form
 * values. ApproveBridge reads whatever it can find and submits to /api/payment/approve.
 */

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function PaymentReturnPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const flat = Object.fromEntries(
    Object.entries(params).map(([k, v]) => [k, Array.isArray(v) ? v[0] ?? "" : v ?? ""]),
  ) as Record<string, string>;

  // If we received a final result-code via query string, route directly.
  if (flat.fail === "1" || flat.AuthResultCode === "F100") {
    redirect(`/payment/fail?reason=${encodeURIComponent(flat.AuthResultMsg ?? "결제가 취소되었어요.")}`);
  }

  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <div className="mx-auto max-w-md px-6 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-4 border-navy-200 border-t-navy-600 animate-spin mb-5" />
          <h1 className="text-[20px] font-extrabold text-ink-900">
            결제를 확인하는 중…
          </h1>
          <p className="mt-3 text-[13.5px] text-ink-500 leading-[1.75]">
            창을 닫지 마세요. 승인이 완료되면 자동으로 다음 화면으로 이동합니다.
          </p>
          <ApproveBridge initial={flat} />
        </div>
      </main>
      <Footer />
    </>
  );
}
