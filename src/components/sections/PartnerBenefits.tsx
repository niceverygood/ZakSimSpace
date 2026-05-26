const partners = [
  { name: "Toss Business", tag: "결제 수수료 할인", color: "from-blue-500 to-blue-600" },
  { name: "더벤티", tag: "음료 50% 쿠폰", color: "from-amber-500 to-amber-600" },
  { name: "Notion", tag: "Pro 6개월 무료", color: "from-ink-700 to-ink-900" },
  { name: "샌드박스", tag: "회계 첫 달 무료", color: "from-rose-400 to-rose-500" },
  { name: "쿠팡 비즈", tag: "월 3만원 적립", color: "from-orange-400 to-orange-500" },
  { name: "AWS", tag: "스타트업 크레딧", color: "from-amber-400 to-amber-500" },
  { name: "삼쩜삼", tag: "종합소득세 무료", color: "from-cyan-500 to-cyan-600" },
  { name: "현대카드", tag: "사업자 카드 캐시백", color: "from-ink-800 to-ink-900" },
];

export function PartnerBenefits() {
  return (
    <section className="bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
          <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
            Partner Benefits
          </p>
          <h2 className="text-[28px] lg:text-[40px] font-extrabold text-ink-900 leading-[1.25] tracking-tight">
            연 <span className="text-amber-500">2,200,000원</span> 상당
            <br />
            <span className="text-navy-600">제휴 혜택 서비스</span>
          </h2>
          <p className="mt-5 text-[14.5px] lg:text-[15.5px] text-ink-500 leading-[1.7]">
            결제·세무·SaaS·물류까지 — 작심스페이스 입주만으로 누리는 혜택이에요.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group rounded-2xl bg-white border border-ink-100 p-5 hover:border-navy-300 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 shadow-sm`}
              >
                <span className="text-white text-[11px] font-extrabold">
                  {p.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <p className="text-[14px] font-bold text-ink-900">{p.name}</p>
              <p className="text-[12.5px] text-navy-700 font-semibold mt-1">
                {p.tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
