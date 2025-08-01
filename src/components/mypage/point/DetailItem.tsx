interface DetailItemProps {
    point: number;
    text: string
    date: string;
}

const DetailItem = ({ point, text, date }: DetailItemProps) => {
    return (
        <>
            <div
            className="my-[1.125rem] flex items-center justify-between px-[1.875rem] text-[0.938rem]"
            >
                <p className={point > 0 ? "text-[#4CB1F1]" : "text-black"}>
                    {point > 0 ? `+${point}P` : `${point}P`}
                </p>
                <p className="pl-[5.5rem] absolute left-0">{text}</p>
                <p className="text-[#8F9098]">{date}</p>
                </div>
            <div className="w-full border-b-[0.031rem] border-[#B1B8C154]" />
        </>
    );
};

export default DetailItem;