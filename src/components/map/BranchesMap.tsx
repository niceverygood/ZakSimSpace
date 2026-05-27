"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import type { Branch } from "@/lib/contract-data";

declare global {
  interface Window {
    kakao?: KakaoNamespace;
  }
}

type KakaoLatLng = { __brand: "KakaoLatLng"; getLat(): number; getLng(): number };
type KakaoMarkerImage = { __brand: "KakaoMarkerImage" };
type KakaoMap = {
  __brand: "KakaoMap";
  setCenter(latlng: KakaoLatLng): void;
  setLevel(level: number, opts?: { animate?: boolean }): void;
  getLevel(): number;
  panTo(latlng: KakaoLatLng): void;
};
type KakaoMarker = {
  setMap(m: KakaoMap | null): void;
  setImage(img: KakaoMarkerImage): void;
  getPosition(): KakaoLatLng;
};
type KakaoSize = { __brand: "KakaoSize" };
type KakaoPoint = { __brand: "KakaoPoint" };
type KakaoNamespace = {
  maps: {
    load(cb: () => void): void;
    Map: new (el: HTMLElement, opts: { center: KakaoLatLng; level: number }) => KakaoMap;
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    Marker: new (opts: {
      position: KakaoLatLng;
      image?: KakaoMarkerImage;
      clickable?: boolean;
    }) => KakaoMarker;
    MarkerImage: new (
      src: string,
      size: KakaoSize,
      opts?: { offset?: KakaoPoint },
    ) => KakaoMarkerImage;
    Size: new (w: number, h: number) => KakaoSize;
    Point: new (x: number, y: number) => KakaoPoint;
    event: {
      addListener(target: KakaoMarker | KakaoMap, type: string, cb: () => void): void;
    };
    services?: {
      Geocoder: new () => {
        addressSearch(
          q: string,
          cb: (result: { x: string; y: string }[], status: string) => void,
        ): void;
      };
      Status: { OK: string };
    };
  };
};

const KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

/** Pre-resolved region centers, used while addresses are geocoding (instant pins). */
const regionCenter: Record<string, { lat: number; lng: number }> = {
  서울: { lat: 37.5665, lng: 126.978 },
  인천: { lat: 37.4563, lng: 126.7052 },
  경기: { lat: 37.4138, lng: 127.5183 },
  강원: { lat: 37.8228, lng: 128.1555 },
  충북: { lat: 36.6356, lng: 127.4914 },
  대구: { lat: 35.8714, lng: 128.6014 },
  부산: { lat: 35.1796, lng: 129.0756 },
  광주: { lat: 35.1595, lng: 126.8526 },
  울산: { lat: 35.5384, lng: 129.3114 },
};

type Coord = { lat: number; lng: number };

/** Marker SVG (data URI) tinted navy or rose. Rendered once per color. */
function markerDataUri(color: string, selected: boolean): string {
  const ring = selected ? "<circle cx='18' cy='18' r='17' fill='none' stroke='%23fcd34d' stroke-width='3'/>" : "";
  const scale = selected ? 1.12 : 1;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${36 * scale}' height='${46 * scale}' viewBox='0 0 36 46'>${ring}<path d='M18 0C8.06 0 0 8.06 0 18c0 11.6 14.4 25.4 16.4 27.2a2.4 2.4 0 0 0 3.2 0C21.6 43.4 36 29.6 36 18 36 8.06 27.94 0 18 0z' fill='${encodeURIComponent(color)}'/><circle cx='18' cy='18' r='6' fill='white'/></svg>`;
  return `data:image/svg+xml;utf-8,${svg}`;
}

