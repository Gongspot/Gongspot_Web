import Category from "./Category";

const TitleSection = () => {
    const category = "일반";

    return (
        <>
            <div
            className="flex flex-col justify-center mt-[2rem] mb-[1.125rem] px-[1.5rem] space-y-[0.625rem]"
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-[1.125rem] text-black font-medium">[안내] 공스팟 이용 관련 안내사항</h1>
                    <Category text={category} />
                </div>
                <p className="text-[#8F9098]">25.05.04</p>
            </div>
        </>
    );
};

export default TitleSection;