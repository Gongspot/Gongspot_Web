interface NextButtonProps {
    text: string;
    onClick?: () => void;
}

const NextButton = ({ text, onClick, ...props }: NextButtonProps) => {
    return (
        <div className="w-full px-[1.75rem] pb-[1.875rem]">
            <button
                className="w-full py-[0.875rem] bg-[#4CB1F1] text-white text-[1rem] rounded-[0.313rem]"
                onClick={onClick}
                {...props}
            >
                {text}
            </button>
        </div>
    );
};

export default NextButton;