import type { RefObject } from "react";
import TabButtons from "./TapButttons";
import FilterSection from "./FilterSection";
import type { TabLabel } from "/Gongspot_Web/src/hooks/useSearchFilters";

interface BottomSheetProps {
  sheetRef: RefObject<HTMLDivElement | null>;
  purposeRef: RefObject<HTMLDivElement | null>;
  typeRef: RefObject<HTMLDivElement | null>;
  moodRef: RefObject<HTMLDivElement | null>;
  facilityRef: RefObject<HTMLDivElement | null>;
  areaRef: RefObject<HTMLDivElement | null>;
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFilters: Record<TabLabel, string[]>;
  toggleFilter: (category: TabLabel, label: string) => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  initialSelectedFilters: Record<TabLabel, string[]>;
}

const BottomSheet = ({
  isSheetOpen,
  setIsSheetOpen,
  sheetRef,
  selectedFilters,
  toggleFilter,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  purposeRef,
  typeRef,
  moodRef,
  facilityRef,
  areaRef,
}: BottomSheetProps) => {
  const sections = [
    {
      title: "이용 목적" as TabLabel,
      labels: ["개인공부", "그룹공부", "휴식", "노트북 작업", "집중공부"],
      ref: purposeRef,
    },
    {
      title: "공간 종류" as TabLabel,
      labels: ["도서관", "카페", "민간학습공간", "공공학습공간", "교내학습공간"],
      ref: typeRef,
    },
    {
      title: "분위기" as TabLabel,
      labels: ["넓은", "아늑한", "깔끔한", "조용한", "음악이 나오는", "이야기를 나눌 수 있는"],
      ref: moodRef,
    },
    {
      title: "부가시설" as TabLabel,
      labels: ["Wi-Fi", "콘센트", "넓은 좌석", "음료"],
      ref: facilityRef,
    },
    {
      title: "지역" as TabLabel,
      labels: ["강남권", "강북권", "도심권", "서남권", "서북권", "동남권", "성동·광진권"],
      ref: areaRef,
    },
  ];

  return (
    <div
      ref={sheetRef}
      className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-30 transform transition-transform duration-300 ${
        isSheetOpen ? "translate-y-0" : "translate-y-[83%]"
      }`}
      style={{ height: "740px" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-10 h-1 bg-gray-400 rounded-full mx-auto mt-2 cursor-pointer" />

      {!isSheetOpen && (
        <>
          <div
            className="fixed bottom-[83%] left-0 w-full h-20 z-40"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <TabButtons onClick={() => setIsSheetOpen(true)} />
        </>
      )}

      {isSheetOpen && (
        <div className="h-full overflow-y-auto px-4 pb-24">
          <div className="sticky top-0 z-10 bg-white">
            <div className="w-full h-px bg-gray-200 mt-10" />
          </div>

          {sections.map((section) => (
          <FilterSection
            key={section.title}
            title={section.title}
            labels={section.labels}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            sectionRef={section.ref} 
          />
        ))}

        </div>
      )}
    </div>
  );
};

export default BottomSheet;
