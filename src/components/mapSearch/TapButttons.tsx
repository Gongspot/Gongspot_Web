// src/components/TabButtons.tsx
interface TabButtonsProps {
  onClick: () => void;
}

const TabButtons = ({ onClick }: TabButtonsProps) => {
  const tabLabels = ["이용 목적", "공간 종류", "분위기", "부가시설", "지역"];

  return (
    <div className="px-4 pt-2">
      <div className="flex justify-between gap-2 overflow-x-auto">
        {tabLabels.map((label) => (
          <button
            key={label}
            onClick={onClick}
            className="whitespace-nowrap px-3 py-1 text-[11px] bg-white border border-gray-300 rounded-full shadow-sm text-gray-500 flex-shrink-0"
          >
            {label} <span className="inline-block rotate-90">›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabButtons;
