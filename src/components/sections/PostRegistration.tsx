import { Calendar, Mail, BellRing, RefreshCw } from "lucide-react";

export function PostRegistration() {
  return (
    <section className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 lg:mb-16">
          <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
            Step 02 · 계약 이후
          </p>
          <h2 className="text-[30px] lg:text-[44px] font-extrabold text-ink-900 leading-[1.2] tracking-tight">
            사업자 등록 후에도
            <br />
            <span className="text-navy-600">작심스페이스가 챙겨드려요</span>
          </h2>
          <p className="mt-5 text-[15.5px] lg:text-[17px] leading-[1.7] text-ink-500 max-w-xl">
            우편물·계약 갱신·세무서 안내까지 — 매번 신경 쓰지 않아도 작심스페이스가
            먼저 알려드립니다.
          </p>
        </div>

        {/* Reverse grid: mockup left, list right */}
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Left: calendar mockup */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-100/60 to-navy-100/50 rounded-[28px] blur-2xl" />
            <div className="relative rounded-3xl bg-white border border-ink-100 shadow-[0_30px_80px_-30px_rgba(12,18,25,0.35)] p-6 lg:p-7">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-[14px] font-bold text-ink-900">2026년 6월</p>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-md border border-ink-100 text-ink-400 text-xs">
                    ‹
                  </button>
                  <button className="w-7 h-7 rounded-md border border-ink-100 text-ink-400 text-xs">
                    ›
                  </button>
                </div>
              </div>

              {/* Day labels */}
              <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10.5px] text-ink-400">
                {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              {/* Calendar cells */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 30 }, (_, i) => {
                  const day = i + 1;
                  const highlight = day === 14;
                  const dot = [7, 18, 24].includes(day);
                  return (
                    <div
                      key={day}
                      className={`aspect-square rounded-md flex flex-col items-center justify-center text-[11.5px] font-medium relative ${
                        highlight
                          ? "bg-navy-600 text-white"
                          : "bg-cream-50 text-ink-700 hover:bg-cream-100"
                      }`}
                    >
                      <span>{day}</span>
                      {dot && !highlight && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-400" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Event */}
              <div className="mt-5 rounded-xl bg-navy-50 border border-navy-200 px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" strokeWidth={2.2} />
                </div>
                <div className="flex-1">
                  <p className="text-[12.5px] font-bold text-ink-900">
                    계약 갱신 예정 · 6월 14일
                  </p>
                  <p className="text-[11.5px] text-ink-500 mt-0.5">
                    영업일 기준 7일 전부터 알림톡으로 안내
                  </p>
                </div>
                <button className="rounded-full bg-white border border-navy-300 text-navy-700 text-[11px] font-semibold px-3 py-1.5">
                  자동 갱신
                </button>
              </div>
            </div>

            {/* Floating mail chip */}
            <div className="absolute -top-4 -right-3 lg:-right-6 rounded-2xl bg-white border border-ink-100 shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-[11px] text-ink-400">방금 도착한 우편물</p>
                <p className="text-[12.5px] font-bold text-ink-900">국세청 안내문</p>
              </div>
            </div>
          </div>

          {/* Right: list */}
          <ul className="space-y-4 order-1 lg:order-2">
            {[
              {
                icon: BellRing,
                title: "우편물 도착 즉시 알림",
                desc: "봉투 사진과 함께 카카오 알림톡 — 중요한 서류를 놓치지 않아요.",
              },
              {
                icon: Calendar,
                title: "계약 갱신 자동 안내",
                desc: "만료 7일 전부터 알림. 자동 갱신·해지 모두 마이페이지에서.",
              },
              {
                icon: Mail,
                title: "스캔·우편 전달 부가 서비스",
                desc: "내용물 스캔, 지정 주소로 택배 발송까지 신청 가능.",
              },
              {
                icon: RefreshCw,
                title: "지점 이전·정정도 1분",
                desc: "이용 중 다른 지점으로 옮기고 사업자등록증 정정 안내까지.",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.title}
                  className="rounded-2xl bg-white border border-ink-100 p-5 lg:p-6 flex gap-4 hover:border-navy-300 transition-colors"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-amber-500" strokeWidth={2.2} />
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
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
