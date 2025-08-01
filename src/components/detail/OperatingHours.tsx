// src/components/detail/OperatingHours.tsx
import React, { useState, useMemo } from "react";

interface Props {
  hoursString: string;
}

const OperatingHours: React.FC<Props> = ({ hoursString }) => {
  const [isOpen, setIsOpen] = useState(false);

  // useMemo를 사용해 문자열 파싱이 불필요하게 반복되지 않도록 최적화
  const weeklyHours = useMemo(() => {
    return hoursString.split(',').map(item => {
      const parts = item.trim().split(/:\s(.*)/s);
      if (parts.length < 2) return { day: '', hours: '' };
      
      const dayFullName = parts[0];
      const hours = parts[1];
      
      // '월요일' -> '월'
      const dayShortName = dayFullName.charAt(0);
      
      return { day: dayShortName, hours };
    });
  }, [hoursString]);

  // 오늘의 요일에 맞는 운영시간 찾기
  const todayIndex = new Date().getDay(); // 일요일: 0, 월요일: 1, ...
  const dayMap = ['일', '월', '화', '수', '목', '금', '토'];
  const todayShortName = dayMap[todayIndex];
  const todayHours = weeklyHours.find(d => d.day === todayShortName)?.hours || '정보 없음';

  return (
    <div>
      <button 
        className="w-full text-sm flex items-center gap-2"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span>운영시간</span>
        <span className="font-medium">오늘 {todayHours}</span>
        <svg 
          width="16" height="16" 
          viewBox="0 0 24 24"
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M7 10l5 5 5-5" stroke="#888" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* 확장되었을 때 보이는 주간 운영시간 */}
      {isOpen && (
        <div className="mt-2 pl-[68px] text-sm text-gray-700 space-y-1 animate-fade-in">
          {weeklyHours.map((item, index) => (
            <p key={index}>
              <span className={item.day === todayShortName ? 'font-bold text-sky-500' : ''}>{item.day}</span>
              <span className="ml-2">{item.hours}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default OperatingHours;