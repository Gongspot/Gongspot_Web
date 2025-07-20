// src/pages/admin/AllAdminRequestsPage.tsx (또는 홈 등에서)

import { useState } from "react";
import TopHeader from "../../components/TopHeader";
import AdminBottomNavBar from "../../components/AdminBottomNavBar";
import { adminRequests } from "../../constants/adminRequests";
import AdminRequestCard from "../../components/admin/home/AdminRequestCard";

const TABS = [
  { key: "pending", label: "미확인 요청" },
  { key: "reviewed", label: "검토완료 요청" },
];

const AllAdminRequestsPage = () => {
  const [tab, setTab] = useState<"pending" | "reviewed">("pending");

  // 탭별 데이터
  const filtered = adminRequests.filter((r) =>
    tab === "pending" ? !r.isReviewed : r.isReviewed
  );

  return (
    <div className="min-h-screen flex flex-col pb-44">
      <TopHeader title="모든 등록 요청 보기" backButton />
      <div className="flex-1 px-4 pt-2 pb-6">
        {/* 탭 */}
        <div className="flex justify-center items-center gap-6 border-b border-gray-200 mb-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`px-2 pb-2 text-base font-semibold transition ${
                tab === t.key
                  ? "border-b-2 border-[#4CB1F1] text-black"
                  : "text-gray-400"
              }`}
              onClick={() => setTab(t.key as "pending" | "reviewed")}
            >
              {t.label}
              {/* 뱃지 */}
              <span
                className={`ml-1 text-xs rounded-full px-2 py-[1px] ${
                  tab === t.key
                    ? "bg-[#4CB1F1] text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {t.key === "pending"
                  ? adminRequests.filter((r) => !r.isReviewed).length
                  : adminRequests.filter((r) => r.isReviewed).length}
              </span>
            </button>
          ))}
        </div>
        {/* 카드 리스트 or 없음 메시지 */}
        {filtered.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center pt-20 text-gray-400 text-sm">
            현재 아쉽게도 신규 등록 요청이 없습니다.
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((req) => (
              <AdminRequestCard
                key={req.id}
                id={req.id}  
                placeName={req.placeName}
                date={req.date}
                isReviewed={req.isReviewed}
                googleMapsUrl={req.googleMapsUrl}
              />
            ))}
          </div>
        )}
      </div>
      <AdminBottomNavBar />
    </div>
  );
};

export default AllAdminRequestsPage;
