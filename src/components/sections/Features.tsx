import { ShieldCheck, Bell, Building2, Wallet } from "lucide-react";

const concerns = [
  {
    icon: ShieldCheck,
    worry: "혹시 사업자등록 반려되는 거 아냐?",
    answer: "관할 세무서 심사를 통과한 지점만 운영해요. 평균 승인률 98.4%.",
    metric: "98.4%",
    metricLabel: "승인률",
  },
  {
    icon: Building2,
    worry: "통신판매·식품·운송도 가능한가요?",
    answer: "인허가 업종별 지원 지점을 별도 안내합니다. 30+ 업종 케어.",
    metric: "30+",
    metricLabel: "인허가 업종",
  },
  {
    icon: Bell,
    worry: "내 우편물, 분실되면 어떡하지?",
    answer: "도착 즉시 사진 + 카카오 알림톡. 마이페이지에서도 실시간 확인.",
    metric: "24시간",
    metricLabel: "알림 평균",
  },
  {
    icon: Wallet,
    worry: "혹시 숨겨진 비용이 있나요?",
    answer: "보증금·관리비·갱신비 0원. 월 정액 한 가지만 청구해요.",
    metric: "₩20,000~",
    metricLabel: "월 이용료",
  },
];

export function Features() {
  return (
    <section className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
            We care
          </p>
          <h2 className="text-[30px] lg:text-[40px] font-extrabold text-ink-900 leading-[1.25] tracking-tight">
            한 번쯤은 고민해봤던 걱정들
            <br />
            <span className="text-sage-600">작심스페이스 본사가 직접 케어</span>
            합니다
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {concerns.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.worry}
                className="group relative rounded-2xl bg-white border border-ink-100 p-6 lg:p-7 transition-all hover:border-sage-300 hover:shadow-[0_18px_40px_-20px_rgba(12,18,25,0.18)] hover:-translate-y-0.5 duration-300"
              >
                {/* Worry pill */}
                <div className="inline-flex items-center rounded-full bg-cream-100 px-3 py-1 mb-5">
                  <span className="text-[11.5px] font-semibold text-ink-500">
                    이런 걱정이라면?
                  </span>
                </div>

                {/* Worry quote */}
                <p className="text-[15.5px] lg:text-[16px] font-bold text-ink-900 leading-snug">
                  “{c.worry}”
                </p>

                {/* Answer */}
                <p className="mt-4 text-[13.5px] leading-[1.7] text-ink-500">
                  {c.answer}
                </p>

                {/* Footer with icon + metric */}
                <div className="mt-6 pt-5 border-t border-dashed border-ink-100 flex items-end justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-center group-hover:bg-sage-100 transition-colors">
                    <Icon className="w-4.5 h-4.5 text-sage-700" strokeWidth={2} />
                  </div>
                  <div className="text-right">
                    <p className="text-[18px] font-extrabold text-ink-900 tnum leading-none">
                      {c.metric}
                    </p>
                    <p className="text-[11px] text-ink-400 mt-1">{c.metricLabel}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
