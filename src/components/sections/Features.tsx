import {
  Mail,
  ShieldCheck,
  Building2,
  BookOpen,
  Handshake,
  Calculator,
  type LucideIcon,
} from "lucide-react";

type Care = {
  icon: LucideIcon;
  /** Optional 3D icon image (public path). Falls back to the lucide icon. */
  img?: string;
  title: string;
  desc: string;
  note?: string;
};

/** WE CARE 6 cards — copy per client PDF (프로트+어드민 p.4). */
const concerns: Care[] = [
  {
    icon: Mail,
    img: "/icons/usp-mail.png",
    title: "우편물 알림, 도달률 98%",
    desc: "도착한 우편물을 즉시 스캔해 마이페이지에 올리고 알림톡으로 알려드려요.",
  },
  {
    icon: ShieldCheck,
    img: "/icons/usp-refund.png",
    title: "사업자등록 반려 시, 100% 환불 지원",
    desc: "혹시 사업자등록이 반려되더라도 결제 금액을 100% 환불해 드려요.",
  },
  {
    icon: Building2,
    img: "/icons/usp-inspection.png",
    title: "관공서 현장실사 지원",
    desc: "세무서·관공서 현장실사 일정이 잡히면 본사 운영팀이 직접 현장 응대를 지원해요.",
  },
  {
    icon: BookOpen,
    img: "/icons/usp-space.png",
    title: "업무 공간 제공",
    desc: "스터디카페 매월 2시간 이용권을 드려요.",
    note: "*총 6개월 12시간 · 일부 지점에 한하여 제공",
  },
  {
    icon: Handshake,
    img: "/icons/usp-partner.png",
    title: "모두싸인·예스폼 제휴사 할인",
    desc: "전자계약·문서 서비스 제휴사 할인 혜택을 함께 제공해요.",
  },
  {
    icon: Calculator,
    img: "/icons/usp-tax.png",
    title: "사업 단계별 세무 서비스 지원",
    desc: "창업 초기부터 성장 단계까지, 사업 단계에 맞는 세무 서비스를 안내해 드려요.",
  },
];

export function Features() {
  return (
    <section className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
            We care
          </p>
          <h2 className="text-[30px] lg:text-[40px] font-extrabold text-ink-900 leading-[1.25] tracking-tight">
            사업자등록 전 걱정되는 모든 순간
            <br />
            <span className="text-amber-500">작심스페이스가 직접 챙깁니다</span>
          </h2>
          <p className="mt-4 text-[14.5px] text-ink-500">
            한 번쯤은 고민해본 걱정들, 작심스페이스 본사가 직접 케어해 드려요.
          </p>
        </div>

        {/* 6 cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {concerns.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="group rounded-2xl bg-white border border-ink-100 p-7 lg:p-8 transition-all hover:border-navy-300 hover:shadow-[0_18px_40px_-20px_rgba(12,18,25,0.18)] hover:-translate-y-0.5 duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-50 to-cream-100 border border-navy-100 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-navy-600" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-[16.5px] lg:text-[17.5px] font-bold text-ink-900 leading-snug">
                  {c.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-500">
                  {c.desc}
                </p>
                {c.note && (
                  <p className="mt-2 text-[11.5px] text-ink-400">{c.note}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
