import type { RefObject } from "react";
import TabButtons from "./TapButttons";
import FilterSection from "./FilterSection";
import type { TabLabel } from "../../pages/SearchPage";

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

          <FilterSection
            title="이용 목적"
            labels={["개인공부", "그룹공부", "휴식", "노트북 작업", "집중공부"]}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            purposeRef={purposeRef}
            typeRef={typeRef}
            moodRef={moodRef}
            facilityRef={facilityRef}
            areaRef={areaRef}
          />
        </div>
      )}
    </div>
  );
};

export default BottomSheet;
