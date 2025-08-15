import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postNotice } from "../../apis/admin";
import NoticeEditor from "../../components/admin/notice/NoticeEditor";

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
    <NoticeEditor
      navTitle="공지사항 작성"
      form={form}
      onChange={handleChange}
      attachments={attachments}
      onFileChange={setAttachments}
      onSubmit={handleSubmit}
      submitText="게시하기"
    />
  );
};

export default NewNoticePage;