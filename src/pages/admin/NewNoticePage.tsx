import { useNavigate } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import DragDrop from "../../components/admin/notice/DragDrop";
import NoticeForm from "../../components/admin/notice/NoticeForm";
import { useState } from "react";
import { postNotice } from "../../apis/admin";

const NewNoticePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
  });

  const categoryMap: Record<string, string> = {
    "일반": "N",
    "배너": "B"
  };
  const categoryCode = categoryMap[form.category];

  const [attachments, setAttachments] = useState<File[] | null>(null);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const formData = new FormData();
      const json = {
        title: form.title,
        content: form.content
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(json)], { type: "application/json" })
      );

      if (attachments && attachments.length > 0) {
        Array.from(attachments).forEach(file => {
          formData.append("attachments", file);
        });
      }
      console.log("Attachments:", attachments);
      for (const key of formData.keys()) {
        console.log(key);
      }
      for (const value of formData.values()) {
        console.log(value);
      }

      await postNotice(formData, categoryCode);
      alert("공지사항 작성이 완료되었습니다.");
      navigate("/admin/notices");
    } catch (e) {
      console.error("Error fetching notices:", e);
      alert("공지사항 작성 중 오류가 발생했습니다.");
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col min-h-screen bg-white"
    >
      <TopHeader title="공지사항 작성" backButton={true} />

      <div className="flex flex-col h-full mt-[1rem] mb-[1.25rem] mx-[1.25rem] 
        px-[1.25rem] py-[1.5rem] bg-white border border-[#E5E7EB] rounded-[0.313rem]">
        <NoticeForm form={form} onChange={handleChange} />
      </div>

      <div className="flex flex-col h-full mt-[1.125rem] mb-[1rem] mx-[1.25rem] 
        px-[1.25rem] py-[1.5rem] bg-white border border-[#E5E7EB] rounded-[0.313rem]">
        <p className="mb-[0.625rem] text-[1rem] text-black">첨부파일</p>
        <DragDrop files={attachments} onFileChange={setAttachments} />
      </div>

      <button 
        type="submit"
        className="mb-[1.5rem] mx-[1.25rem] py-[0.875rem] rounded-[0.313rem] 
        bg-[#4CB1F1] text-white text-[1rem]"
        >
        게시하기
      </button>
    </form>
  );
};

export default NewNoticePage;