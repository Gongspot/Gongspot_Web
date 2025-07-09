import SubMenu from "./SubMemu";
import Menu from "./Menu";

const MenuSection = () => {
    const Divider = () => (
        <div className="w-full mt-[1.25rem] border-b-[0.063rem] border-[#CCCCCC]" />
    );

    return (
        <>
            <Menu text="프로필 관리" />
            <SubMenu text="프로필 관리" link="/mypage/profile" />
            <Divider />

            <Menu text="공간 관리" />
            <div className="flex flex-col gap-[0.563rem]">
                <SubMenu text="내가 방문한 공간" link="/mypage/spaces/visit" />
                <SubMenu text="새 공간 등록 신청" link="/mypage/spaces/proposal" />
            </div>
            <Divider />

            <Menu text="알림 설정" />
            <SubMenu text="알림 설정" link="/mypage/push" />
            <Divider />

            <Menu text="포인트" />
            <div className="flex flex-col gap-[0.563rem]">
                <SubMenu text="나의 포인트" link="/mypage/point" />
                <SubMenu text="포인트 충전하기" link="/mypage/point/charge" />
            </div>
            <Divider />

            <Menu text="계정 관리" />
            <div className="flex flex-col gap-[0.563rem]">
                <SubMenu text="로그아웃" />
                <SubMenu text="회원 탈퇴" link="/mypage/withdrawal" />
            </div>
            <Divider />
        </>
    );
};

export default MenuSection;