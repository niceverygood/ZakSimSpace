/**
 * NicePay 인증결제 v1 helpers.
 *
 * Reference: https://developers.nicepay.co.kr/index.php
 *
 * Auth flow:
 *   1. Server prepares EdiDate + SignData → sends to client
 *   2. Client opens NicePay popup via SDK with order + signature
 *   3. NicePay POSTs the auth result to ReturnURL (our /payment/return)
 *   4. Server approves by POSTing to NextAppURL (we receive this in the
 *      auth result; for sandbox MIDs it is webapi.nicepay.co.kr)
 *   5. Server validates approval and marks order paid
 */

import { createHash } from "node:crypto";

const env = process.env;

export const nicepayConfig = {
  mid: env.NICEPAY_MID ?? "",
  merchantKey: env.NICEPAY_MERCHANT_KEY ?? "",
  sid: env.NICEPAY_SID ?? "",
  /** Public, exposed to the client. */
  publicMid: env.NEXT_PUBLIC_NICEPAY_MID ?? "",
  /** Public site URL — used to build absolute callback URLs. */
  siteUrl: env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3737",
};

export function isConfigured() {
  return Boolean(nicepayConfig.mid && nicepayConfig.merchantKey);
}

/** EdiDate format mandated by NicePay: yyyyMMddHHmmss (Korea time). */
export function ediDateNow(): string {
  const now = new Date();
  // NicePay expects KST; Date::toLocaleString gives us the parts we want.
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC + 9
  const y = kst.getUTCFullYear();
  const m = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const d = String(kst.getUTCDate()).padStart(2, "0");
  const h = String(kst.getUTCHours()).padStart(2, "0");
  const min = String(kst.getUTCMinutes()).padStart(2, "0");
  const s = String(kst.getUTCSeconds()).padStart(2, "0");
  return `${y}${m}${d}${h}${min}${s}`;
}

function sha256Hex(input: string): string {
  return createHash("sha256").update(input, "utf8").digest("hex");
}

/**
 * Sign for the *initial* authentication request (popup → goPay).
 * Formula: SHA256( EdiDate + MID + Amt + MerchantKey )
 */
export function signAuth({
  ediDate,
  amt,
}: {
  ediDate: string;
  amt: number;
}): string {
  return sha256Hex(
    `${ediDate}${nicepayConfig.mid}${amt}${nicepayConfig.merchantKey}`,
  );
}

/**
 * Sign for the *server-side approve* step.
 * Formula: SHA256( AuthToken + MID + Amt + EdiDate + MerchantKey )
 */
export function signApprove({
  authToken,
  ediDate,
  amt,
}: {
  authToken: string;
  ediDate: string;
  amt: number;
}): string {
  return sha256Hex(
    `${authToken}${nicepayConfig.mid}${amt}${ediDate}${nicepayConfig.merchantKey}`,
  );
}

/**
 * Server-side: POST to NicePay's NextAppURL to finalize the payment.
 * `nextAppUrl` is provided in the auth-result POST from NicePay.
 */
export async function approveAtNicePay(params: {
  nextAppUrl: string;
  authToken: string;
  tid: string;
  amt: number;
}): Promise<{
  ResultCode: string;
  ResultMsg: string;
  TID?: string;
  Amt?: string;
  MID?: string;
  Moid?: string;
  Signature?: string;
  AuthCode?: string;
  AuthDate?: string;
  CardCode?: string;
  CardName?: string;
  CardNum?: string;
  CardQuota?: string;
  PayMethod?: string;
  [k: string]: unknown;
}> {
  const ediDate = ediDateNow();
  const signData = signApprove({
    authToken: params.authToken,
    ediDate,
    amt: params.amt,
  });

  const body = new URLSearchParams({
    TID: params.tid,
    AuthToken: params.authToken,
    MID: nicepayConfig.mid,
    Amt: String(params.amt),
    EdiDate: ediDate,
    CharSet: "utf-8",
    EdiType: "JSON",
    SignData: signData,
  });

  const res = await fetch(params.nextAppUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    cache: "no-store",
  });
  const text = await res.text();
  // NicePay returns either JSON (when EdiType=JSON) or query-string.
  try {
    return JSON.parse(text);
  } catch {
    return Object.fromEntries(new URLSearchParams(text)) as {
      ResultCode: string;
      ResultMsg: string;
    };
  }
}
