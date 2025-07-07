// components/FilterButton.tsx
interface FilterButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const FilterButton = ({ label, selected, onClick }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-1 border rounded-full text-sm ${
        selected
          ? "bg-[#d7f4ff] text-black border-gray-300"
          : "bg-white text-gray-500 border-gray-300"
      }`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
