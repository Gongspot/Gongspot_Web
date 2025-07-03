import { useEffect, useState, useRef  } from 'react';
import { Search, Crosshair } from 'lucide-react';
import type { RefObject } from 'react';
import TopHeader from '/Gongspot_Web/src/components/TopHeader';

const SearchPage = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState<string>('이용 목적');

  // 상세 필터 리스트 각 섹션을 위한 ref
  const purposeRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const moodRef = useRef<HTMLDivElement>(null);
  const facilityRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const tabLabels = ['이용 목적', '공간 종류', '분위기', '부가시설', '지역'] as const;
  type TabLabel = typeof tabLabels[number]; // '이용 목적' | '공간 종류' | ...

  const refMap: Record<TabLabel, RefObject<HTMLDivElement | null>> = {
    '이용 목적': purposeRef,
    '공간 종류': typeRef,
    분위기: moodRef,
    부가시설: facilityRef,
    지역: areaRef,
  };

  // 탭 클릭 시 스크롤 이동 함수
  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const dragYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    dragYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragYRef.current === null || !sheetRef.current) return;

    const deltaY = e.touches[0].clientY - dragYRef.current;

    // 열린 상태에서 아래로 드래그할 때만 시트 움직임
    if (isSheetOpen && deltaY > 0) {
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }

    // 닫힌 상태에서 위로 드래그할 때도 움직이게 (선택사항)
    if (!isSheetOpen && deltaY < 0) {
      sheetRef.current.style.transform = `translateY(calc(83% + ${deltaY}px))`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragYRef.current === null || !sheetRef.current) return;

    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - dragYRef.current;

    // 닫기 조건 (아래로 충분히 내림)
    if (isSheetOpen && deltaY > 100) {
      setIsSheetOpen(false);
    }

    // 열기 조건 (위로 충분히 올림)
    if (!isSheetOpen && deltaY < -100) {
      setIsSheetOpen(true);
    }

    sheetRef.current.style.transform = '';
    dragYRef.current = null;
  };

  const initialSelectedFilters = {
    '이용 목적': [],
    '공간 종류': [],
    '분위기': [],
    '부가시설': [],
    '지역': [],
  };

  const [selectedFilters, setSelectedFilters] = useState(initialSelectedFilters);


  const toggleFilter = (category: string, label: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || [];
      const isSelected = current.includes(label);
      return {
        ...prev,
        [category]: isSelected
          ? current.filter((item) => item !== label) // 제거
          : [...current, label], // 추가
      };
    });
  };


  // 무료/유료 버튼 클릭 기능 구현
  const [paidFilter, setPaidFilter] = useState<"무료" | "유료" | null>(null);

  const togglePaidFilter = (label: "무료" | "유료") => {
    setPaidFilter((prev) => (prev === label ? null : label));
  };


  return (
    <div className="w-full h-screen bg-gray-200">
      {/* 상단 헤더 (뒤로가기 버튼 없음) */}
      <TopHeader title="공간 검색" backButton={false} />

      {/* 지도 + 검색창 영역 */}
      <div className="absolute top-10 left-0 right-0 bottom-0 bg-gray-200">
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
        <div className="absolute top-[65px] left-4 right-4 z-20 flex space-x-2">
          <button
            onClick={() => togglePaidFilter("무료")}
            className={`px-4 py-1 text-sm rounded-full border ${
              paidFilter === "무료"
                ? "bg-[#4cb1f1] text-white border-[#4cb1f1]"
                : "bg-white text-gray-400 border-gray-300"
            }`}
          >
            무료
          </button>
          <button
            onClick={() => togglePaidFilter("유료")}
            className={`px-4 py-1 text-sm rounded-full border ${
              paidFilter === "유료"
                ? "bg-[#4cb1f1] text-white border-[#4cb1f1]"
                : "bg-white text-gray-400 border-gray-300"
            }`}
          >
            유료
          </button>
        </div>


        {/* 현재 위치 버튼 */}
        <button className="absolute bottom-36 left-4 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm z-20">
          <Crosshair className="w-4 h-4 text-gray-400" />
        </button>

        {/* 재검색 버튼 */}
        <button
          className="absolute bottom-36 left-1/2 -translate-x-1/2 flex items-center px-4 py-1.5 bg-white border border-gray-300 rounded-full shadow-sm text-sm text-gray-400 z-20"
        >
          <Search className="w-4 h-4 mr-1 text-gray-400" />
          이 지역에서 재검색
        </button>
      </div>
      
      {isSheetOpen && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <div className="bg-white w-full px-4 py-4 border-t shadow-md flex gap-2">
            <button
              onClick={() => {
                setSelectedFilters(initialSelectedFilters); // 선택값 초기화
                setIsSheetOpen(false); // 바텀 시트 닫기
              }}
              className="w-24 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 bg-white"
            >
              닫기
            </button>

            <button
              onClick={() => {
                // 학습 공간 보기 로직
              }}
              className="flex-1 py-2 text-sm text-white bg-[#4cb1f1] rounded-lg"
            >
              학습 공간 보기
            </button>
          </div>
        </div>
      )}


      {/* 바텀 시트 */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-30 transform transition-transform duration-300 ${
          isSheetOpen ? 'translate-y-0' : 'translate-y-[83%]'
        }`}
        style={{ height: '740px' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 항상 보여지는 영역: 닫힌 상태의 손잡이 + 필터 버튼 */}
        {!isSheetOpen && (
          <>
            {/* ✅ 닫힌 상태일 때 전체 상단에 드래그 가능한 overlay 추가 */}
            <div
              className="fixed bottom-[83%] left-0 w-full h-20 z-40"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />

            {/* 닫힌 바텀 시트 내부의 버튼 + 손잡이 */}
            <div className="px-4 pt-2">
              <div className="w-10 h-1.5 bg-gray-400 rounded-full mx-auto mb-2 cursor-pointer" />
              <div className="flex justify-between gap-2 overflow-x-auto">
                {['이용 목적', '공간 종류', '분위기', '부가시설', '지역'].map((label) => (
                  <button
                    key={label}
                    onClick={() => setIsSheetOpen(true)}
                    className="whitespace-nowrap px-3 py-1 text-[11px] bg-white border border-gray-300 rounded-full shadow-sm text-gray-500 flex-shrink-0"
                  >
                    {label} <span className="inline-block rotate-90">›</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}


        {/* 바텀 시트가 열렸을 때만 나오는 상세 필터들 */}
        {isSheetOpen && (
          <div className="h-full overflow-y-auto px-4 pb-24">
            {/* 탭바 + 구분선 */}
            <div className="sticky top-0 z-10 bg-white">
              <div className="mt-6">
                <div className="flex justify-center space-x-9 text-sm text-gray-600">
                  {tabLabels.map((label) => (
                    <button
                      key={label}
                      onClick={() => {
                        scrollToRef(refMap[label as keyof typeof refMap]);
                        setActiveTab(label);
                      }}
                      className={activeTab === label ? 'font-semibold text-black' : ''}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full h-px bg-gray-200 mt-2" />
            </div>

            {/* 상세 필터 리스트 */}
            <div className="mt-4 space-y-10 text-sm">
              {/* 이용 목적 */}
              <div>
                <h3 ref={purposeRef} className="font-semibold mb-2">이용 목적</h3>
                <div className="flex flex-wrap gap-2">
                  {['개인공부', '그룹공부', '휴식', '노트북 작업', '집중공부'].map((label) => {
                    const selected = selectedFilters['이용 목적'].includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggleFilter('이용 목적', label)}
                        className={`px-5 py-1 border rounded-full text-sm ${
                          selected
                            ? 'bg-[#d7f4ff] text-black border-gray-300'
                            : 'bg-white text-gray-500 border-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 공간 종류 */}
              <div>
                <h3 ref={typeRef} className="font-semibold mb-2">공간 종류</h3>
                <div className="flex flex-wrap gap-2">
                  {['도서관', '카페', '민간학습공간', '공공학습공간', '교내학습공간'].map((label) => {
                    const selected = selectedFilters['공간 종류'].includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggleFilter('공간 종류', label)}
                        className={`px-5 py-1 border rounded-full text-sm ${
                          selected
                            ? 'bg-[#d7f4ff] text-black border-gray-300'
                            : 'bg-white text-gray-500 border-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 분위기 */}
              <div>
                <h3 ref={moodRef} className="font-semibold mb-2">분위기</h3>
                <div className="flex flex-wrap gap-2">
                  {['넓은', '아늑한', '깔끔한', '조용한', '음악이 나오는', '이야기를 나눌 수 있는'].map((label) => {
                    const selected = selectedFilters['분위기'].includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggleFilter('분위기', label)}
                        className={`px-5 py-1 border rounded-full text-sm ${
                          selected
                            ? 'bg-[#d7f4ff] text-black border-gray-300'
                            : 'bg-white text-gray-500 border-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
                
              {/* 부가시설 */}
              <div>
                <h3 ref={facilityRef} className="font-semibold mb-2">부가시설</h3>
                <div className="flex flex-wrap gap-2">
                  {['Wi-Fi', '콘센트', '넓은 좌석', '음료'].map((label) => {
                    const selected = selectedFilters['부가시설'].includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggleFilter('부가시설', label)}
                        className={`px-5 py-1 border rounded-full text-sm ${
                          selected
                            ? 'bg-[#d7f4ff] text-black border-gray-300'
                            : 'bg-white text-gray-500 border-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* 지역 */}
              <div>
                <h3 ref={areaRef} className="font-semibold mb-2">지역</h3>
                <div className="flex flex-wrap gap-2">
                  {['강남권', '강북권', '도심권', '서남권', '서북권', '동남권', '성동-광진권'].map((label) => {
                    const selected = selectedFilters['지역'].includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggleFilter('지역', label)}
                        className={`px-5 py-1 border rounded-full text-sm ${
                          selected
                            ? 'bg-[#d7f4ff] text-black border-gray-300'
                            : 'bg-white text-gray-500 border-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
        
    </div>
  );
};

export default SearchPage;

