import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBannerDetail } from "../../apis/mypage/notice";
import type { Banner } from "../../types/mypage";
import BannerDetailView from "../../components/admin/notice/BannerDetailView";
import { deleteBanner } from "../../apis/admin";

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
  
  const handleDelete = async () => {
    if (!bannerId) return;

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const res = await deleteBanner(Number(bannerId));
      console.log("Delete response:", res);
      if (res.isSuccess) {
        alert("삭제되었습니다.");
        navigate("/admin/notices");
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (!banner) return null;

  return (
    <>
      <BannerDetailView
        banner={banner}
        onEditClick={() => navigate(`/admin/banners/edit/${bannerId}`)}
        onDeleteClick={handleDelete}
      />
    </>

  );
};

export default AdminBannerDetailPage;
