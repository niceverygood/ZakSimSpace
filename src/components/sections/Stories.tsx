"use client";

import { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const stories = [
  {
    name: "박세영 대표",
    role: "온라인 셀러 · 2년차",
    quote:
      "보증금 없이 강남 주소지로 사업자등록을 마쳤고, 통신판매업 신고까지 일주일 만에 끝냈어요.",
    tag: "통신판매업",
    accent: "from-sage-500 to-sage-700",
  },
  {
    name: "김도윤 대표",
    role: "1인 컨설팅 · 3개월차",
    quote:
      "처음엔 비상주가 가능할까 걱정했는데, 우편물 알림과 스캔 서비스까지 알아서 챙겨줘서 편해요.",
    tag: "교육 컨설팅",
    accent: "from-amber-300 to-amber-500",
  },
  {
    name: "이수민 대표",
    role: "푸드 D2C · 1년차",
    quote:
      "식품 인허가가 가능한 지점을 직접 안내받았어요. 전국 어디에 있어도 입점이 너무 쉬웠습니다.",
    tag: "식품 D2C",
    accent: "from-ink-700 to-ink-900",
  },
];

export function Stories() {
  const [idx, setIdx] = useState(0);
  const story = stories[idx];

  return (
    <section className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
            Success Stories
          </p>
          <h2 className="text-[30px] lg:text-[40px] font-extrabold text-ink-900 leading-[1.25] tracking-tight">
            먼저 시작한 대표님의
            <br />
            <span className="text-sage-600">성공 사례</span>로 증명합니다
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
            {/* Video poster */}
            <div
              className={cn(
                "relative rounded-3xl overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[420px]",
                "bg-gradient-to-br",
                story.accent
              )}
            >
              {/* Decorative grid */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:36px_36px]"
              />
              {/* Glow */}
              <div className="absolute -bottom-20 -right-20 w-[280px] h-[280px] rounded-full bg-white/15 blur-3xl" />
              {/* Avatar disc */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center">
                  <button
                    type="button"
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white text-ink-900 flex items-center justify-center shadow-[0_18px_40px_-12px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform"
                    aria-label="영상 재생"
                  >
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </button>
                </div>
              </div>
              {/* Tag */}
              <div className="absolute top-5 left-5 inline-flex items-center rounded-full bg-white/25 backdrop-blur border border-white/30 px-3 py-1 text-[12px] font-semibold text-white">
                {story.tag}
              </div>
              {/* Name plate */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-[18px] lg:text-[20px] font-bold">{story.name}</p>
                <p className="text-[12.5px] text-white/85">{story.role}</p>
              </div>
            </div>

            {/* Quote card */}
            <div className="rounded-3xl bg-white border border-ink-100 p-8 lg:p-10 flex flex-col justify-between shadow-[0_12px_40px_-20px_rgba(12,18,25,0.18)]">
              <div>
                <p className="text-sage-500 text-[40px] leading-none font-serif">“</p>
                <p className="text-[17px] lg:text-[18px] leading-[1.75] text-ink-700 font-medium mt-2">
                  {story.quote}
                </p>
              </div>
              {/* Dot nav */}
              <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {stories.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`사례 ${i + 1}`}
                      onClick={() => setIdx(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        i === idx ? "w-8 bg-sage-600" : "w-3 bg-ink-200"
                      )}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="이전 사례"
                    onClick={() =>
                      setIdx((i) => (i - 1 + stories.length) % stories.length)
                    }
                    className="w-10 h-10 rounded-full border border-ink-200 hover:border-ink-400 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-ink-700" strokeWidth={2.2} />
                  </button>
                  <button
                    type="button"
                    aria-label="다음 사례"
                    onClick={() => setIdx((i) => (i + 1) % stories.length)}
                    className="w-10 h-10 rounded-full bg-ink-900 hover:bg-ink-800 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-white" strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
