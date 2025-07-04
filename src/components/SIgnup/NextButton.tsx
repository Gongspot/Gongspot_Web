interface NextButtonProps {
    text: string;
    onClick?: () => void;
}

const NextButton = ({ text, onClick, ...props }: NextButtonProps) => {
    return (
        <button
            className="w-full h-[3.125rem] bg-[#4CB1F1] text-white text-[1rem] rounded"
            onClick={onClick}
            {...props}
        >
            {text}
        </button>
    );
};

export default NextButton;