interface NextButtonProps {
    text: string;
    onClick?: () => void;
}

const NextButton = ({ text, onClick, ...props }: NextButtonProps) => {
    return (
        <div className="fixed bottom-0 w-full px-[1.75rem] pb-[1.875rem]">
            <button
                className="w-full h-[3.125rem] bg-[#4CB1F1] text-white text-[1rem] rounded"
                onClick={onClick}
                {...props}
            >
                {text}
            </button>
        </div>
    );
};

export default NextButton;