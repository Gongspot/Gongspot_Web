import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNoticeDetail } from "../../apis/mypage/notice";
import type { NoticeDetail } from "../../types/mypage";
import NoticeDetailView from "../../components/admin/notice/NoticeDetailView";
import { deleteNotice } from "../../apis/admin";

const AdminNoticeDetailPage = () => {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<NoticeDetail | null>(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await getNoticeDetail(Number(notificationId));
        if (data.isSuccess) {
          setNotice(data.result);
        }
      } catch (e) {
        console.error("Error fetching notices:", e);
      }
    };
    fetchNotice();
  }, [notificationId]);

  const handleDelete = async () => {
    if (!notificationId) return;

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const res = await deleteNotice(Number(notificationId));
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

  if (!notice) return null;

  return (
    <>
      <NoticeDetailView
        notice={notice}
        onEditClick={() => navigate(`/admin/notices/edit/${notificationId}`)}
        onDeleteClick={handleDelete}
      />
    </>
  );
};

export default AdminNoticeDetailPage;
