import TopHeader from "../../components/TopHeader";
import ContentSection from "../../components/mypage/notice/ContentSection";
import TitleSection from "../../components/admin/notice/TitleSection";
import NextButton from "../../components/NextButton";
import { useNavigate } from "react-router-dom";

const AdminNoticeDetailPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex-1">
        <TopHeader title="공지사항" backButton={true} />
        <TitleSection />
        <div className="w-full border-b-[0.063rem] border-[#CCCCCC]" />
        <ContentSection />
      </div>
      <div className="flex gap-[0.375rem] w-full px-[1.75rem] pb-[0.625rem]">
          <button
              className="w-full py-[0.875rem] bg-[#4CB1F1] text-white text-[1rem] rounded-[0.313rem]"
          >
            수정하기
          </button>
          <button
              className="w-full py-[0.875rem] bg-[#4CB1F1] text-white text-[1rem] rounded-[0.313rem]"
          >
            삭제하기
          </button>
      </div>
      <NextButton
        text="목록으로 돌아가기"
        className="w-full py-[0.875rem] border-[1px] border-solid border-[#CCCCCC] text-[#8F9098] text-[1rem] rounded-[0.313rem]"
        onClick={() => {
          navigate("/admin/notices/all");
        }}
      />
    </div>
  );
};

export default AdminNoticeDetailPage;
