import { loadKakaoScript } from './kakaoMapLoader'; 

declare global {
  interface Window {
    kakao: any;
  }
}

// 주소를 좌표로 변환하는 함수
export const getCoordsByAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
  await loadKakaoScript();

  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
      } else {
        reject(new Error("주소로 좌표를 가져오는 데 실패했습니다."));
      }
    });
  });
};

// 두 지점 간의 거리를 km 단위로 계산하는 함수
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
