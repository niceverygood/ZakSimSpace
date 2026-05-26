import { Check, MapPin, FileText, Sparkles } from "lucide-react";

export function Process() {
  return (
    <section className="bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 lg:mb-16">
          <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
            Step 01 · 계약 → 등록
          </p>
          <h2 className="text-[30px] lg:text-[44px] font-extrabold text-ink-900 leading-[1.2] tracking-tight">
            주소지 계약 후 바로
            <br />
            <span className="text-navy-600">간편 사업자 등록 신청</span>까지
          </h2>
          <p className="mt-5 text-[15.5px] lg:text-[17px] leading-[1.7] text-ink-500 max-w-xl">
            마이페이지에 표시된 임대차계약서를 그대로 첨부하면, 홈택스 사업자등록
            신청이 5분 안에 끝납니다.
          </p>
        </div>

        {/* Grid: feature list + product mockup */}
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
          {/* Left: feature bullets */}
          <ol className="space-y-5">
            {[
              {
                no: "01",
                title: "전국 지점 중에서 원하는 주소지 선택",
                desc: "인허가 업종 / 지역 필터로 적합한 지점을 1분 안에 찾아요.",
              },
              {
                no: "02",
                title: "결제 즉시 임대차계약서 자동 발급",
                desc: "PDF·전자서명 모두 지원. 곧바로 사업자등록 신청에 사용해요.",
              },
              {
                no: "03",
                title: "사업자등록 진행 상황 실시간 트래킹",
                desc: "심사 결과·반려 사유까지 알림톡으로 안내해 드립니다.",
              },
            ].map((s) => (
              <li
                key={s.no}
                className="rounded-2xl bg-white border border-ink-100 p-5 lg:p-6 flex gap-4 hover:border-navy-300 transition-colors"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-navy-50 border border-navy-200 flex items-center justify-center font-extrabold text-navy-700 tnum text-[14px]">
                  {s.no}
                </div>
                <div>
                  <p className="text-[15.5px] font-bold text-ink-900 leading-snug">
                    {s.title}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-[1.7] text-ink-500">
                    {s.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Right: product UI mockup */}
          <div className="relative">
            {/* Backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-br from-navy-100/60 to-amber-100/40 rounded-[28px] blur-2xl" />

            {/* Browser card */}
            <div className="relative rounded-3xl bg-white border border-ink-100 shadow-[0_30px_80px_-30px_rgba(12,18,25,0.35)] overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-100 bg-cream-50">
                <span className="w-2.5 h-2.5 rounded-full bg-ink-100" />
                <span className="w-2.5 h-2.5 rounded-full bg-ink-100" />
                <span className="w-2.5 h-2.5 rounded-full bg-ink-100" />
                <div className="mx-auto rounded-md bg-white border border-ink-100 px-3 py-1 text-[11px] text-ink-400">
                  zaksimspace.com / 주소지 신청
                </div>
              </div>

              {/* App body */}
              <div className="p-5 lg:p-7 grid gap-4">
                {/* Search */}
                <div className="rounded-xl border border-ink-100 px-4 py-3 flex items-center gap-3 bg-cream-50">
                  <MapPin className="w-4 h-4 text-navy-600" strokeWidth={2.2} />
                  <span className="text-[13px] text-ink-700 font-medium">
                    서울 강남 / 통신판매업 가능
                  </span>
                  <span className="ml-auto text-[11px] text-ink-400">결과 24곳</span>
                </div>

                {/* Result cards */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "강남 테헤란점", price: "₩22,000", hot: true },
                    { name: "역삼 N센터", price: "₩24,000", hot: false },
                  ].map((b) => (
                    <div
                      key={b.name}
                      className="rounded-xl border border-ink-100 p-3.5 bg-white"
                    >
                      <div className="w-full aspect-[16/9] rounded-lg bg-gradient-to-br from-navy-200 to-navy-400 mb-3 relative overflow-hidden">
                        <div className="absolute inset-2 rounded-md bg-white/30 backdrop-blur-sm" />
                        {b.hot && (
                          <span className="absolute top-2 left-2 text-[10px] font-bold bg-amber-300 text-ink-900 rounded-full px-2 py-0.5">
                            HOT
                          </span>
                        )}
                      </div>
                      <p className="text-[12.5px] font-bold text-ink-900">
                        {b.name}
                      </p>
                      <p className="text-[12px] text-navy-700 font-extrabold tnum mt-0.5">
                        월 {b.price}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA bar */}
                <div className="rounded-xl bg-navy-600 px-4 py-3.5 flex items-center justify-between">
                  <span className="text-[13px] text-white font-semibold">
                    선택한 지점으로 계약 진행
                  </span>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-navy-700">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                </div>

                {/* Status row */}
                <div className="rounded-xl border border-dashed border-navy-300 bg-navy-50 px-4 py-3 flex items-center gap-3">
                  <FileText className="w-4 h-4 text-navy-700" strokeWidth={2.2} />
                  <p className="text-[12.5px] text-navy-700 font-semibold">
                    임대차계약서가 자동 발급되었어요
                  </p>
                  <Sparkles className="w-4 h-4 text-amber-400 ml-auto" />
                </div>
              </div>
            </div>

            {/* Floating chip */}
            <div className="absolute -bottom-5 -left-3 lg:-left-6 rounded-2xl bg-white border border-ink-100 shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-navy-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
              <div>
                <p className="text-[11px] text-ink-400">사업자등록 신청</p>
                <p className="text-[13px] font-bold text-ink-900">완료까지 평균 2.4일</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
