// src/components/ScrollToTop.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = (): null => {
  // 현재 페이지의 정보를 가져옵니다 (URL 경로 등).
  const { pathname } = useLocation();

  // useEffect를 사용해 pathname이 바뀔 때마다 특정 작업을 수행합니다.
  useEffect(() => {
    // 스크롤을 (x: 0, y: 0) 위치로 이동시킵니다.
    window.scrollTo(0, 0);
  }, [pathname]); // 의존성 배열에 'pathname'을 추가하여 URL이 변경될 때만 이 효과가 실행되도록 합니다.

  // 이 컴포넌트는 화면에 아무것도 그리지 않으므로 null을 반환합니다.
  return null;
};

export default ScrollToTop;