const ContentSection = () => {
    const nickname = "카공족";
    
    return (
        <>
            <div
            className="flex flex-col justify-center px-[1.5rem] text-black"
            >
                <h1 className="my-[1.625rem] text-[1.125rem]">{nickname}님,<br />공스팟 탈퇴 전 확인해세요!</h1>
                <p className="text-[0.75rem]">공간추천을 위한 공간 이용 정보 (공간 찜하기, 리뷰, 공간 사용 기록)<br /> 
                등은 탈퇴 후 삭제됩니다.<br /><br />
                보유하셨던 포인트는 삭제되며, 환불되지 않습니다.<br /><br />
                거래 정보는 전자 상거래 등에서 소비자 보호에 대한 법률에 따라 탈퇴 후 5년간 보존됩니다.<br /><br />
                회원 탈퇴 후 공스팟 내에 입력된 리뷰 등은 삭제되지 않습니다.</p>
            </div>
        </>
    );
};

export default ContentSection;