const ContentSection = () => {
    const content = "안녕하세요, 공스팟입니다. \n\n공스팟은 청년들을 위한 맞춤형 학습 공간을 추천해드리기 위해 만들어졌습니다. 학습 공간의 실시간 정보와 생생한 사용자 후기를 제공하여 모두가 각자의 공부 스타일과 목적에 맞는 학습 공간을 쉽게 찾을 수 있게 하고자 합니다.";

    return (
        <>
            <div
            className="flex flex-col justify-center mt-[2rem] px-[1.5rem] my-[1.125rem] space-y-[0.625rem]"
            >
                <p className="text-[0.75rem] text-black whitespace-pre-line">{content}</p>
            </div>
        </>
    );
};

export default ContentSection;