import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBannerDetail } from "../../apis/mypage/notice";
import { patchBanner } from "../../apis/admin";
import NoticeEditor from "../../components/admin/notice/NoticeEditor";
import type { Attachments, Thumbnail } from "../../types/mypage";

const AdminBannerEditPage = () => {
  const { bannerId } = useParams();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [existingThumbnail, setExistingThumbnail] = useState<Thumbnail | null>(null);
  const [attachments, setAttachments] = useState<File[] | null>(null);
  const [existingAttachments, setExistingAttachments] = useState<Attachments[]>([]);
  const [attachmentIdsToDelete, setAttachmentIdsToDelete] = useState<number[]>([]);
  const [form, setForm] = useState({ title: "", category: "", content: "" });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBannerDetail(Number(bannerId));
        if (data.isSuccess) {
          setForm({
            title: data.result.title,
            category: "배너",
            content: data.result.content,
          });
          if (data.result.thumbnail) {
            setExistingThumbnail(data.result.thumbnail);
          }
          if (data.result.attachments) {
            setExistingAttachments(data.result.attachments);
          }
        }
      } catch (e) {
        console.error("Error fetching banners:", e);
      }
    };
    fetchBanner();
  }, [bannerId]);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (files: File[] | null) => setAttachments(files);

  const handleDeleteExistingAttachment = (attachmentId: number) => {
    setExistingAttachments((prev) =>
      prev.filter((file) => file.attachmentId !== attachmentId)
    );
    setAttachmentIdsToDelete((prev) => [...prev, attachmentId]);
  };

  const handleThumbnailChange = (file: File | null) => {
    setThumbnail(file);
    if (file) { setExistingThumbnail(null); }
  };

  const handleDeleteExistingThumbnail = () => {
    setExistingThumbnail(null);
  };
console.log("existingThumbnail:", existingThumbnail);
console.log("thumbnail:", thumbnail);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const json = { title: form.title, content: form.content };

      formData.append(
        "request",
        new Blob([JSON.stringify(json)], { type: "application/json" })
      );

      if (attachmentIdsToDelete.length > 0) {
        formData.append(
          "attachmentIdsToDelete",
          new Blob([JSON.stringify(attachmentIdsToDelete)], {
            type: "application/json",
          })
        );
      }

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      if (attachments && attachments.length > 0) {
        attachments.forEach(file => formData.append("attachments", file));
      }

      await patchBanner(formData, Number(bannerId));
      alert("배너가 수정되었습니다.");
      navigate(`/admin/banners/${bannerId}`);
    } catch (e) {
      console.error(e);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <NoticeEditor
      navTitle="배너 수정"
      form={form}
      onChange={handleChange}
      attachments={attachments}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
      submitText="저장하기"
      isCategoryEditable={false}
      thumbnail={thumbnail}
      onThumbnailChange={handleThumbnailChange}
      existingAttachments={existingAttachments}
      onDeleteExistingAttachment={handleDeleteExistingAttachment}
      existingThumbnail={existingThumbnail}
      onDeleteExistingThumbnail={handleDeleteExistingThumbnail}
    />
  );
};

export default AdminBannerEditPage;
