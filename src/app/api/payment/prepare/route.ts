import { NextResponse } from "next/server";
import { formatKRW } from "@/lib/contract-data";
import { findBranch, resolvePrice } from "@/lib/branches-loader";
import {
  ediDateNow,
  isConfigured,
  nicepayConfig,
  signAuth,
} from "@/lib/nicepay";
import { createOrder } from "@/lib/orders";

export const dynamic = "force-dynamic";

type Body = {
  branchId: string;
  cycle: "yearly" | "monthly";
  months?: number;
  bizType?: string;
  startDate?: string;
  industry?: string;
  buyerName: string;
  buyerEmail: string;
  buyerTel: string;
};

const TERM_MONTHS = [3, 6, 12, 24] as const;
type Term = (typeof TERM_MONTHS)[number];

export async function POST(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "NicePay 환경 변수가 설정되지 않았어요." },
      { status: 500 },
    );
  }

  const body = (await req.json()) as Partial<Body>;
  const { branchId, cycle, buyerName, buyerEmail, buyerTel } = body;

  if (!branchId || !cycle || !buyerName || !buyerEmail || !buyerTel) {
    return NextResponse.json(
      { error: "필수 입력값이 비어 있어요." },
      { status: 400 },
    );
  }

  const branch = await findBranch(branchId);
  if (!branch) {
    return NextResponse.json({ error: "지점을 찾을 수 없어요." }, { status: 404 });
  }

  const bizType = body.bizType === "법인" ? "법인" : "개인";
  const months: number = TERM_MONTHS.includes(body.months as Term)
    ? (body.months as Term)
    : cycle === "yearly"
      ? 12
      : 1;

  // Server computes the amount (never trust the client) from the live price
  // table so 3/6/24개월 and 개인/법인 are all priced correctly.
  const amount =
    months === 1
      ? branch.monthlyPrice
      : await resolvePrice(branch, bizType, months as Term);

  const goodsName = `${branch.name} ${months}개월 이용료`.slice(0, 40);

  // Persist the order before showing the popup so we can validate the
  // approved amount/Moid in the return handler.
  const order = await createOrder({
    branchId,
    branchName: branch.name,
    branchAddr: branch.address,
    amount,
    cycle,
    months,
    bizType,
    startDate: body.startDate,
    industry: body.industry,
    buyerName,
    buyerEmail,
    buyerTel,
  });

  const ediDate = ediDateNow();
  const signData = signAuth({ ediDate, amt: amount });

  return NextResponse.json({
    mid: nicepayConfig.publicMid,
    moid: order.moid,
    amount,
    amountLabel: formatKRW(amount),
    goodsName,
    buyerName,
    buyerEmail,
    buyerTel,
    ediDate,
    signData,
    returnUrl: `${nicepayConfig.siteUrl}/payment/return`,
  });
}
