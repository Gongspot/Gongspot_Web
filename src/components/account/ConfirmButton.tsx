interface ConfirmButtonProps {
  selected: boolean;
  onClick: () => void;
}

const ConfirmButton = ({ selected, onClick }: ConfirmButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center h-[1rem] w-[1rem] rounded-full 
      border-[0.063rem] bg-white border-[0.063rem] transition-colors 
      ${selected ? 'border-[#4CB1F1]' : 'border-[#CCCCCC]'}
      `}
    >
      {selected && (
        <span className="h-[0.75rem] w-[0.75rem] rounded-full bg-[#4CB1F1]" />
      )}
    </button>
  );
};

export default ConfirmButton;