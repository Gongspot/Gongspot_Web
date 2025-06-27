import { useState } from 'react';
import { Search, Crosshair } from 'lucide-react';

const SearchPage = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col">
      {/* 상단 헤더 */}
      <div className="bg-white relative flex items-center px-4 py-3 h-12 shadow-sm z-10">
        <button className="z-10 font-bold text-lg px-2">‹</button>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
          공간 검색
        </div>
      </div>

      {/* 지도 영역 */}
      <div className="relative flex-1 bg-gray-200">
        {/* 검색창 */}
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm border border-gray-300">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="학습공간 검색"
              className="flex-1 bg-transparent text-sm placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        {/* 필터 버튼 */}
        <div className="absolute top-[60px] left-4 right-4 z-20 flex space-x-2">
          <button className="px-4 py-1 text-sm border border-gray-300 bg-white rounded-full text-gray-600">
            무료
          </button>
          <button className="px-4 py-1 text-sm border border-gray-300 bg-white rounded-full text-gray-600">
            유료
          </button>
        </div>

        {/* 현재 위치 버튼 */}
        <button className="absolute bottom-20 left-4 w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm z-20">
          <Crosshair className="w-4 h-4 text-gray-400" />
        </button>

        {/* 재검색 버튼 */}
        <button
          onClick={() => setIsSheetOpen(true)}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center px-4 py-1.5 bg-white border border-gray-300 rounded-full shadow-sm text-sm text-gray-400 z-20"
        >
          <Search className="w-4 h-4 mr-1 text-gray-400" />
          이 지역에서 재검색
        </button>
      </div>

      {/* 바텀 시트 */}
        <div
          className={`fixed bottom-0 left-0 w-full h-[60%] bg-white rounded-t-2xl shadow-lg z-50 transform transition-transform duration-300 ${
            isSheetOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div
            className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mt-2 cursor-pointer"
            onClick={() => setIsSheetOpen(false)}
          />
          <div className="p-4 overflow-y-auto h-full">
            <h2 className="text-lg font-semibold mb-2">카테고리 선택</h2>
            <p className="text-sm text-gray-500">예: 학습공간, 회의실, 세미나룸...</p>
          </div>
        </div>
        
    </div>
  );
};

export default SearchPage;

