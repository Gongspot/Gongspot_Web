import type { TabLabel } from "../../hooks/useSearchFilters";

interface TabButtonsProps {
  onClick: () => void;
  selectedFilters: Record<TabLabel, string[]>;
}

const TabButtons = ({ onClick, selectedFilters }: TabButtonsProps) => {
  const tabs: TabLabel[] = ["이용 목적", "공간 종류", "분위기", "부가시설", "지역"];

  return (
    <div className="flex justify-center gap-2 overflow-x-auto px-2 pt-3 pb-2">
      {tabs.map((tab) => {
        const selections = selectedFilters[tab] || [];
        let label: string;

        if (selections.length === 0) {
          label = `${tab} ∨`;
        } else if (selections.length === 1) {
          label = selections[0];
        } else if (selections.length === 2) {
          label = `${selections[0]}, ${selections[1]}`;
        } else {
          label = `${selections[0]}...외 ${selections.length - 1}개`;
        }

        const isSelected = selections.length > 0;

        return (
          <button
            key={tab}
            onClick={onClick}
            style={{ borderStyle: "solid" }}
            className={`flex items-center px-2 py-1 text-xs rounded-full border whitespace-nowrap flex-shrink-0
              ${isSelected
                ? "bg-[#eff7fb] text-[#4cb1f1] border-[#4cb1f1]"
                : "bg-white text-gray-400 border-gray-300"}
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default TabButtons;
