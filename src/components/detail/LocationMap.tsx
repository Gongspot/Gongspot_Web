// src/components/detail/LocationMap.tsx
import React, { useEffect } from 'react';

const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  address: string;
}

const LocationMap: React.FC<Props> = ({ address }) => {
  useEffect(() => {
    const scriptId = 'kakao-map-script-services';
    
    const loadKakaoMapScript = (callback: () => void) => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        callback();
        return;
      }
      
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
          const checkSdkReady = setInterval(() => {
              if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
                  clearInterval(checkSdkReady);
                  callback();
              }
          }, 100);
      } else {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
          script.async = true;
          document.head.appendChild(script);
          script.onload = () => {
              window.kakao.maps.load(callback);
          };
      }
    };

    const createMap = () => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: any, status: any) => {
        const container = document.getElementById('location-map-container');
        if (!container) return;

        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const options = {
            center: coords,
            level: 3,
            draggable: false,
            zoomable: false,
          };
          const map = new window.kakao.maps.Map(container, options);
          new window.kakao.maps.Marker({ map, position: coords });
        } else {
          container.innerHTML = `<div class="flex items-center justify-center h-full text-gray-500 text-sm">위치 정보를 표시할 수 없습니다.</div>`;
        }
      });
    };

    loadKakaoMapScript(createMap);

  }, [address]);

  return (
    <div id="location-map-container" className="w-full h-28 object-cover rounded-xl mt-2 bg-gray-200" />
  );
};

export default LocationMap;