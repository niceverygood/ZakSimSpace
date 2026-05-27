import { NextResponse } from "next/server";
import {
  ediDateNow,
  isConfigured,
  nicepayConfig,
  signAuth,
} from "@/lib/nicepay";
import { createOrder } from "@/lib/orders";
import { formatKRW } from "@/lib/contract-data";

export const dynamic = "force-dynamic";

type Body = {
  amount: number;
  buyerName: string;
  buyerEmail: string;
  buyerTel: string;
};

const ALLOWED_AMOUNTS = new Set([100, 500, 1000]);

export async function POST(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "NicePay 환경 변수가 설정되지 않았어요." },
      { status: 500 },
    );
  }

  const body = (await req.json()) as Partial<Body>;
  const { amount, buyerName, buyerEmail, buyerTel } = body;

  if (!amount || !ALLOWED_AMOUNTS.has(amount)) {
    return NextResponse.json(
      {
        error: "테스트 결제는 100원 / 500원 / 1,000원만 허용됩니다.",
      },
      { status: 400 },
    );
  }
  if (!buyerName || !buyerEmail || !buyerTel) {
    return NextResponse.json(
      { error: "결제자 정보가 비어 있어요." },
      { status: 400 },
    );
  }

  const order = createOrder({
    branchId: "TEST",
    branchName: "[테스트 결제]",
    amount,
    cycle: "monthly",
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
    goodsName: `작심스페이스 결제 연동 테스트 (${formatKRW(amount)})`,
    buyerName,
    buyerEmail,
    buyerTel,
    ediDate,
    signData,
    returnUrl: `${nicepayConfig.siteUrl}/payment/return`,
  });
}
