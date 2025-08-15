import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNoticeDetail } from "../../apis/mypage/notice";
import type { NoticeDetail } from "../../types/mypage";
import NoticeDetailView from "../../components/admin/notice/NoticeDetailView";

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

  if (!notice) return null;

  return (
    <>
      <NoticeDetailView
        notice={notice}
        onEditClick={() => navigate(`/admin/notices/edit/${notificationId}`)}
        onDeleteClick={() => alert("삭제 기능 구현 필요")}
      />
    </>
  );
};

export default AdminNoticeDetailPage;
