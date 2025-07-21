interface SelectButtonProps {
  text: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const SelectButton = ({ text, selected, onClick, disabled = false }: SelectButtonProps) => {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-[0.75rem] py-[0.375rem] text-[0.75rem] 
      rounded-[1.875rem] border border-solid
      ${selected ? "bg-[#EFF7FB] border-[#4CB1F1] text-[#4CB1F1]" : "text-[#8F9098] border-[#D4D4D4]"}
      ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      {text}
    </button>
  );
};

export default SelectButton;