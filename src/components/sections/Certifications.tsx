const certs = [
  { code: "벤처", label: "벤처기업 인증", sub: "중소벤처기업부" },
  { code: "INNO", label: "이노비즈 인증", sub: "기술혁신형 중소기업" },
  { code: "KS", label: "공식 정부 인허가", sub: "전국 사업자등록 지원" },
  { code: "ISO", label: "ISO 27001", sub: "정보보호 관리체계" },
  { code: "K-스타트업", label: "K-Startup 협력사", sub: "정부 창업지원사업" },
];

export function Certifications() {
  return (
    <section className="bg-cream-50 py-20 lg:py-24 border-t border-cream-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
          <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
            Certified Quality
          </p>
          <h2 className="text-[28px] lg:text-[38px] font-extrabold text-ink-900 leading-[1.25] tracking-tight">
            공식 정부 인증 품질로
            <br />
            <span className="text-navy-600">검증된 사업장</span>만 운영합니다
          </h2>
          <p className="mt-5 text-[14.5px] lg:text-[15.5px] text-ink-500 leading-[1.7]">
            벤처기업·이노비즈·ISO 정보보호 관리체계 인증까지 — 안심하고 등록할 수
            있는 이유입니다.
          </p>
        </div>

        {/* Logos row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {certs.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl bg-white border border-ink-100 px-5 py-6 flex flex-col items-center text-center hover:border-navy-300 transition-colors"
            >
              {/* Stylized "badge" */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy-100 to-navy-200 border border-navy-300 flex items-center justify-center mb-3">
                <span className="text-[11px] font-extrabold text-navy-700 tracking-tight">
                  {c.code}
                </span>
              </div>
              <p className="text-[13px] font-bold text-ink-900 leading-tight">
                {c.label}
              </p>
              <p className="text-[11.5px] text-ink-400 mt-1 leading-tight">
                {c.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
