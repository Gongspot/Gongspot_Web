import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import { useCongestions } from "../../hooks/useCongestions";
import { FaUserCircle } from "react-icons/fa";

const SpaceCongestionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCongestions(id);


  const allCongestionGroups = data?.pages.flatMap(page => page.result.congestionList) || [];

  return (
    <div className="max-w-[400px] mx-auto min-h-screen bg-gray-50 flex flex-col pb-14">
      <TopHeader title="실시간 혼잡도" />
      <div className="px-4 py-4 flex-1 overflow-y-auto">
        {isLoading && <div className="text-center pt-20">로딩 중...</div>}
        {isError && <div className="text-center pt-20 text-red-500">오류가 발생했습니다.</div>}
        
        {!isLoading && !isError && allCongestionGroups.length === 0 ? (
          <div className="text-center text-gray-400 pt-20">혼잡도 내역이 없습니다.</div>
        ) : (
          allCongestionGroups.map((group, groupIndex) => (
            <div key={`${group.date}-${groupIndex}`} className="mb-8">
              <div className="font-semibold text-[15px] mb-2 mt-2">{group.date}</div>
              <div className="flex flex-col gap-2">
                {group.dateCongestionList.map((item) => (
                   <div key={item.reviewId} className="flex items-center border border-gray-200 rounded-xl p-3 text-sm bg-white shadow-sm">
                    {item.profileImageUrl ? (
                      <img src={item.profileImageUrl} alt={item.nickname} className="w-8 h-8 rounded-full mr-3"/>
                    ) : (
                      <FaUserCircle size={32} className="text-gray-300 mr-3" />
                    )}
                    <span className="font-semibold text-gray-800 w-16 truncate">{item.nickname}</span>
                    <span className="flex-1 text-gray-700 mx-2 truncate">{item.congestion}</span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {item.daytime} {item.datetime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        {/* '더보기' 버튼 UI */}
        <div className="mt-4">
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="w-full py-2.5 bg-white text-[#8F9098] border border-[#CCCCCC] rounded-lg font-semibold transition hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200"
            >
              {isFetchingNextPage ? '불러오는 중...' : '더보기'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceCongestionDetailPage;
