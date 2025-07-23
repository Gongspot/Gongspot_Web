interface CategorySelectProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const CategorySelect = ({ text, selected, onClick }: CategorySelectProps) => {

  return (
    <span
      className={`
        inline-flex items-center px-[1.25rem] text-[0.813rem] leading-[1.75rem]
        rounded-[1.25rem] border border-solid 
        ${selected ? 'bg-[#EFF7FB] border-[#4CB1F1] text-[#4CB1F1]' : 'bg-white border-[#E5E5E5] text-[#8F9098]'}
      `}
      onClick={onClick}
    >
      {text}
    </span>
  );
};

export default CategorySelect;