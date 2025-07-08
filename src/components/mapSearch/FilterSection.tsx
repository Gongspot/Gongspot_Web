import FilterBlock from "./FilterBlock";
import type { RefObject } from "react";
import type { TabLabel } from "/Gongspot_Web/src/pages/SearchPage"

interface FilterSectionProps {
  title: TabLabel;
  labels: string[];
  selectedFilters: Record<TabLabel, string[]>;
  toggleFilter: (category: TabLabel, label: string) => void;
  titleRef?: RefObject<HTMLDivElement | null>; // 사용 여부에 따라 유지

  purposeRef: RefObject<HTMLDivElement | null>;
  typeRef: RefObject<HTMLDivElement | null>;
  moodRef: RefObject<HTMLDivElement | null>;
  facilityRef: RefObject<HTMLDivElement | null>;
  areaRef: RefObject<HTMLDivElement | null>;
}


const FilterSection = ({
  selectedFilters,
  toggleFilter,
  purposeRef,
  typeRef,
  moodRef,
  facilityRef,
  areaRef,
}: FilterSectionProps) => {
  return (
    <div className="mt-4 space-y-8 text-sm">
      <FilterBlock
        title="이용 목적"
        titleRef={purposeRef}
        options={["개인공부", "그룹공부", "휴식", "노트북 작업", "집중공부"]}
        selected={selectedFilters["이용 목적"]}
        onToggle={(label) => toggleFilter("이용 목적", label)}
      />

      <FilterBlock
        title="공간 종류"
        titleRef={typeRef}
        options={["도서관", "카페", "민간학습공간", "공공학습공간", "교내학습공간"]}
        selected={selectedFilters["공간 종류"]}
        onToggle={(label) => toggleFilter("공간 종류", label)}
      />

      <FilterBlock
        title="분위기"
        titleRef={moodRef}
        options={["넓은", "아늑한", "깔끔한", "조용한", "음악이 나오는", "이야기를 나눌 수 있는"]}
        selected={selectedFilters["분위기"]}
        onToggle={(label) => toggleFilter("분위기", label)}
      />

      <FilterBlock
        title="부가시설"
        titleRef={facilityRef}
        options={["Wi-Fi", "콘센트", "넓은 좌석", "음료"]}
        selected={selectedFilters["부가시설"]}
        onToggle={(label) => toggleFilter("부가시설", label)}
      />

      <FilterBlock
        title="지역"
        titleRef={areaRef}
        options={["강남권", "강북권", "도심권", "서남권", "서북권", "동남권", "성동-광진권"]}
        selected={selectedFilters["지역"]}
        onToggle={(label) => toggleFilter("지역", label)}
      />
    </div>
  );
};

export default FilterSection;
