import type { Attachments } from "../../../types/mypage";
import TopHeader from "../../TopHeader";
import DragDrop from "./DragDrop";
import NoticeForm from "./NoticeForm";

interface NoticeEditorProps {
  navTitle: string;
  form: { title: string; category: string; content: string };
  onChange: (key: string, value: string) => void;
  attachments: File[] | null;
  onFileChange: (files: File[] | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitText: string;
  isCategoryEditable?: boolean;
  existingAttachments?: Attachments[];
  onDeleteExistingAttachment?: (attachmentId: number) => void;
}

const NoticeEditor = ({
  navTitle,
  form,
  onChange,
  attachments,
  onFileChange,
  onSubmit,
  submitText,
  isCategoryEditable = true,
  existingAttachments = [],
  onDeleteExistingAttachment,
}: NoticeEditorProps) => {

  return (
    <form 
      onSubmit={onSubmit}
      className="flex flex-col min-h-screen bg-white"
    >
      <TopHeader title={navTitle} backButton={true} />

      <div className="flex flex-col h-full mt-[1rem] mb-[1.25rem] mx-[1.25rem] 
        px-[1.25rem] py-[1.5rem] bg-white border border-[#E5E7EB] rounded-[0.313rem]">
        <NoticeForm form={form} onChange={onChange} isCategoryEditable={isCategoryEditable} />
      </div>

      <div className="flex flex-col h-full mt-[1.125rem] mb-[1rem] mx-[1.25rem] 
        px-[1.25rem] py-[1.5rem] bg-white border border-[#E5E7EB] rounded-[0.313rem]">
        <p className="mb-[0.625rem] text-[1rem] text-black">첨부파일</p>
        <DragDrop 
          existingAttachments={existingAttachments}
          files={attachments}
          onFileChange={onFileChange}
          onDeleteExistingAttachment={onDeleteExistingAttachment}
        />
      </div>

      <button 
        type="submit"
        className="mb-[1.5rem] mx-[1.25rem] py-[0.875rem] rounded-[0.313rem] 
        bg-[#4CB1F1] text-white text-[1rem]"
        >
        {submitText}
      </button>
    </form>
  );
};

export default NoticeEditor;