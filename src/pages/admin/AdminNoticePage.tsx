import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavBar from "../../components/TopNavBar";
import AdminBottomNavBar from "../../components/AdminBottomNavBar";
import { FaPen } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getNoticeAdmin } from "../../apis/admin";

const NOTICE_TABS = [
  { key: "all", label: "전체", apiValue: "ALL" },
  { key: "banner", label: "배너", apiValue: "B" },
  { key: "normal", label: "일반", apiValue: "N" },
] as const;

type TabKey = typeof NOTICE_TABS[number]['key'];

const AdminNoticePage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("all");

  const selectedApiValue = NOTICE_TABS.find(t => t.key === tab)?.apiValue || "ALL";

  const { data: notices, isLoading, isError } = useQuery({
    queryKey: ['adminNotices', selectedApiValue],
    queryFn: () => getNoticeAdmin(selectedApiValue),
    select: (data) => data.result.notificationBannerList,
  });

  // 수정 버튼 클릭 핸들러
  const handleEditClick = (e: React.MouseEvent, type: 'B' | 'N', id: number | null) => {
    e.stopPropagation(); // 카드 전체 클릭 이벤트 전파 방지
    if (!id) return;

    if (type === 'B') {
      navigate(`/admin/banners/edit/${id}`);
    } else {
      navigate(`/admin/notices/edit/${id}`);
    }
  };

  // 카드 클릭 핸들러
  const handleCardClick = (type: 'B' | 'N', id: number | null) => {
    if (!id) return;

    if (type === 'B') {
      navigate(`/admin/banners/${id}`);
    } else {
      navigate(`/admin/notices/${id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] pb-32">
      <TopNavBar />

      <div className="flex-1 px-4 py-4">
        {/* 공지 작성 버튼 */}
        <button
          className="w-full flex items-center gap-2 border border-[#D1E2FC] bg-white py-2 px-3 rounded-xl text-[#4CB1F1] font-semibold mb-4"
          onClick={() => navigate("/admin/notices/new")}
        >
          <FaPen className="text-[#4CB1F1]" />
          새 공지 작성하기
        </button>

        {/* 탭 버튼 */}
        <div className="flex gap-2 mb-4">
          {NOTICE_TABS.map((t) => (
            <button
              key={t.key}
              className={`rounded-full px-4 py-1 text-sm font-semibold border transition ${
                tab === t.key
                  ? "bg-[#EFF7FB] text-[#4CB1F1] border-[#4CB1F1]"
                  : "bg-white text-[#8F9098] border-[#D1E2FC]"
              }`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 공지 카드 리스트 */}
        <div className="space-y-4">
          {isLoading && <div className="text-center text-gray-500">로딩 중...</div>}
          {isError && <div className="text-center text-red-500">에러가 발생했습니다.</div>}
          {notices && notices.slice(0, 3).map((n) => (
            <div 
              key={`${n.type}-${n.notificationId || n.bannerId}`} 
              className="bg-white rounded-xl px-5 py-4 shadow-sm border border-[#E8E8E8] relative cursor-pointer"
              onClick={() => handleCardClick(n.type, n.type === 'B' ? n.bannerId : n.notificationId)}
            >
              <div className="flex gap-2 mb-2">
                <span className="text-xs px-2 py-[2px] rounded-full font-bold border text-[#8F9098] border-[#8F9098]">
                  {n.type === "B" ? "배너" : "일반"}
                </span>
              </div>
              <div className="font-bold text-base mb-2">{n.title}</div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{n.date}</span>
                <button 
                  className="text-xs text-[#A3A3A3] px-2 hover:text-black"
                  onClick={(e) => handleEditClick(e, n.type, n.type === 'B' ? n.bannerId : n.notificationId)}
                >
                  수정
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        {notices && notices.length > 3 && (
          <button
            className="w-full bg-white border border-[#E7EDF3] rounded-xl py-2 mt-6 font-semibold text-gray-600 hover:bg-[#F3F7FA]"
            onClick={() => navigate("/admin/notices/all")}
          >
            더보기
          </button>
        )}
      </div>
      <AdminBottomNavBar />
    </div>
  );
};

export default AdminNoticePage;
