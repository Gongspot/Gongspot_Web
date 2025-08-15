import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNoticeDetail } from "../../apis/mypage/notice";
import type { NoticeDetail } from "../../types/mypage";
import { patchNotice } from "../../apis/admin";
import NoticeDetailView from "../../components/admin/notice/NoticeDetailView";
import NoticeEditView from "../../components/admin/notice/NoticeEditView";

const AdminNoticeDetailPage = () => {
  const { notificationId } = useParams();
  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [attachments, setAttachments] = useState<File[] | null>(null);
  const [form, setForm] = useState({ title: "", category: "", content: "" });

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await getNoticeDetail(Number(notificationId));
        if (data.isSuccess) {
          setNotice(data.result);
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

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setIsEditMode(false);
    } catch (e) {
      console.error(e);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  if (!notice) return null;

  return (
    <>
      {isEditMode ? (
        <NoticeEditView
          form={form}
          attachments={attachments}
          onChange={handleChange}
          onFileChange={setAttachments}
          onSubmit={handleUpdate}
        />
      ) : (
      <NoticeDetailView
        notice={notice}
        onEditClick={() => setIsEditMode(true)}
        onDeleteClick={() => alert("삭제 기능 구현 필요")}
      />
      )}
    </>
  );
};

export default AdminNoticeDetailPage;
