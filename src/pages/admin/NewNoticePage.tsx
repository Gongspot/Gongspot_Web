import { useNavigate } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import DragDrop from "../../components/admin/notice/DragDrop";
import NoticeForm from "../../components/admin/notice/NoticeForm";
import { useState } from "react";

const NewNoticePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    alert("공지사항 작성이 완료되었습니다.");
    navigate("/admin/notices");
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
        <DragDrop file={file} onFileChange={setFile} />
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