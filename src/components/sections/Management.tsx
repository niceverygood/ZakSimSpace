export function Management() {
  return (
    <section className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
          <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
            All in one
          </p>
          <h2 className="text-[28px] lg:text-[40px] font-extrabold text-ink-900 leading-[1.25] tracking-tight">
            이제 하나로 관리해요
            <br />
            <span className="text-navy-600">with 작심스페이스</span>
          </h2>
        </div>

        <div className="flex justify-center">
          {/* Dashboard mockup */}
          <div className="relative w-full max-w-2xl">
            <div className="absolute -inset-4 bg-gradient-to-br from-navy-100/60 to-amber-100/40 rounded-[28px] blur-2xl" />
            <div className="relative rounded-3xl bg-white border border-ink-100 shadow-[0_30px_80px_-30px_rgba(12,18,25,0.35)] overflow-hidden">
              {/* Top */}
              <div className="px-6 py-4 border-b border-ink-100 flex items-center justify-between bg-cream-50">
                <p className="text-[13px] font-bold text-ink-900">대시보드</p>
                <span className="rounded-full bg-navy-600 text-white text-[11px] font-semibold px-2.5 py-1">
                  자동 결제 ON
                </span>
              </div>

              <div className="p-6 grid gap-4">
                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { l: "이용 지점", v: "3" },
                    { l: "월 청구액", v: "₩66K" },
                    { l: "갱신 예정", v: "1" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="rounded-xl border border-ink-100 px-4 py-3 bg-cream-50/60"
                    >
                      <p className="text-[10.5px] text-ink-400">{s.l}</p>
                      <p className="text-[18px] font-extrabold text-ink-900 mt-1 tnum">
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chart-ish bar */}
                <div className="rounded-xl border border-ink-100 p-4">
                  <div className="flex items-end gap-1.5 h-24">
                    {[42, 56, 38, 64, 80, 52, 70, 96, 72, 88, 66, 78].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-navy-400 to-navy-600"
                          style={{ height: `${h}%` }}
                        />
                      ),
                    )}
                  </div>
                  <p className="text-[11px] text-ink-400 mt-3">월별 이용료 추이</p>
                </div>

                {/* Recent list */}
                <div className="rounded-xl border border-ink-100 divide-y divide-ink-100">
                  {[
                    { d: "06.14", l: "강남 테헤란점 갱신", v: "₩22,000" },
                    { d: "06.07", l: "역삼 N센터 결제", v: "₩24,000" },
                  ].map((r) => (
                    <div
                      key={r.l}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <div>
                        <p className="text-[12.5px] text-ink-500 tnum">{r.d}</p>
                        <p className="text-[13px] font-bold text-ink-900 mt-0.5">
                          {r.l}
                        </p>
                      </div>
                      <p className="text-[13px] font-extrabold text-navy-700 tnum">
                        {r.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
