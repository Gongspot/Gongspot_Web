import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  resetToInitialState: () => void;
  currentLocation: { lat: number; lng: number } | null;
}

const KakaoMap = forwardRef(({ resetToInitialState, currentLocation }: KakaoMapProps, ref) => {
  const downTimeRef = useRef<number | null>(null);
  const downPosRef = useRef<{ x: number; y: number } | null>(null);
  const mapRef = useRef<any>(null);

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
      });
    };

    if ((window as any).kakao?.maps) {
      loadMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
      script.async = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, []);

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

    // 클릭으로 간주되는 조건: 시간 < 200ms, 이동 거리 < 5px
    if (timeDiff < 200 && distance < 5) {
      resetToInitialState(); // 모든 상태 초기화
    }
  };

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current || !currentLocation) {
      console.log("조건 불충족", {
        kakao: !!window.kakao,
        maps: !!window.kakao?.maps,
        mapRef: !!mapRef.current,
        currentLocation,
      });
      return;
    }

    console.log("모든 조건 만족. 마커 생성 시작");

    const markerPosition = new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng);

    // 기존 커스텀 오버레이 생성
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
      ">
      </div>
    `;

    const overlay = new window.kakao.maps.CustomOverlay({
      position: markerPosition,
      content: markerContent,
      yAnchor: 0.5,
    });

    overlay.setMap(mapRef.current);
    mapRef.current.setCenter(markerPosition);

    return () => {
      overlay.setMap(null);
    };
  }, [currentLocation]);

  useImperativeHandle(ref, () => ({
    recenterToCurrentLocation: () => {
      if (mapRef.current && currentLocation) {
        const latLng = new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng);
        mapRef.current.setCenter(latLng);
      }
    },
  }));

  return (
    <div
      id="map"
      style={{ width: "100%", height: "100%" }}
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