export function BranchesMap({
  branches,
  selectedId,
  onSelect,
}: {
  branches: Branch[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, KakaoMarker>>(new Map());
  const [map, setMap] = useState<KakaoMap | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [errored, setErrored] = useState(false);
  const [coords, setCoords] = useState<Record<string, Coord>>({});

  /** Load the Kakao SDK once across all mounts. */
  useEffect(() => {
    if (!KEY) return;
    if (window.kakao?.maps) {
      setSdkReady(true);
      return;
    }
    const existing = document.getElementById("kakao-maps-sdk") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => setSdkReady(true), { once: true });
      existing.addEventListener("error", () => setErrored(true), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.id = "kakao-maps-sdk";
    s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KEY}&libraries=services&autoload=false`;
    s.async = true;
    s.onload = () => setSdkReady(true);
    s.onerror = () => setErrored(true);
    document.head.appendChild(s);
  }, []);

  /** Seed coords from region centers immediately so pins show without waiting. */
  const seeded = useMemo<Record<string, Coord>>(() => {
    const out: Record<string, Coord> = {};
    branches.forEach((b, i) => {
      const center = regionCenter[b.region] ?? { lat: 36.5, lng: 127.8 };
      // Deterministic jitter so multiple branches in same region don't overlap.
      const angle = (i * 47) % 360;
      const r = 0.04; // ~4km
      out[b.id] = {
        lat: center.lat + Math.cos((angle * Math.PI) / 180) * r,
        lng: center.lng + Math.sin((angle * Math.PI) / 180) * r,
      };
    });
    return out;
  }, [branches]);

  /** Initialize the map once SDK is ready. */
  useEffect(() => {
    if (!sdkReady || !containerRef.current || map) return;
    const kakao = window.kakao;
    if (!kakao) return;
    kakao.maps.load(() => {
      if (!containerRef.current) return;
      const m = new kakao.maps.Map(containerRef.current, {
        center: new kakao.maps.LatLng(36.5, 127.8),
        level: 13,
      });
      setMap(m);
    });
  }, [sdkReady, map]);

  /** Geocode addresses progressively. Each lookup updates `coords` so the
   *  matching marker snaps from region-seeded position to real address. */
  useEffect(() => {
    if (!sdkReady) return;
    const kakao = window.kakao;
    if (!kakao?.maps.services) return;
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services!.Geocoder();
      branches.forEach((b) => {
        if (coords[b.id]) return; // already resolved
        if (!b.address) return;
        geocoder.addressSearch(b.address, (result, status) => {
          if (status === kakao.maps.services!.Status.OK && result[0]) {
            setCoords((prev) => ({
              ...prev,
              [b.id]: {
                lat: parseFloat(result[0].y),
                lng: parseFloat(result[0].x),
              },
            }));
          }
        });
      });
    });
    // We intentionally do NOT depend on `coords` — geocode once per branch list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkReady, branches]);

  /** Sync markers to the merged coord set (real geocoded → fallback to seed). */
  useEffect(() => {
    const kakao = window.kakao;
    if (!map || !kakao) return;

    const wantIds = new Set(branches.map((b) => b.id));

    // Drop stale markers
    markersRef.current.forEach((m, id) => {
      if (!wantIds.has(id)) {
        m.setMap(null);
        markersRef.current.delete(id);
      }
    });

    // Add or update markers
    branches.forEach((b) => {
      const c = coords[b.id] ?? seeded[b.id];
      if (!c) return;
      const pos = new kakao.maps.LatLng(c.lat, c.lng);
      const isSelected = selectedId === b.id;
      const color = b.congested ? "#f43f5e" : "#233d68"; // rose-500 vs navy-600
      const img = new kakao.maps.MarkerImage(
        markerDataUri(color, isSelected),
        new kakao.maps.Size(isSelected ? 40 : 36, isSelected ? 52 : 46),
        { offset: new kakao.maps.Point(isSelected ? 20 : 18, isSelected ? 52 : 46) },
      );

      let marker = markersRef.current.get(b.id);
      if (!marker) {
        marker = new kakao.maps.Marker({ position: pos, image: img, clickable: true });
        marker.setMap(map);
        kakao.maps.event.addListener(marker, "click", () => onSelect?.(b.id));
        markersRef.current.set(b.id, marker);
      } else {
        marker.setImage(img);
      }
    });
  }, [map, branches, coords, seeded, selectedId, onSelect]);

  /** Pan to selected branch. */
  useEffect(() => {
    if (!selectedId) return;
    const kakao = window.kakao;
    if (!map || !kakao) return;
    const c = coords[selectedId] ?? seeded[selectedId];
    if (!c) return;
    map.panTo(new kakao.maps.LatLng(c.lat, c.lng));
  }, [map, selectedId, coords, seeded]);

  if (!KEY) {
    return <FallbackMap branches={branches} note="API 키 미설정" />;
  }
  if (errored) {
    return <FallbackMap branches={branches} note="지도 로드 실패" />;
  }

  return (
    <>
      <div className="relative w-full h-full min-h-[480px] rounded-2xl border border-ink-100 overflow-hidden bg-cream-50">
        <div ref={containerRef} className="absolute inset-0" />

        {/* Legend */}
        <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur rounded-xl shadow-sm border border-ink-100 px-3 py-2 text-[11px] flex items-center gap-3 pointer-events-none">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            중심업무지구
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-navy-600" />
            비과밀억제권역
          </span>
        </div>

        {!sdkReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-cream-50/80 backdrop-blur-sm z-20">
            <div className="text-[12px] text-ink-500">지도를 불러오는 중…</div>
          </div>
        )}
      </div>
    </>
  );
}

/** SVG silhouette fallback when key missing or SDK errors. */
function FallbackMap({ branches, note }: { branches: Branch[]; note: string }) {
  return (
    <div className="relative w-full h-full min-h-[480px] rounded-2xl border border-ink-100 bg-gradient-to-br from-cream-100 via-cream-50 to-navy-50 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(34,40,49,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(34,40,49,0.4)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="w-12 h-12 rounded-full bg-navy-600 text-white flex items-center justify-center">
          <MapPin className="w-5 h-5" strokeWidth={2} />
        </div>
        <p className="mt-3 text-[14px] font-bold text-ink-800">{branches.length}개 지점</p>
        <p className="mt-1 text-[12px] text-ink-500">{note}</p>
      </div>
    </div>
  );
}

