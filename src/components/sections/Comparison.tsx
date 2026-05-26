import { Check, X } from "lucide-react";

const rows = [
  { label: "보증금 없음", us: true, others: false },
  { label: "월 정액 한 가지 (관리비 0원)", us: true, others: false },
  { label: "임대차계약서 즉시 발급", us: true, others: false },
  { label: "전국 지점 자유 이전", us: true, others: false },
  { label: "통신판매·식품 인허가 지원", us: true, others: "일부" },
  { label: "우편물 알림톡 실시간 안내", us: true, others: false },
  { label: "사업자등록 반려 시 무료 재신청", us: true, others: false },
];

export function Comparison() {
  return (
    <section className="bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
          <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
            Why ZakSimSpace
          </p>
          <h2 className="text-[28px] lg:text-[40px] font-extrabold text-ink-900 leading-[1.25] tracking-tight">
            작심스페이스만의
            <br />
            <span className="text-sage-600">계약 방식과 운영관리</span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-[0_18px_60px_-30px_rgba(12,18,25,0.25)]">
          {/* Head */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr]">
            <div className="px-6 py-5 bg-cream-50 border-b border-ink-100">
              <p className="text-[12px] text-ink-400">비교 항목</p>
            </div>
            <div className="px-4 py-5 bg-sage-600 text-white border-b border-sage-700 text-center">
              <p className="text-[11px] text-sage-100 tracking-widest font-semibold">
                ZAKSIM·SPACE
              </p>
              <p className="text-[15px] font-bold mt-0.5">작심스페이스</p>
            </div>
            <div className="px-4 py-5 bg-cream-50 border-b border-ink-100 text-center">
              <p className="text-[11px] text-ink-400 tracking-widest font-semibold">
                OTHERS
              </p>
              <p className="text-[15px] font-bold text-ink-700 mt-0.5">일반 비상주</p>
            </div>
          </div>

          {/* Rows */}
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-[1.4fr_1fr_1fr] items-center ${
                i % 2 === 0 ? "bg-white" : "bg-cream-50/50"
              }`}
            >
              <div className="px-6 py-4 border-t border-ink-100 text-[13.5px] lg:text-[14px] text-ink-700 font-medium">
                {r.label}
              </div>
              <div className="px-4 py-4 border-t border-sage-200/50 bg-sage-50 flex items-center justify-center">
                {r.us ? (
                  <div className="w-7 h-7 rounded-full bg-sage-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <X className="w-4 h-4 text-ink-300" strokeWidth={2.5} />
                )}
              </div>
              <div className="px-4 py-4 border-t border-ink-100 flex items-center justify-center">
                {r.others === true ? (
                  <Check className="w-4 h-4 text-ink-400" strokeWidth={2.5} />
                ) : r.others === false ? (
                  <X className="w-4 h-4 text-ink-300" strokeWidth={2.5} />
                ) : (
                  <span className="text-[12px] font-semibold text-ink-400">
                    {r.others}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
