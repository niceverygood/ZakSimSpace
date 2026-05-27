"use client";

import { useState } from "react";
import { MapPin, Plus, Minus } from "lucide-react";
import type { Branch } from "@/lib/contract-data";
import { cn } from "@/lib/utils";

/** Approximate map coordinates per region (0-100% on simulated Korea map). */
const regionCoords: Record<string, { x: number; y: number }> = {
  서울: { x: 36, y: 28 },
  인천: { x: 30, y: 30 },
  경기: { x: 40, y: 32 },
  강원: { x: 56, y: 28 },
  충북: { x: 48, y: 42 },
  대구: { x: 60, y: 60 },
  부산: { x: 70, y: 73 },
  광주: { x: 32, y: 72 },
  울산: { x: 72, y: 65 },
};

export function BranchesMap({
  branches,
  selectedId,
  onSelect,
}: {
  branches: Branch[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const [zoom, setZoom] = useState(1);

  // Group branches by their region anchor; nudge pins per index to avoid overlap.
  const placed = branches.map((b, i) => {
    const c = regionCoords[b.region] ?? { x: 50, y: 50 };
    // Tiny deterministic jitter so multiple branches in same region don't stack.
    const angle = (i * 47) % 360;
    const r = 1.8;
    return {
      branch: b,
      x: c.x + Math.cos((angle * Math.PI) / 180) * r,
      y: c.y + Math.sin((angle * Math.PI) / 180) * r,
    };
  });

  return (
    <div className="relative w-full h-full min-h-[480px] rounded-2xl border border-ink-100 bg-gradient-to-br from-cream-100 via-cream-50 to-navy-50 overflow-hidden">
      {/* Stylized Korea shape — single rounded blob with grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(34,40,49,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(34,40,49,0.4)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      {/* Korea outline placeholder (SVG silhouette) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Very rough Korean peninsula shape */}
        <path
          d="M 38 12 Q 28 18 30 30 L 26 40 Q 24 52 30 60 L 28 72 Q 32 84 44 86 L 56 84 Q 66 78 68 68 L 72 56 Q 70 44 64 36 L 60 24 Q 54 14 38 12 Z"
          fill="#d8e0ed"
          stroke="#b3c1d6"
          strokeWidth="0.5"
        />
        {/* Jeju */}
        <ellipse cx="36" cy="93" rx="3" ry="1.5" fill="#d8e0ed" stroke="#b3c1d6" strokeWidth="0.3" />
      </svg>

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 bg-white rounded-xl shadow-md border border-ink-100 p-1">
        <button
          type="button"
          aria-label="지도 확대"
          onClick={() => setZoom((z) => Math.min(2, +(z + 0.2).toFixed(1)))}
          className="w-8 h-8 rounded-lg hover:bg-cream-100 flex items-center justify-center text-ink-700"
        >
          <Plus className="w-4 h-4" strokeWidth={2.2} />
        </button>
        <button
          type="button"
          aria-label="지도 축소"
          onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(1)))}
          className="w-8 h-8 rounded-lg hover:bg-cream-100 flex items-center justify-center text-ink-700"
        >
          <Minus className="w-4 h-4" strokeWidth={2.2} />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur rounded-xl shadow-sm border border-ink-100 px-3 py-2 text-[11px] flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          중심업무지구
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-navy-600" />
          비과밀억제권역
        </span>
      </div>

      {/* Pins layer (scaled) */}
      <div
        className="absolute inset-0 z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        {placed.map(({ branch, x, y }) => {
          const isSelected = selectedId === branch.id;
          const congested = branch.congested;
          return (
            <button
              key={branch.id}
              type="button"
              aria-label={`${branch.name} 핀`}
              onClick={() => onSelect?.(branch.id)}
              className="absolute -translate-x-1/2 -translate-y-full group"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className={cn(
                  "relative w-9 h-9 rounded-full flex items-center justify-center shadow-[0_8px_18px_-6px_rgba(12,18,25,0.45)] transition-all",
                  congested
                    ? "bg-rose-500 text-white"
                    : "bg-navy-600 text-white",
                  isSelected && "ring-4 ring-amber-300 scale-110",
                  "hover:scale-110",
                )}
              >
                <MapPin className="w-4 h-4" strokeWidth={2.5} />
                {/* Pin tip */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45",
                    congested ? "bg-rose-500" : "bg-navy-600",
                  )}
                />
              </div>
              {/* Hover label */}
              <div className="opacity-0 group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 -top-12 whitespace-nowrap bg-ink-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-md transition-opacity pointer-events-none">
                {branch.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="absolute bottom-3 left-3 right-3 text-center text-[10.5px] text-ink-500">
        지도 placeholder — 카카오맵 API 키 적용 시 실 지도로 자동 전환
      </p>
    </div>
  );
}
