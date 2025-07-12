import ActionSheetButton from "../../ActionSheetButton";

interface ActionSheetProps {
    onTake: () => void;
    onSelect: () => void;
    onRemove: () => void;
    onCancel: () => void;
}

const ActionSheet = ({ onTake, onSelect, onRemove, onCancel }: ActionSheetProps) => {
    const Divider = () => (
        <div className="w-full border-b-[0.063rem] border-[#D9D9D9]" />
    );

    return (
        <div className="fixed bottom-0 w-full px-[1rem] pb-[1.5rem] z-50">
            <button
                className="w-full bg-[#EFEFEF] text-[#007AFF] rounded-[0.75rem]"
            >
            <ActionSheetButton text="지금 촬영하기" onClick={onTake} />
            <Divider />
            <ActionSheetButton text="앨범에서 선택하기" onClick={onSelect} />
            <Divider />
            <ActionSheetButton text="현재 사진 지우기" danger onClick={onRemove} />
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