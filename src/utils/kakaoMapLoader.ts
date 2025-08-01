// src/utils/kakaoMapLoader.ts
const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;
const SCRIPT_ID = 'kakao-map-script-services';

let isLoading = false;
let isLoaded = false;
// ▼▼▼ 이 줄의 타입을 수정하여 에러를 해결합니다. ▼▼▼
let waitingQueue: ((value: void | PromiseLike<void>) => void)[] = [];

export const loadKakaoScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (isLoaded) {
      resolve();
      return;
    }

    if (isLoading) {
      waitingQueue.push(resolve);
      return;
    }

    isLoading = true;
    waitingQueue.push(resolve);

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        isLoading = false;
        isLoaded = true;
        waitingQueue.forEach(res => res());
        waitingQueue = [];
      });
    };

    script.onerror = () => {
        isLoading = false;
        console.error("Kakao Maps SDK 로딩에 실패했습니다.");
        waitingQueue = [];
    };
  });
};