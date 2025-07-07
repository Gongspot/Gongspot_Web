import type { RefObject } from "react";

interface FilterBlockProps {
  title: string;
  titleRef?: RefObject<HTMLDivElement | null>; // ← 여기를 수정!
  options: string[];
  selected: string[];
  onToggle: (label: string) => void;
}


const FilterBlock = ({ title, options, selected, onToggle, titleRef }: FilterBlockProps) => {
  return (
    <div>
      <h3 ref={titleRef} className="font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((label) => (
          <button
            key={label}
            onClick={() => onToggle(label)}
            className={`px-5 py-1 border rounded-full text-sm ${
              selected.includes(label)
                ? "bg-[#d7f4ff] text-black border-gray-300"
                : "bg-white text-gray-500 border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBlock;
