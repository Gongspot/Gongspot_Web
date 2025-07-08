import { useEffect, useState } from "react";
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

  const {
    isSheetOpen,
    setIsSheetOpen,
    sheetRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    selectedFilters,
    setSelectedFilters,
    toggleFilter,
    initialSelectedFilters,
    purposeRef,
    typeRef,
    moodRef,
    facilityRef,
    areaRef,
  } = useSearchFilters();

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

  // 검색 시 바텀 시트 올라오게
  const [isSearchResultSheetOpen, setIsSearchResultSheetOpen] = useState(false);
  const [sheetHeight, setSheetHeight] = useState("50vh");


  return (
    <div className="w-full h-screen bg-gray-200">
      {/* 상단 헤더 (뒤로가기 버튼 없음) */}
      <TopHeader title="공간 검색" backButton={false} />

      {/* 지도 + 검색창 영역 */}
      <div className="absolute top-10 left-0 right-0 bottom-0 bg-gray-200">
        {/* <KakaoMap /> 지도 삽입 */}

        {isSearchMode ? (
          <SearchMode
            exitSearchMode={() => setIsSearchMode(false)}
            openSearchResultSheet={() => setIsSearchResultSheetOpen(true)}
          />
                    
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
      {/* 검색 결과 바텀 시트 */}
      {isSearchResultSheetOpen && (
        <SearchResultSheet
          isOpen={isSearchResultSheetOpen}
          setIsOpen={setIsSearchResultSheetOpen}
          height={sheetHeight}
          setHeight={setSheetHeight}
        />

      )}
    </div>
  );
};

export default SearchPage;