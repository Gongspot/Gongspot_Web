interface TitleSectionProps {
    title?: string;
    date?: string;
}

const TitleSection = ({ title, date }: TitleSectionProps) => {
    return (
        <>
            <div
            className="flex flex-col justify-center mt-[2rem] mb-[1.125rem] px-[1.5rem] space-y-[0.625rem]"
            >
                <h1 className="text-[1.125rem] text-black">{title ?? "제목 없음"}</h1>
                <p className="text-[#8F9098]">{date ?? "날짜 없음"}</p>
            </div>
        </>
    );
};

export default TitleSection;