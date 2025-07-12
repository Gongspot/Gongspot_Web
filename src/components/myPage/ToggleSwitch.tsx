interface ToggleSwitchProps {
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch = ({ text, checked, onChange }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[1rem]">{text}</p>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-[2.75rem] h-[1.5rem] rounded-full transition-colors duration-300
        ${checked ? "bg-[#4CB1F1]" : "bg-[#D9D9D9]"}`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-1/2 transition-transform duration-300
            w-[1.5rem] h-[1.5rem] bg-white border rounded-full
            ${checked ? "border-[#4CB1F1]" : "border-[#D9D9D9]"}`}
          style={{
            transform: `translateY(-50%) translateX(${checked ? "1.25rem" : "0"})`,
            display: "block",
          }}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
