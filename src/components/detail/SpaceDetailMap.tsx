import { useEffect } from 'react';

const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  address: string;
}

const SpaceDetailMap: React.FC<Props> = ({ address }) => {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      loadMap();
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          loadMap();
        });
      };
    }
  }, [address]);

  const loadMap = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        const container = document.getElementById('detail-map');
        if (!container) return;
        
        const options = {
          center: coords,
          level: 3,
          draggable: false,
          zoomable: false,
        };

        const map = new window.kakao.maps.Map(container, options);

        new window.kakao.maps.Marker({
          map: map,
          position: coords
        });
      } else {
        console.error('주소로 좌표를 변환하는데 실패했습니다.');
        const container = document.getElementById('detail-map');
        if(container) {
          container.innerHTML = `<div class="flex items-center justify-center h-full text-gray-500">위치 정보를 불러올 수 없습니다.</div>`;
        }
      }
    });
  };

  return (
    <div id="detail-map" className="w-full h-28 object-cover rounded-xl mt-2" />
  );
};

export default SpaceDetailMap;