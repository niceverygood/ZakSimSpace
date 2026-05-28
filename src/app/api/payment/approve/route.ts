import { NextResponse } from "next/server";
import { approveAtNicePay, isConfigured } from "@/lib/nicepay";
import { getOrder, updateOrder } from "@/lib/orders";

export const dynamic = "force-dynamic";

type Body = {
  nextAppUrl: string;
  authToken: string;
  tid: string;
  moid: string;
  amt: number;
};

export async function POST(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "NicePay 환경 변수가 설정되지 않았어요." },
      { status: 500 },
    );
  }

  const body = (await req.json()) as Partial<Body>;
  const { nextAppUrl, authToken, tid, moid, amt } = body;

  if (!nextAppUrl || !authToken || !tid || !moid || amt == null) {
    return NextResponse.json(
      { error: "필수 파라미터가 비어 있어요." },
      { status: 400 },
    );
  }

  // Cross-check against our stored order (replay/tamper protection).
  const order = await getOrder(moid);
  if (!order) {
    return NextResponse.json(
      { error: "주문을 찾을 수 없어요. 다시 시도해 주세요." },
      { status: 404 },
    );
  }
  if (order.amount !== Number(amt)) {
    await updateOrder(moid, { status: "failed", failReason: "amount mismatch" });
    return NextResponse.json(
      { error: "결제 금액이 주문과 일치하지 않아요." },
      { status: 400 },
    );
  }

  let result: Awaited<ReturnType<typeof approveAtNicePay>>;
  try {
    result = await approveAtNicePay({
      nextAppUrl,
      authToken,
      tid,
      amt: order.amount,
    });
  } catch (e) {
    await updateOrder(moid, {
      status: "failed",
      failReason: e instanceof Error ? e.message : "approve fetch failed",
    });
    return NextResponse.json(
      { error: "NicePay 승인 요청이 실패했어요." },
      { status: 502 },
    );
  }

  if (result.ResultCode !== "3001" && result.ResultCode !== "0000") {
    // 3001 = 카드 인증성공 (NicePay v1), 0000 = 정상 승인.
    await updateOrder(moid, {
      status: "failed",
      failReason: result.ResultMsg ?? `code ${result.ResultCode}`,
    });
    return NextResponse.json(
      { error: result.ResultMsg ?? "결제가 거절되었어요.", code: result.ResultCode },
      { status: 402 },
    );
  }

  await updateOrder(moid, {
    status: "paid",
    tid: typeof result.TID === "string" ? result.TID : tid,
    authDate: typeof result.AuthDate === "string" ? result.AuthDate : undefined,
    cardName: typeof result.CardName === "string" ? result.CardName : undefined,
    cardNum: typeof result.CardNum === "string" ? result.CardNum : undefined,
  });

  return NextResponse.json({ ok: true, moid });
}
