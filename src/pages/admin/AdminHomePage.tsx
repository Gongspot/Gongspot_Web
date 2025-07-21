// src/pages/admin/AdminHomePage.tsx

import { useNavigate } from "react-router-dom";
import AdminBottomNavBar from "../../components/AdminBottomNavBar";
import TopNavBar from "../../components/TopNavBar";
import { adminRequests } from "../../constants/adminRequests";
import AdminRequestCard from "../../components/admin/home/AdminRequestCard";
import { FaPen, FaClock } from "react-icons/fa";

const AdminHomePage = () => {
  const navigate = useNavigate();

  // 미확인 등록 요청 (isReviewed: false)
  const unreviewed = adminRequests.filter((r) => !r.isReviewed);

  // 전체 등록 요청/승인 대기 숫자는 더미값
  const totalRequests = 12;
  const pendingRequests = 8;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC]">
      <TopNavBar />

      {/* 상단 통계 */}
      <div className="flex justify-between items-center bg-white border-b border-gray-300 shadow-sm mb-4 px-16 py-10">
        <div className="flex flex-col items-center ml-7">
          <div className="text-2xl font-bold">
            {totalRequests}
          </div>
          <div className="text-xs text-gray-500 font-medium">등록 요청</div>
        </div>
        <div className="w-[1px] h-8 bg-gray-200 mx-4" />
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">
            {pendingRequests}
          </div>
          <div className="text-xs text-gray-500 font-medium">승인 대기</div>
        </div>
      </div>

      {/* 빠른 작업 */}
      <div className="px-5 py-2 mb-4">
        <div className="text-m font-bold text-left">빠른 작업</div>
        <div className="flex gap-4 my-5">
          <button
            onClick={() => navigate("/admin/create-space")} // 경로 연결 추가
            className="bg-white flex flex-col items-center w-28 h-28 py-8 rounded-xl shadow-sm border border-[#E7EDF3] transition"
          >
            <FaPen className="text-[#737373] mb-1" size={24} />
            <span className="text-sm text-[#737373] font-semibold">
              새 공간 등록
            </span>
          </button>
          <button
            onClick={() => navigate("/admin/search-space")}
            className="bg-white flex flex-col items-center w-28 h-28 py-8 rounded-xl shadow-sm border border-[#E7EDF3] transition"
          >
            <FaClock className="text-[#737373] mb-1" size={24} />
            <span className="text-sm text-[#737373] font-semibold">
              등록 공간 수정
            </span>
          </button>
        </div>
      </div>

      {/* 미확인 등록 요청 */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-bold">미확인 등록 요청</span>
          <span className="text-xs bg-[#4CB1F1] text-white px-2 py-[2px] rounded-full font-medium">
            {unreviewed.length}개
          </span>
        </div>

        <div className="space-y-2 mb-3">
          {unreviewed.slice(0, 4).map((req) => (
            <AdminRequestCard
              key={req.id}
              id={req.id}  // ★ 반드시 추가!
              placeName={req.placeName}
              date={req.date}
              isReviewed={req.isReviewed}
              googleMapsUrl={req.googleMapsUrl}
            />
          ))}
        </div>
        {/* 더보기 버튼 */}
        {unreviewed.length > 4 && (
          <button
            className="w-full bg-white border border-[#E7EDF3] rounded-xl py-2 font-semibold text-gray-600 hover:bg-[#F3F7FA]"
            onClick={() => navigate("/admin/all-requests")}
          >
            더보기
          </button>
        )}
      </div>

      <AdminBottomNavBar />
    </div>
  );
};

export default AdminHomePage;
