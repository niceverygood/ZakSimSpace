import { NextResponse } from "next/server";
import { branches, formatKRW } from "@/lib/contract-data";
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
  buyerName: string;
  buyerEmail: string;
  buyerTel: string;
};

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

  const branch = branches.find((b) => b.id === branchId);
  if (!branch) {
    return NextResponse.json({ error: "지점을 찾을 수 없어요." }, { status: 404 });
  }

  const amount =
    cycle === "yearly" ? branch.yearlyPrice : branch.monthlyPrice;
  const goodsName =
    `${branch.name} ${cycle === "yearly" ? "연간" : "월간"} 이용료`.slice(
      0,
      40,
    );

  // Persist the order before showing the popup so we can validate the
  // approved amount/Moid in the return handler.
  const order = await createOrder({
    branchId,
    branchName: branch.name,
    amount,
    cycle,
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
