// TabLabel 타입 정의
type TabLabel = "이용 목적" | "공간 종류" | "분위기" | "부가시설" | "지역";

interface FilterSectionProps {
  title: TabLabel; // title을 TabLabel로 지정
  labels: string[];
  selectedFilters: Record<TabLabel, string[]>; // selectedFilters 타입 변경
  toggleFilter: (category: TabLabel, label: string) => void;
  sectionRef?: React.RefObject<HTMLDivElement | null>;
}

const FilterSection = ({
  title,
  labels,
  selectedFilters,
  toggleFilter,
  sectionRef,
}: FilterSectionProps) => {
  return (
    <div ref={sectionRef ?? undefined} className="mb-6">
      <h2 className="text-sm mb-2">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => {
          const isSelected = selectedFilters[title]?.includes(label); // title을 사용하여 필터 선택 상태 확인
          return (
            <button
              key={label}
              onClick={() => toggleFilter(title, label)} // title을 넘겨서 toggleFilter 호출
              style={{ borderStyle: "solid" }}
              className={`px-6 py-1.5 rounded-full border text-xs ${
                isSelected
                  ? "bg-[#eff7fb] text-[#4cb1f1] border-[#4cb1f1]"
                  : "bg-white text-gray-400 border-gray-300"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;
