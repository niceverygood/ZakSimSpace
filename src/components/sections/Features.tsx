import {
  ShieldCheck,
  Camera,
  Mail,
  RefreshCcw,
  HeartHandshake,
  Headphones,
} from "lucide-react";

const concerns = [
  {
    icon: ShieldCheck,
    title: "검증된 임대인만 입점",
    desc: "본사가 직접 공간 실사와 서류를 확인한 임대인만 입점할 수 있어요. 안심하고 계약하세요.",
  },
  {
    icon: Camera,
    title: "실태조사, 본사가 직접 지원",
    desc: "세무서 실태조사 시 현장 세팅부터 사진 촬영까지 본사가 맞춤 지원해요. 처음 겪는 실태조사도 걱정 없어요.",
  },
  {
    icon: Mail,
    title: "우편물 스캔 및 알림톡 발송",
    desc: "도착한 우편물을 즉시 스캔하고 마이페이지에 업로드해 알림톡으로 알려드려요. 중요한 고지서나 관공서 서류를 놓칠 일 없어요.",
  },
  {
    icon: RefreshCcw,
    title: "반려 시 무료 주소지 이전",
    desc: "사업자등록이 반려되더라도 추가 비용 없이 다른 지점으로 주소를 옮겨드려요. 새 주소지로 다시 신청할 수 있어요.",
  },
  {
    icon: HeartHandshake,
    title: "플랫폼 보장제",
    desc: "임대인에게 문제가 생기더라도 작심스페이스가 끝까지 책임져요. 계약 기간 동안 안정적으로 주소를 유지할 수 있어요.",
  },
  {
    icon: Headphones,
    title: "본사 전담팀 직접 상담",
    desc: "외주 없이 작심스페이스 본사 직원이 직접 상담하고 관리해요. 계약부터 운영까지 한 팀이 케어해요.",
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
            한 번쯤은 고민해본 걱정들
            <br />
            <span className="text-amber-500">작심스페이스 본사가 직접 케어</span>
          </h2>
        </div>

        {/* 6 cards grid (확장 가능 구조 — 8개까지) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {concerns.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="group rounded-2xl bg-white border border-ink-100 p-7 lg:p-8 transition-all hover:border-navy-300 hover:shadow-[0_18px_40px_-20px_rgba(12,18,25,0.18)] hover:-translate-y-0.5 duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-navy-50 border border-navy-200 flex items-center justify-center mb-5 group-hover:bg-navy-100 transition-colors">
                  <Icon
                    className="w-4.5 h-4.5 text-navy-700"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-[16.5px] lg:text-[17.5px] font-bold text-ink-900 leading-snug">
                  {c.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-500">
                  {c.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
