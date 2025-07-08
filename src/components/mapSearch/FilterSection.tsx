import FilterBlock from "./FilterBlock";
import type { RefObject } from "react";
import type { TabLabel } from "../../pages/SearchPage";

interface FilterSectionProps {
  title: TabLabel;
  labels: string[];
  selectedFilters: Record<string, string[]>;
  toggleFilter: (category: TabLabel, label: string) => void;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

const FilterSection = ({
  title,
  labels,
  selectedFilters,
  toggleFilter,
  sectionRef,
}: FilterSectionProps) => {
  return (
    <div ref={sectionRef} className="mb-6">
      <h2 className="text-sm mb-2">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => {
          const isSelected = selectedFilters[title]?.includes(label);
          return (
            <button
              key={label}
              onClick={() => toggleFilter(title, label)}
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
