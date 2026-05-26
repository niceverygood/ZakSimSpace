import Script from "next/script";

/**
 * Production analytics. Activates only when env keys are present.
 * - GA4 via NEXT_PUBLIC_GA_ID (e.g. "G-XXXXXXXXXX")
 * - Vercel Web Analytics via NEXT_PUBLIC_VERCEL_ANALYTICS=1
 *
 * Both no-op silently in dev or when the keys aren't set, so this is safe to
 * render globally from layout.tsx.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const vercelOn = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1";

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=Lax;Secure'
              });
            `}
          </Script>
        </>
      )}

      {vercelOn && (
        <Script
          src="/_vercel/insights/script.js"
          strategy="afterInteractive"
          data-mode="production"
        />
      )}
    </>
  );
}
