/**
 * Shared global type declarations for the Kakao Maps JavaScript SDK.
 * Imported once so TS doesn't see conflicting Window.kakao definitions
 * across components.
 */

export {};

declare global {
  interface Window {
    kakao?: KakaoNamespace;
  }
}

export type KakaoLatLng = {
  __brand: "KakaoLatLng";
  getLat(): number;
  getLng(): number;
};

export type KakaoMarkerImage = { __brand: "KakaoMarkerImage" };

export type KakaoMap = {
  __brand: "KakaoMap";
  setCenter(latlng: KakaoLatLng): void;
  setLevel(level: number, opts?: { animate?: boolean }): void;
  getLevel(): number;
  panTo(latlng: KakaoLatLng): void;
};

export type KakaoMarker = {
  setMap(m: KakaoMap | null): void;
  setImage(img: KakaoMarkerImage): void;
  getPosition(): KakaoLatLng;
};

export type KakaoCustomOverlay = {
  setMap(m: KakaoMap | null): void;
  setPosition(latlng: KakaoLatLng): void;
  getMap(): KakaoMap | null;
};

export type KakaoSize = { __brand: "KakaoSize" };
export type KakaoPoint = { __brand: "KakaoPoint" };

export type KakaoNamespace = {
  maps: {
    load(cb: () => void): void;
    Map: new (
      el: HTMLElement,
      opts: { center: KakaoLatLng; level: number },
    ) => KakaoMap;
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
    CustomOverlay: new (opts: {
      position: KakaoLatLng;
      content: string | HTMLElement;
      yAnchor?: number;
      xAnchor?: number;
      zIndex?: number;
      clickable?: boolean;
    }) => KakaoCustomOverlay;
    event: {
      addListener(
        target: KakaoMarker | KakaoMap,
        type: string,
        cb: () => void,
      ): void;
    };
    services?: {
      Geocoder: new () => {
        addressSearch(
          q: string,
          cb: (
            result: { x: string; y: string }[],
            status: string,
          ) => void,
        ): void;
      };
      Status: { OK: string };
    };
  };
};
