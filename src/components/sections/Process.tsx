import { Check } from "lucide-react";

const steps = [
  {
    no: "1",
    title: "계약 주소지/기간 선택",
    desc: "원하는 지점/계약 기간을 선택하고 결제를 완료하면 임대차계약서가 즉시 발급됩니다.",
  },
  {
    no: "2",
    title: "사업자 등록 신청",
    desc: "마이페이지에 표시된 임대차계약서를 첨부해 홈택스에 사업자등록을 신청합니다.",
  },
  {
    no: "3",
    title: "사업자 등록 진행/신청 완료",
    desc: "심사 진행 상황을 안내드리며 승인 즉시 사업장 운영이 가능합니다.",
  },
];

export function Process() {
  return (
    <section className="bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
            사업자 등록 신청
          </p>
          <h2 className="text-[30px] lg:text-[40px] font-extrabold text-ink-900 leading-[1.2] tracking-tight">
            주소지 계약 후 바로
            <br />
            <span className="text-amber-500">간편 사업자 등록 신청까지</span>
          </h2>
          <p className="mt-5 text-[14.5px] lg:text-[16px] leading-[1.75] text-ink-500">
            사업자 등록 신청? 걱정마세요!
            <br />
            바로 여기서! 사업자 신청까지! 한번에 끝내세요.
          </p>
        </div>

        {/* 4-step flow */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[34px] left-[12%] right-[12%] h-px border-t-2 border-dashed border-navy-200"
          />

          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 relative">
            {steps.map((s, idx) => (
              <li key={s.no} className="relative">
                {/* Number badge */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="relative z-10 w-[68px] h-[68px] rounded-full bg-navy-600 text-white flex items-center justify-center text-[22px] font-extrabold shadow-[0_12px_30px_-8px_rgba(35,61,104,0.45)]">
                    {idx === steps.length - 1 ? (
                      <Check className="w-7 h-7" strokeWidth={2.5} />
                    ) : (
                      s.no
                    )}
                  </div>
                  <span className="text-[11.5px] font-bold tracking-wider text-navy-700 uppercase tnum">
                    Step {s.no}
                  </span>
                </div>
                <h3 className="text-[16.5px] lg:text-[17.5px] font-bold text-ink-900 leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.7] text-ink-500">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
