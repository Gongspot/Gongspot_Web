import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBannerDetail } from "../../apis/mypage/notice";
import type { Banner } from "../../types/mypage";
import BannerDetailView from "../../components/admin/notice/BannerDetailView";

const AdminBannerDetailPage = () => {
  const { bannerId } = useParams();
  const navigate = useNavigate();
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

  if (!banner) return null;

  return (
    <>
      <BannerDetailView
        banner={banner}
        onEditClick={() => navigate(`/admin/banners/edit/${bannerId}`)}
        onDeleteClick={() => alert("삭제 기능 구현 필요")}
      />
    </>

  );
};

export default AdminBannerDetailPage;
