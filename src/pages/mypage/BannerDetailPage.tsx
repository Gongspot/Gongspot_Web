import TopHeader from "../../components/TopHeader";
import ContentSection from "../../components/mypage/notice/ContentSection";
import TitleSection from "../../components/admin/notice/TitleSection";
import NextButton from "../../components/NextButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBannerDetail } from "../../apis/mypage/notice";
import type { Banner } from "../../types/mypage";

const BannerDetailPage = () => {
  const { bannerId } = useParams();
  const [banner, setBanner] = useState<Banner | null>(null);
  const navigate = useNavigate();

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
    <div className="flex flex-col h-screen w-full bg-white">
      <div className="flex-1">
        <TopHeader title="공지사항" backButton={true} />
        <TitleSection type="배너" title={banner?.title} date={banner?.datetime} />
        <div className="w-full border-b-[0.063rem] border-[#CCCCCC]" />
        <ContentSection content={banner?.content} />
      </div>
      <NextButton
        text="목록으로 돌아가기"
        className="w-full leading-[2.875rem] border-[1px] border-solid border-[#CCCCCC] text-[#8F9098] text-[1rem] rounded-[0.313rem]"
        onClick={() => {
          navigate("/mypage/notices");
        }}
      />
    </div>
  );
};

export default BannerDetailPage;
