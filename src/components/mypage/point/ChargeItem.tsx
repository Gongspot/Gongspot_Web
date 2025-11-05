interface ChargeItemProps {
    point: number;
    price: string;
}

const ChargeItem = ({ point, price }: ChargeItemProps) => {
    return (
        <>
            <div
            className="my-[1.125rem] flex items-center justify-between px-[1.875rem] text-[0.938rem]"
            onClick={() => alert("포인트 충전 기능은 추후 구현 예정입니다.")}
            >
                {point}P
                <button className="rounded-[1.25rem] bg-[#4CB1F1] px-[0.563rem] py-[0.25rem] text-white">
                    {price}
                </button>
                </div>
            <div className="w-full border-b-[0.031rem] border-[#B1B8C154]" />
        </>
    );
};

export default ChargeItem;