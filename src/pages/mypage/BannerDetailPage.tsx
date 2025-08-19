import TopHeader from "../../components/TopHeader";
import ContentSection from "../../components/mypage/notice/ContentSection";
import TitleSection from "../../components/admin/notice/TitleSection";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBannerDetail } from "../../apis/mypage/notice";
import type { Banner } from "../../types/mypage";
import AttachmentSection from "../../components/mypage/notice/AttachmentSection";

const BannerDetailPage = () => {
  const { bannerId } = useParams();
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBannerDetail(Number(bannerId));
        if (data.isSuccess) {
          setBanner(data.result);
        }
      } catch (e) {
        console.error("Error fetching banners:", e);
      }
    };
    fetchBanner();
  }, [bannerId]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <div className="flex-1">
        <TopHeader title="공지사항" backButton={true} />
        <TitleSection type="배너" title={banner?.title} date={banner?.datetime} />
        <div className="w-full border-b-[0.063rem] border-[#CCCCCC]" />
        <ContentSection content={banner?.content} />
        {banner?.attachments
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
      <AttachmentSection attachments={banner?.attachments} />
    </div>
  );
};

export default BannerDetailPage;