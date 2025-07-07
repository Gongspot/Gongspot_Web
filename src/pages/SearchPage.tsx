import { useEffect, useState, useRef } from "react";
import TopHeader from "../components/TopHeader";
import SearchControls from "../components/mapSearch/SearchControls";
import BottomSheet from "../components/mapSearch/BottomSheet";
import SearchMode from "../components/mapSearch/SearchMode";


const SearchPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  // 상세 필터 리스트 각 섹션을 위한 ref
  const purposeRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const moodRef = useRef<HTMLDivElement>(null);
  const facilityRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);


  type TabLabel = "이용 목적" | "공간 종류" | "분위기" | "부가시설" | "지역";


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

    // 닫힌 상태에서 위로 드래그할 때도 움직이게
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

    sheetRef.current.style.transform = "";
    dragYRef.current = null;
  };

  const initialSelectedFilters = {
    "이용 목적": [],
    "공간 종류": [],
    분위기: [],
    부가시설: [],
    지역: [],
  };

  const [selectedFilters, setSelectedFilters] = useState<Record<TabLabel, string[]>>(initialSelectedFilters);


  const toggleFilter = (category: TabLabel, label: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category];
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

  // 검색창
  const [isSearchMode, setIsSearchMode] = useState(false);

  const enterSearchMode = () => {
    setIsSearchMode(true);
  };

  return (
    <div className="w-full h-screen bg-gray-200">
      {/* 상단 헤더 (뒤로가기 버튼 없음) */}
      <TopHeader title="공간 검색" backButton={false} />

      {/* 지도 + 검색창 영역 */}
      <div className="absolute top-10 left-0 right-0 bottom-0 bg-gray-200">
        {isSearchMode ? (
          <SearchMode exitSearchMode={() => setIsSearchMode(false)} />
        ) : (
          <SearchControls
            paidFilter={paidFilter}
            togglePaidFilter={togglePaidFilter}
            enterSearchMode={enterSearchMode}
          />
        )}
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
      <BottomSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        sheetRef={sheetRef}
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
        purposeRef={purposeRef}
        typeRef={typeRef}
        moodRef={moodRef}
        facilityRef={facilityRef}
        areaRef={areaRef}
        initialSelectedFilters={initialSelectedFilters}
      />

    </div>
  );
};

export default SearchPage;
export type TabLabel = "이용 목적" | "공간 종류" | "분위기" | "부가시설" | "지역";
