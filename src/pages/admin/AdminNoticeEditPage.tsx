import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNoticeDetail } from "../../apis/mypage/notice";
import { patchNotice } from "../../apis/admin";
import NoticeEditor from "../../components/admin/notice/NoticeEditor";

const AdminNoticeEditPage = () => {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState<File[] | null>(null);
  const [form, setForm] = useState({ title: "", category: "", content: "" });

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await getNoticeDetail(Number(notificationId));
        if (data.isSuccess) {
          setForm({
            title: data.result.title,
            category: "일반",
            content: data.result.content,
          });
        }
      } catch (e) {
        console.error("Error fetching notices:", e);
      }
    };
    fetchNotice();
  }, [notificationId]);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (files: File[] | null) => setAttachments(files);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const json = { title: form.title, content: form.content };

      formData.append(
        "request",
        new Blob([JSON.stringify(json)], { type: "application/json" })
      );

      if (attachments && attachments.length > 0) {
        attachments.forEach(file => formData.append("attachments", file));
      }

      await patchNotice(formData, Number(notificationId));
      alert("공지사항이 수정되었습니다.");
      navigate(`/admin/notices/${notificationId}`);
    } catch (e) {
      console.error(e);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <NoticeEditor
      navTitle="공지사항 수정"
      form={form}
      onChange={handleChange}
      attachments={attachments}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
      submitText="저장하기"
      isCategoryEditable={false}
    />
  );
};

export default AdminNoticeEditPage;
