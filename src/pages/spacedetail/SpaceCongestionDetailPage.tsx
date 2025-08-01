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
    <div className="max-w-[400px] mx-auto min-h-screen bg-white flex flex-col pb-10">
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
                   <div key={item.reviewId} className="flex items-center border border-gray-100 rounded-lg p-3 text-sm bg-white shadow-sm">
                    {item.profileImageUrl ? (
                      <img src={item.profileImageUrl} alt={item.nickname} className="w-8 h-8 rounded-full mr-3"/>
                    ) : (
                      <FaUserCircle size={32} className="text-gray-400 mr-3" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">{item.nickname}</span>
                        <span className="text-xs text-gray-400">{item.daytime} {item.datetime}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{item.congestion}</p>
                    </div>
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
              className="w-full py-2.5 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition disabled:bg-gray-300"
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