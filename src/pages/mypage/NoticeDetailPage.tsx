import { useNavigate, useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import ContentSection from "../../components/mypage/notice/ContentSection";
import TitleSection from "../../components/mypage/notice/TitleSection";
import { getNoticeDetail } from "../../apis/mypage/notice";
import { useEffect, useState } from "react";
import type { NoticeDetail } from "../../types/mypage";
import AttachmentSection from "../../components/mypage/notice/AttachmentSection";
import NextButton from "../../components/NextButton";

const NoticeDetailPage = () => {
  const { notificationId } = useParams();
  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await getNoticeDetail(Number(notificationId));
        if (data.isSuccess) {
          setNotice(data.result);
          console.log("Notice data fetched successfully:", data.result);
        }
      } catch (e) {
        console.error("Error fetching notices:", e);
      }
    };
    fetchNotice();
  }, [notificationId]);

  return (
    <>
      <div className="flex flex-col min-h-screen w-full bg-white">
        <TopHeader title="공지사항" backButton={true} />
        <TitleSection title={notice?.title} date={notice?.date} />
        <div className="w-full border-b-[0.063rem] border-[#CCCCCC]" />
        <div className="flex-1">
          <ContentSection content={notice?.content} />
          {notice?.attachments
            ?.filter((file) =>
              /\.(jpg|jpeg|png|gif|webp)$/i.test(file.fileName)
            )
            .map((file) => (
              <img
                key={file.attachmentId}
                src={file.url}
                alt={file.fileName}
                className="w-full object-contain mt-[0.5rem]"
              />
          ))}
        </div>
        <AttachmentSection attachments={notice?.attachments} />
        <NextButton
          text="목록으로 돌아가기"
          className="w-full leading-[2.875rem] border-[1px] border-solid border-[#CCCCCC] text-[#8F9098] text-[1rem] rounded-[0.313rem]"
          onClick={() => {
            navigate("/mypage/notices");
          }}
        />
      </div>
    </>
  );
};

export default NoticeDetailPage;
