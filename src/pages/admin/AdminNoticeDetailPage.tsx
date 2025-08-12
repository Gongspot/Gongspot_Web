import TopHeader from "../../components/TopHeader";
import ContentSection from "../../components/mypage/notice/ContentSection";
import TitleSection from "../../components/admin/notice/TitleSection";
import NextButton from "../../components/NextButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNoticeDetail } from "../../apis/mypage/notice";
import type { NoticeDetail } from "../../types/mypage";

const AdminNoticeDetailPage = () => {
  const { notificationId } = useParams();
  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await getNoticeDetail(Number(notificationId));
        if (data.isSuccess) {
          setNotice(data.result);
        }
      } catch (e) {
        console.error("Error fetching notices:", e);
      }
    };
    fetchNotice();
  }, [notificationId]);
  
  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex-1">
        <TopHeader title="공지사항" backButton={true} />
        <TitleSection type="일반" title={notice?.title} date={notice?.date} />
        <div className="w-full border-b-[0.063rem] border-[#CCCCCC]" />
        <ContentSection content={notice?.content} />
      </div>
      <div className="flex gap-[0.375rem] w-full px-[1.75rem] pb-[0.625rem]">
          <button
              className="w-full leading-[2.875rem] bg-[#4CB1F1] text-white text-[1rem] rounded-[0.313rem]"
          >
            수정하기
          </button>
          <button
              className="w-full leading-[2.875rem] bg-[#4CB1F1] text-white text-[1rem] rounded-[0.313rem]"
          >
            삭제하기
          </button>
      </div>
      <NextButton
        text="목록으로 돌아가기"
        className="w-full leading-[2.875rem] border-[1px] border-solid border-[#CCCCCC] text-[#8F9098] text-[1rem] rounded-[0.313rem]"
        onClick={() => {
          navigate("/admin/notices/all");
        }}
      />
    </div>
  );
};

export default AdminNoticeDetailPage;
