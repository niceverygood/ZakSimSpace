import { ImageResponse } from "next/og";
import { branches, formatKRW } from "@/lib/contract-data";

export const alt = "작심스페이스 지점";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata() {
  return branches.map((b) => ({ id: b.id, alt: b.name, size, contentType }));
}

export default async function BranchOG({
  params,
}: {
  params: { id: string };
}) {
  const branch = branches.find((b) => b.id === params.id);

  if (!branch) {
    return new ImageResponse(
      (
        <div style={{
          width: "100%", height: "100%", background: "#f6f2e7",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 48, color: "#161d27", fontFamily: "sans-serif",
        }}>
          지점을 찾을 수 없어요
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #d8e0ed 0%, #f6f2e7 60%, #fceac0 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#161d27", fontSize: 24, fontWeight: 800 }}>ZAKSIM</span>
          <span style={{ color: "#233d68", fontSize: 24, fontWeight: 800 }}>·</span>
          <span style={{ color: "#161d27", fontSize: 24, fontWeight: 800 }}>SPACE</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              background: "#ffffff",
              color: "#233d68",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 22,
              fontWeight: 700,
              border: "2px solid #b3c1d6",
            }}
          >
            📍 {branch.region}
          </div>
          <h1
            style={{
              color: "#0c1219",
              fontSize: 96,
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {branch.name}
          </h1>
          <p style={{ color: "#4a5868", fontSize: 28, margin: 0 }}>
            {branch.address}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
            <span style={{ color: "#233d68", fontSize: 64, fontWeight: 900 }}>
              {formatKRW(branch.monthlyPrice)}
            </span>
            <span style={{ color: "#6d7c8b", fontSize: 24, fontWeight: 600 }}>
              / 월
            </span>
          </div>
          <div
            style={{
              background: "#0c1219",
              color: "#ffffff",
              borderRadius: 999,
              padding: "14px 28px",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            지금 계약 시작 →
          </div>
        </div>
      </div>
    ),
    size,
  );
}
