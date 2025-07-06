interface DetailItemProps {
    point: string;
    text: string
    date: string;
}

const DetailItem = ({ point, text, date }: DetailItemProps) => {
    return (
        <>
            <div
            className="my-[1.125rem] flex items-center justify-between px-[1.875rem] text-[0.938rem]"
            >
                <p>{point}P</p>
                <p className="pl-[5rem] absolute left-0">{text}</p>
                <p className="text-[#8F9098]">{date}</p>
                </div>
            <div className="w-full border-b-[0.031rem] border-[#CCCCCC]" />
        </>
    );
};

export default DetailItem;