import SubMenu from "./SubMemu";
import Menu from "./Menu";

const MenuSection = () => {
    const Divider = () => (
        <div className="w-full mt-[1.25rem] border-b-[0.063rem] border-[#CCCCCC]" />
    );

    return (
        <>
            <Menu text="프로필 관리" />
            <SubMenu text="프로필 관리" />
            <Divider />

            <Menu text="공관 관리" />
            <div className="flex flex-col gap-[0.563rem]">
                <SubMenu text="내가 방문한 공간" />
                <SubMenu text="새 공간 등록 신청" />
            </div>
            <Divider />

            <Menu text="알림 설정" />
            <SubMenu text="알림 설정" />
            <Divider />

            <Menu text="포인트" />
            <div className="flex flex-col gap-[0.563rem]">
                <SubMenu text="나의 포인트" />
                <SubMenu text="포인트 충전하기" />
            </div>
        </>
    );
};

export default MenuSection;