import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBannerDetail } from "../../apis/mypage/notice";
import { patchBanner } from "../../apis/admin";
import NoticeEditor from "../../components/admin/notice/NoticeEditor";

const AdminBannerEditPage = () => {
  const { bannerId } = useParams();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<File[] | null>(null);
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
      onThumbnailChange={setThumbnail}
    />
  );
};

export default AdminBannerEditPage;
