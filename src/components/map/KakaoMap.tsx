"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { MapPin } from "lucide-react";

declare global {
  interface Window {
    kakao?: {
      maps: {
        load(cb: () => void): void;
        Map: new (
          el: HTMLElement,
          opts: { center: KakaoLatLng; level: number },
        ) => unknown;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Marker: new (opts: { position: KakaoLatLng }) => { setMap(m: unknown): void };
        services?: {
          Geocoder: new () => {
            addressSearch(
              q: string,
              cb: (result: GeocodeResult[], status: string) => void,
            ): void;
          };
          Status: { OK: string };
        };
      };
    };
  }
}

type KakaoLatLng = { __brand: "KakaoLatLng" };
type GeocodeResult = { x: string; y: string };

const KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

export type KakaoMapProps = {
  /** Address to geocode and center the map on. */
  address: string;
  /** Display label shown in the placeholder fallback. */
  title?: string;
};

export function KakaoMap({ address, title }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (!loaded || !mapRef.current || !window.kakao?.maps) return;
    window.kakao.maps.load(() => {
      const kakao = window.kakao!;
      const geocoder = kakao.maps.services?.Geocoder
        ? new kakao.maps.services.Geocoder()
        : null;
      if (!geocoder) {
        setErrored(true);
        return;
      }
      geocoder.addressSearch(address, (result, status) => {
        if (status !== kakao.maps.services!.Status.OK || !result[0]) {
          setErrored(true);
          return;
        }
        const center = new kakao.maps.LatLng(
          parseFloat(result[0].y),
          parseFloat(result[0].x),
        );
        const map = new kakao.maps.Map(mapRef.current!, {
          center,
          level: 4,
        });
        const marker = new kakao.maps.Marker({ position: center });
        marker.setMap(map);
      });
    });
  }, [loaded, address]);

  if (!KEY) {
    return <Placeholder address={address} title={title} note="API 키 미설정" />;
  }

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
      />
      {errored ? (
        <Placeholder address={address} title={title} note="지도 로드 실패" />
      ) : (
        <div
          ref={mapRef}
          className="w-full aspect-[16/10] rounded-3xl border border-cream-200 bg-cream-100"
          role="img"
          aria-label={`${title ?? "지점"} 지도`}
        />
      )}
    </>
  );
}

function Placeholder({
  address,
  title,
  note,
}: {
  address: string;
  title?: string;
  note: string;
}) {
  return (
    <div className="rounded-3xl border border-cream-200 bg-white overflow-hidden">
      <div className="relative aspect-[16/10] bg-gradient-to-br from-navy-100 via-cream-100 to-amber-100">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(34,40,49,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(34,40,49,0.4)_1px,transparent_1px)] [background-size:40px_40px]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="w-12 h-12 rounded-full bg-navy-600 text-white flex items-center justify-center shadow-[0_12px_30px_-8px_rgba(35,61,104,0.55)]">
            <MapPin className="w-5 h-5" strokeWidth={2} />
          </div>
          {title && (
            <p className="mt-3 text-[14px] font-bold text-ink-800">{title}</p>
          )}
          <p className="mt-1 text-[12.5px] text-ink-500">{address}</p>
        </div>
      </div>
      <div className="p-4 border-t border-cream-200 text-center text-[12px] text-ink-400">
        지도 placeholder — {note} (NEXT_PUBLIC_KAKAO_MAP_KEY env 설정 후 자동 활성)
      </div>
    </div>
  );
}
