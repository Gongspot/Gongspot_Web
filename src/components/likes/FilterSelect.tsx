interface FilterSelectProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const FilterSelect = ({ text, selected, onClick }: FilterSelectProps) => {

  return (
    <span
      className={`
        inline-flex items-center px-[1.25rem] text-[0.813rem] leading-[1.625rem]
        rounded-[1.25rem] border border-solid border-[#B1B8C180] 
        ${selected ? 'bg-[#4CB1F1] text-white' : 'bg-white text-black'}
      `}
      onClick={onClick}
    >
      {text}
    </span>
  );
};

export default FilterSelect;