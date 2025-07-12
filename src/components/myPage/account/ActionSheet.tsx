import ActionSheetButton from "../../ActionSheetButton";

interface ActionSheetProps {
    onClick: () => void;
    onCancel: () => void;
}

const ActionSheet = ({ onClick, onCancel }: ActionSheetProps) => {
    return (
        <div className="fixed bottom-0 w-full px-[1rem] pb-[0.625rem] z-50">
            <button
                className="w-full bg-[#EFEFEF] text-[#007AFF] rounded-[0.75rem]"
            >
            <ActionSheetButton text="로그아웃" danger onClick={onClick} />
            </button>
            <button
                className="w-full mt-[1rem] py-[1rem] bg-white text-[#007AFF] text-[1.125rem] font-medium rounded-[0.75rem]"
                onClick={onCancel}
            >
                취소
            </button>
        </div>
    );
};

export default ActionSheet;