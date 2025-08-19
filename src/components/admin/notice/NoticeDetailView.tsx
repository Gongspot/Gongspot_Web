import { useNavigate } from "react-router-dom";
import type { NoticeDetail } from "../../../types/mypage";
import TopHeader from "../../TopHeader";
import TitleSection from "./TitleSection";
import ContentSection from "../../mypage/notice/ContentSection";
import AttachmentSection from "../../mypage/notice/AttachmentSection";
import NextButton from "../../NextButton";

interface Props {
  notice: NoticeDetail;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const NoticeDetailView = ({ notice, onEditClick, onDeleteClick }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex-1">
        <TopHeader title="공지사항" backButton={true} />
        <TitleSection type="일반" title={notice?.title} date={notice?.date} />
        <div className="w-full border-b-[0.063rem] border-[#CCCCCC]" />
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
      <div className="flex gap-[0.375rem] w-full px-[1.75rem] pb-[0.625rem]">
          <button
            className="w-full leading-[2.875rem] bg-[#4CB1F1] text-white text-[1rem] rounded-[0.313rem]"
            onClick={onEditClick}
          >
            수정하기
          </button>
          <button
            className="w-full leading-[2.875rem] bg-[#4CB1F1] text-white text-[1rem] rounded-[0.313rem]"
            onClick={onDeleteClick}
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

export default NoticeDetailView;
