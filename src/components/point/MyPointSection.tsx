interface MyPointSectionProps {
    point: number;
}

const MyPointSection = ({ point }: MyPointSectionProps) => {
    return (
        <div
            className="flex flex-col items-center justify-center
            mt-[2.5rem] pt-[3.375rem] pb-[2.25rem]"
        >
            <h1 className="text-[2rem]">
                <span className="text-[2.5rem] font-bold">{point}</span>P
            </h1>
            <button
                className="mt-[1.75rem] px-[1.125rem] py-[0.625rem] bg-white 
                border border-[#B1B8C1] rounded-[1.875rem] text-[0.938rem]"
                onClick={() => alert("포인트 충전 기능은 추후 구현 예정입니다.")}
            >
                광고 보고 포인트 획득하기
            </button>
        </div>
    );
};

export default MyPointSection;