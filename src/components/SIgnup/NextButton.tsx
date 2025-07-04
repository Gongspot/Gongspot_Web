interface NextButtonProps {
    text: string;
    onClick?: () => void;
}

const NextButton = ({ text, onClick }: NextButtonProps) => {
    return (
        <button
            className="w-full h-[3.125rem] bg-[#4CB1F1] text-white text-[1rem] rounded"
            onClick={onClick ? onClick : () => alert("다음 단계로 이동")}
        >
            {text}
        </button>
    );
};

export default NextButton;