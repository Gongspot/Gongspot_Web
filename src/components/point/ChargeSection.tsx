const ChargeSection = () => {
    return (
        <>
            <div
            className="flex items-center justify-between px-[1.875rem] my-[1.125rem] 
            text-[0.938rem]"
            >
                2P
                <button className="bg-[#4CB1F1] rounded-[1.25rem] px-[0.563rem] py-[0.25rem] text-white">200원</button>
            </div>
            <div className="w-full border-b-[0.031rem] border-[#CCCCCC]" />

            <div
            className="flex items-center justify-between px-[1.875rem] my-[1.125rem] 
            text-[0.938rem]"
            >
                10P
                <button className="bg-[#4CB1F1] rounded-[1.25rem] px-[0.563rem] py-[0.25rem] text-white">1,000원</button>
            </div>
            <div className="w-full border-b-[0.031rem] border-[#CCCCCC]" />

            <div
            className="flex items-center justify-between px-[1.875rem] my-[1.125rem] 
            text-[0.938rem]"
            >
                20P
                <button className="bg-[#4CB1F1] rounded-[1.25rem] px-[0.563rem] py-[0.25rem] text-white">2,000원</button>
            </div>
            <div className="w-full border-b-[0.031rem] border-[#CCCCCC]" />

            <div
            className="flex items-center justify-between px-[1.875rem] my-[1.125rem] 
            text-[0.938rem]"
            >
                50P
                <button className="bg-[#4CB1F1] rounded-[1.25rem] px-[0.563rem] py-[0.25rem] text-white">5,000원</button>
            </div>
            <div className="w-full border-b-[0.031rem] border-[#CCCCCC]" />
        </>
    );
};

export default ChargeSection;