import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import ContentSection from "../../components/mypage/notice/ContentSection";
import TitleSection from "../../components/mypage/notice/TitleSection";
import { getNoticeDetail } from "../../apis/mypage/notice";
import { useEffect, useState } from "react";
import type { NoticeDetail } from "../../types/mypage";
import AttachmentSection from "../../components/mypage/notice/AttachmentSection";

const NoticeDetailPage = () => {
  const { notificationId } = useParams();
  const [notice, setNotice] = useState<NoticeDetail | null>(null);

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
    <>
      <div className="flex flex-col h-screen w-full bg-white">
        <TopHeader title="공지사항" backButton={true} />
        <TitleSection title={notice?.title} date={notice?.date} />
        <div className="w-full border-b-[0.063rem] border-[#CCCCCC]" />
        <ContentSection content={notice?.content} />
      </div>
      <AttachmentSection attachments={notice?.attachments} />
    </>
  );
};

export default NoticeDetailPage;
