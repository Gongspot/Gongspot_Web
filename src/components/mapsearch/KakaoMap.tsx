/* global kakao */
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import type { PlaceItem } from "../../apis/placeSearch";

const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}

type LatLng = { lat: number; lng: number };

interface KakaoMapProps {
  resetToInitialState: () => void;
  currentLocation: { lat: number; lng: number } | null;

  places?: PlaceItem[];
  selectedPlaceId?: number | null;
  onMarkerClick?: (p: PlaceItem) => void;

  // 배경(지도) ‘빠른 탭’ 시 호출
  onQuickTap?: () => void;
}

const KakaoMap = forwardRef(function KakaoMap(
  { resetToInitialState, currentLocation, places = [], selectedPlaceId = null, onMarkerClick, onQuickTap }: KakaoMapProps,
  ref
) {
  const downTimeRef = useRef<number | null>(null);
  const downPosRef = useRef<{ x: number; y: number } | null>(null);
  const mapRef = useRef<any>(null);

  // 마커/라벨/좌표 캐시
  const markerMapRef = useRef<Map<number, any>>(new Map());
  const labelMapRef  = useRef<Map<number, any>>(new Map()); 
  const coordCacheRef = useRef<Map<number, LatLng>>(new Map());
  const geocoderRef = useRef<any>(null);

  // 기준(비선택) 마커 크기
  const BASE_W = 20;
  const BASE_H = 17;
  // 선택 마커 배율 (원하는 배율로 조정 가능: 1.5면 30x26)
  const SELECTED_SCALE = 1.5;


  // --- 지도 로드 ---
  useEffect(() => {
    const loadMap = () => {
      const { kakao } = window as any;
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        mapRef.current = map;

        // 지오코더 준비
        geocoderRef.current = new kakao.maps.services.Geocoder();
      });
    };

    if ((window as any).kakao?.maps) {
      loadMap();
    } else {
      const script = document.createElement("script");
      // ★ services 라이브러리 추가
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, []);

  // --- 지도 클릭 감지 → reset ---
  const handleDown = (x: number, y: number) => {
    downTimeRef.current = Date.now();
    downPosRef.current = { x, y };
  };

  const handleUp = (x: number, y: number) => {
    if (!downTimeRef.current || !downPosRef.current) return;
    const timeDiff = Date.now() - downTimeRef.current;
    const dx = x - downPosRef.current.x;
    const dy = y - downPosRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // ‘빠른 탭’이면 상위 콜백 우선, 없으면 기존 reset
    if (timeDiff < 200 && distance < 5) {
      if (onQuickTap) onQuickTap();
      else resetToInitialState();
    }
  };

  // --- 현재 위치 오버레이(기존 유지) ---
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current || !currentLocation) return;

    const markerPosition = new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng);
    const markerContent = document.createElement("div");
    markerContent.innerHTML = `
      <div style="
        position: relative;
        width: 28px;
        height: 28px;
        background-color: #f35343;
        border: 4px solid white;
        border-radius: 50%;
        box-shadow: 0 0 6px rgba(0,0,0,0.4);
      "></div>
    `;

    const overlay = new window.kakao.maps.CustomOverlay({
      position: markerPosition,
      content: markerContent,
      yAnchor: 0.5,
    });

    overlay.setMap(mapRef.current);
    mapRef.current.setCenter(markerPosition);
    return () => overlay.setMap(null);
  }, [currentLocation]);

  // --- 물방울 마커 SVG ---
  const makePinSVG = (selected: boolean) => {
    // 같은 비율 유지: 기준 크기에 배율만 곱함
    const scale = selected ? SELECTED_SCALE : 1;
    const w = Math.round(BASE_W * scale);
    const h = Math.round(BASE_H * scale);

    const fill = "#4cb1f1";
    const belly = 0.42; // 물방울 볼록 위치 비율

    const path = `
      M ${w / 2} 0
      C ${w * 0.82} 0, ${w} ${h * belly}, ${w / 2} ${h}
      C 0 ${h * belly}, ${w * 0.18} 0, ${w / 2} 0
      Z
    `;

    // 선택된 마커에만 안이 채워진 흰 원
    const dotCY = h * 0.34;                            // ↓ 아래로 살짝
    const dotR  = Math.max(1, Math.round(Math.min(w, h) * 0.14)); // ↑ 약간 크게
    const innerDot = selected
      ? `<circle cx="${w/2}" cy="${dotCY}" r="${dotR}" fill="#fff" />`
      : "";

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <path d="${path}" fill="${fill}" />
        ${innerDot}
      </svg>
    `;

    const url = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
    return {
      url,
      size: new window.kakao.maps.Size(w, h),
      offset: new window.kakao.maps.Point(w / 2, h), // 하단 포인트가 앵커
    };
  };

  // --- 라벨(장소명) 오버레이 ---
  const setLabel = (placeId: number, position: any, name: string, visible: boolean) => {
    let overlay = labelMapRef.current.get(placeId);

    const safe = String(name).replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // 중앙 정렬 + 배경 제거 + 얇은 흰색 테두리(크로스브라우저: text-stroke + text-shadow)
    const content = `
      <div style="
        position: relative;
        left: 50%;
        transform: translate(-50%, 2px);   /* 수평 가운데, 아래로 약간 */
        white-space: nowrap;
        font-size: 12px;
        font-weight: 600;
        color: #000;
        text-align: center;

        /* 테두리(우선 webkit) */
        -webkit-text-stroke: 0.1px #fff;

        /* 호환용 얇은 아웃라인 */
        text-shadow:
          -0.5px 0 #fff,
          0.5px 0 #fff,
          0 -0.5px #fff,
          0  0.5px #fff;

        /* 클릭 가로채지 않게 하려면 아래 주석 해제 */
        /* pointer-events: none; */
      ">
        ${safe}
      </div>
    `;

    if (!overlay) {
      overlay = new window.kakao.maps.CustomOverlay({
        position,
        content,
        yAnchor: 0,
        xAnchor: 0.5,  // 지원되면 정렬 정확도↑ (미지원이면 무시됨)
        zIndex: 1000,
      });
      labelMapRef.current.set(placeId, overlay);
    } else {
      overlay.setPosition(position);
      overlay.setContent(content);
    }

    overlay.setMap(visible ? mapRef.current : null);
  };

  // --- 좌표 얻기 (lat/lng → 사용, 없으면 geocoding) ---
  const getCoords = async (p: PlaceItem): Promise<LatLng | null> => {
    const lat = (p as any).lat;
    const lng = (p as any).lng;
    if (typeof lat === "number" && typeof lng === "number") {
      return { lat, lng };
    }
    const cached = coordCacheRef.current.get(p.placeId);
    if (cached) return cached;

    const addr = (p as any).locationInfo || (p as any).address;
    if (!addr || !geocoderRef.current) return null;

    const coords: LatLng | null = await new Promise((resolve) => {
      geocoderRef.current.addressSearch(addr, (results: any[], status: any) => {
        if (status === window.kakao.maps.services.Status.OK && results[0]) {
          const { x, y } = results[0];
          resolve({ lat: parseFloat(y), lng: parseFloat(x) });
        } else {
          resolve(null);
        }
      });
    });
    if (coords) coordCacheRef.current.set(p.placeId, coords);
    return coords;
  };

  // --- 마커 upsert ---
  const upsertMarker = (p: PlaceItem, selected: boolean, pos: LatLng) => {
    const key = p.placeId;
    let marker = markerMapRef.current.get(key);

    const pin = makePinSVG(selected);
    const img = new window.kakao.maps.MarkerImage(pin.url, pin.size, { offset: pin.offset });
    const position = new window.kakao.maps.LatLng(pos.lat, pos.lng);

    if (!marker) {
      marker = new window.kakao.maps.Marker({
        position,
        image: img,
        zIndex: selected ? 1000 : 1,
        clickable: true,
      });
      marker.setMap(mapRef.current);
      markerMapRef.current.set(key, marker);

      window.kakao.maps.event.addListener(marker, "click", () => {
        onMarkerClick?.(p);
      });
    } else {
      marker.setImage(img);
      marker.setPosition(position);
      marker.setZIndex(selected ? 1000 : 1);
    }

    // 라벨(선택된 경우만 표시)
    setLabel(key, position, p.name, selected);
  };

  // --- places가 바뀌면 마커 동기화 ---
  useEffect(() => {
    if (!mapRef.current) return;
    let cancelled = false;

    const sync = async () => {
      const ids = new Set(places.map(p => p.placeId));

      // 제거된 마커/라벨 정리
      markerMapRef.current.forEach((m, id) => {
        if (!ids.has(id)) {
          m.setMap(null);
          markerMapRef.current.delete(id);
        }
      });
      labelMapRef.current.forEach((ov, id) => {
        if (!ids.has(id)) {
          ov.setMap(null);
          labelMapRef.current.delete(id);
        }
      });

      // 추가/업데이트 + bounds
      const bounds = new window.kakao.maps.LatLngBounds();
      for (const p of places) {
        const pos = await getCoords(p);
        if (cancelled || !pos) continue;
        upsertMarker(p, selectedPlaceId === p.placeId, pos);
        bounds.extend(new window.kakao.maps.LatLng(pos.lat, pos.lng));
      }
      if (!cancelled && places.length > 0) {
        mapRef.current.setBounds(bounds, 40, 40, 40, 40);
      }
    };

    sync();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  // --- 선택 변경 시 아이콘/라벨만 갱신 ---
  useEffect(() => {
    if (!mapRef.current) return;
    (async () => {
      for (const p of places) {
        const pos = coordCacheRef.current.get(p.placeId) || await getCoords(p);
        if (!pos) continue;
        upsertMarker(p, selectedPlaceId === p.placeId, pos);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlaceId]);

  // --- 외부 API ---
  useImperativeHandle(ref, () => ({
    recenterToCurrentLocation: () => {
      if (mapRef.current && currentLocation) {
        const latLng = new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng);
        mapRef.current.setCenter(latLng);
        mapRef.current.setLevel(4);
      }
    },
    recenterToPlaceId: (placeId: number) => {
      const pos = coordCacheRef.current.get(placeId);
      if (pos && mapRef.current) {
        const latLng = new window.kakao.maps.LatLng(pos.lat, pos.lng);
        mapRef.current.setCenter(latLng);
        mapRef.current.setLevel(4);
      }
    }
  }));

  return (
    <div
      id="map"
      style={{ width: "100%", height: "100%", touchAction: "none" }}
      onMouseDown={(e) => handleDown(e.clientX, e.clientY)}
      onMouseUp={(e) => handleUp(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        handleDown(touch.clientX, touch.clientY);
      }}
      onTouchEnd={(e) => {
        const touch = e.changedTouches[0];
        handleUp(touch.clientX, touch.clientY);
      }}
    />
  );
});

export default KakaoMap;
