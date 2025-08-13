import { useState } from "react";
import { useLocation } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import AdminBottomNavBar from "../../components/AdminBottomNavBar";
import AdminRequestCard from "../../components/admin/home/AdminRequestCard";
import { useQuery } from "@tanstack/react-query";
import { getProposals } from "../../apis/admin";
import { format } from 'date-fns';

const TABS = [
  { key: "pending", label: "검토 전 요청", approve: false },
  { key: "reviewed", label: "검토완료 요청", approve: true },
];

const AllAdminRequestsPage = () => {
  const location = useLocation();
  const defaultTab = location.state?.defaultTab === "reviewed" ? "reviewed" : "pending";
  const [tab, setTab] = useState<"pending" | "reviewed">(defaultTab);
  const [currentPage, setCurrentPage] = useState(0);

  const approveStatus = tab === 'reviewed';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['proposals', approveStatus, currentPage],
    queryFn: () => getProposals({ approve: approveStatus, page: currentPage }),
  });

  const proposals = data?.result.result || [];
  const pageInfo = data?.result.pageInfo;

  return (
    <div className="min-h-screen flex flex-col pb-14">
      {/* 상단 고정 영역 */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <TopHeader title="모든 등록 요청 보기" backButton />
        {/* 탭 */}
        <div className="flex justify-center items-center gap-6 border-b border-gray-200 px-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`px-2 py-3 text-base font-semibold transition ${
                tab === t.key
                  ? "border-b-2 border-[#4CB1F1] text-black"
                  : "text-gray-400 border-b-2 border-transparent"
              }`}
              onClick={() => {
                setTab(t.key as "pending" | "reviewed");
                setCurrentPage(0);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
        {isLoading && <div className="text-center pt-20">요청 목록을 불러오는 중...</div>}
        {isError && <div className="text-center pt-20 text-red-500">오류가 발생했습니다.</div>}

        {!isLoading && !isError && (
          proposals.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center pt-20 text-gray-400 text-sm">
              현재 해당 상태의 신규 등록 요청이 없습니다.
            </div>
          ) : (
            <div className="space-y-2">
              {proposals.map((req) => (
                <AdminRequestCard
                  key={req.proposalId}
                  id={req.proposalId}
                  placeName={req.name}
                  date={format(new Date(req.createdAt), 'yyyy.MM.dd')}
                  isReviewed={approveStatus}
                  googleMapsUrl={req.link}
                />
              ))}
            </div>
          )
        )}

        {/* 페이지네이션 */}
        {pageInfo && pageInfo.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-8">
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 0}
              className="px-4 py-2 text-sm font-semibold text-gray-800 transition disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              이전
            </button>
            <span className="font-bold text-gray-600">
              {currentPage + 1} / {pageInfo.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage + 1 >= pageInfo.totalPages}
              className="px-4 py-2 text-sm font-semibold text-gray-800 transition disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        )}
      </div>
      <AdminBottomNavBar />
    </div>
  );
};

export default AllAdminRequestsPage;
