import type { Metadata } from "next";
import { Inbox } from "lucide-react";

export const metadata: Metadata = { title: "우편물" };
export const dynamic = "force-dynamic";

export default function MailPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-7">
        <header className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-extrabold text-ink-900">
            도착 우편물 (0)
          </h2>
        </header>

        <div className="rounded-2xl border border-dashed border-cream-200 px-5 py-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream-100 mb-3">
            <Inbox className="w-4 h-4 text-ink-500" strokeWidth={2} />
          </div>
          <p className="text-[14px] font-extrabold text-ink-900">
            아직 도착한 우편물이 없어요
          </p>
          <p className="mt-1.5 text-[12.5px] text-ink-500 leading-[1.7]">
            지점에 우편물이 도착하면 본사 운영팀이 스캔해 여기에 올려드려요.
            <br />
            스캔본 확인·실물 발송 신청도 이곳에서 할 수 있어요.
          </p>
        </div>
      </section>
    </div>
  );
}
