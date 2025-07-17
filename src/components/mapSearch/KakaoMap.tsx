import { useEffect, useRef } from "react";
const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;

interface KakaoMapProps {
  resetToInitialState: () => void;
}
const KakaoMap = ({ resetToInitialState }: KakaoMapProps) => {
  const downTimeRef = useRef<number | null>(null);
  const downPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const loadMap = () => {
      const { kakao } = window as any;
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };
        new kakao.maps.Map(container, options);
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
};

export default KakaoMap;