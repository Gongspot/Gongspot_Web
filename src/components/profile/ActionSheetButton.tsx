interface ActionSheetButtonProps {
  text: string;
  danger?: boolean;
  onClick: () => void;
}

const ActionSheetButton = ({ text, danger, onClick }: ActionSheetButtonProps) => {
  return (
    <p 
      className={`py-[1.125rem] text-[1.125rem] ${danger ? 'text-[#FF3B30]' : 'text-[#007AFF]'}`}
      onClick={onClick}
    >
      {text}
    </p>
  );
};

export default ActionSheetButton;