import { ImageResponse } from "next/og";

export const alt = "작심스페이스 · 결심을 사업장으로";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function HomeOG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #f6f2e7 0%, #dfeadc 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#161d27", fontSize: 28, fontWeight: 800 }}>
            ZAKSIM
          </span>
          <span style={{ color: "#43693f", fontSize: 28, fontWeight: 800 }}>
            ·
          </span>
          <span style={{ color: "#161d27", fontSize: 28, fontWeight: 800 }}>
            SPACE
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ color: "#43693f", fontSize: 24, fontWeight: 600, margin: 0 }}>
            월 20,000원부터 시작하는 합법 사업장
          </p>
          <h1
            style={{
              color: "#0c1219",
              fontSize: 104,
              fontWeight: 900,
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: -2,
            }}
          >
            결심을
            <br />
            <span style={{ color: "#43693f" }}>사업장으로</span>
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ color: "#4a5868", fontSize: 22, margin: 0 }}>
            전국 180+ 직영점 · 사업자등록부터 우편물 관리까지
          </p>
          <div
            style={{
              background: "#43693f",
              color: "#ffffff",
              borderRadius: 999,
              padding: "14px 28px",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            zaksimspace.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
