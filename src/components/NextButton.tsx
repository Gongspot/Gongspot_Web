interface NextButtonProps {
    text: string;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const DEFAULT_CLASS = "w-full py-[0.875rem] bg-[#4CB1F1] text-white text-[1rem] rounded-[0.313rem]";

const NextButton = ({ text, className, onClick, disabled = false, ...props }: NextButtonProps) => {
    return (
        <div className="w-full px-[1.75rem] pb-[1.875rem]">
            <button
                className={className ? className : DEFAULT_CLASS}
                disabled={disabled}
                onClick={onClick}
                {...props}
            >
                {text}
            </button>
        </div>
    );
};

export default NextButton;