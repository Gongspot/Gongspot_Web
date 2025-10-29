import React from 'react';
import { useLoading } from '../../contexts/LoadingContext'; 
import Symbol from '../../assets/symbol.svg?react'; 

const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    // 전체 화면을 덮는 오버레이
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* 배경 그라디언트 애니메이션 */}
      <div className="absolute inset-0 bg-gradient-animated" />

      {/* 로고와 텍스트 */}
      <div className="relative z-10 flex flex-col items-center animate-pulse"> {/* animate-pulse 추가 */}
        <Symbol className="text-white w-20 h-20 sm:w-24 sm:h-24 mb-4" />
        <span className="text-white text-xl sm:text-2xl font-bold">GongSpot</span>
        <span className="text-white text-sm sm:text-base mt-2">청년을 위한 공부지도</span>
      </div>

      {/* Tailwind JIT/AOT 컴파일러가 인식할 수 있도록 동적 CSS를 직접 추가 */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .bg-gradient-animated {
          background: linear-gradient(-45deg, #a8d5e5, #4cb1f1, #2196f3, #0b7dda); /* 하늘색 계열 그라디언트 */
          background-size: 400% 400%; /* 배경 사이즈를 크게 설정 */
          animation: gradientShift 5s ease infinite; /* 5초 동안 부드럽게 반복 */
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;