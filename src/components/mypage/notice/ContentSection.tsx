interface ContentSectionProps {
    content?: string;
}

const ContentSection = ({ content }: ContentSectionProps) => {
    return (
        <>
            <div
            className="flex flex-col justify-center mt-[2rem] px-[1.5rem] my-[1.125rem] space-y-[0.625rem]"
            >
                <p className="text-[0.75rem] text-black whitespace-pre-line">{content ?? "내용 없음"}</p>
            </div>
        </>
    );
};

export default ContentSection;