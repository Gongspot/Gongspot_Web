import { useEffect } from "react";
const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;

const KakaoMap = () => {
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
      script.src =
        `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
      script.async = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default KakaoMap;
