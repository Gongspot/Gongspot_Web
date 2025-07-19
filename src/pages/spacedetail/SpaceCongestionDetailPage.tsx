import React from "react";
import { useParams } from "react-router-dom";
import dummySpaces from "../../constants/dummySpaces";
import TopHeader from "../../components/TopHeader";
import SpaceCongestionCard from "../../components/homepage/SpaceCongestionCard";
import type { RealTimeCongestion } from "../../constants/dummySpaces";

// 날짜별로 묶기
function groupByDate(arr: RealTimeCongestion[]) {
  const map = new Map<string, RealTimeCongestion[]>();
  arr.forEach((c) => {
    if (!map.has(c.date)) map.set(c.date, []);
    map.get(c.date)!.push(c);
  });
  // 최신 날짜부터 (내림차순)
  return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const yoil = "일월화수목금토"[date.getDay()];
  return `${String(date.getFullYear()).slice(2)}.${date.getMonth() + 1}.${date.getDate()}.${yoil}`;
}

// 블러 기준일
const BLUR_DATE = "2025-07-05";

const SpaceCongestionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const space = dummySpaces.find((s) => s.id === Number(id));

  if (!space) {
    return (
      <div>
        <TopHeader title="실시간 혼잡도" />
        <div className="p-8 text-center text-gray-500">공간을 찾을 수 없습니다.</div>
      </div>
    );
  }

  const grouped = groupByDate(space.realTimeCongestion);

  return (
    <div className="max-w-[400px] mx-auto min-h-screen bg-white flex flex-col pb-10">
      <TopHeader title="실시간 혼잡도" />
      <div className="px-4 py-4 flex-1 overflow-y-auto">
        {grouped.length === 0 ? (
          <div className="text-center text-gray-400 pt-20">혼잡도 내역이 없습니다.</div>
        ) : (
          grouped.map(([date, list]) => {
            // 블러처리 여부: 7월 5일 이후(크다)면 블러!
            const isBlur = date > BLUR_DATE;
            return (
              <div key={date} className="mb-8 relative">
                {/* 날짜 타이틀 */}
                <div className="font-semibold text-[15px] mb-2 mt-2">{formatDate(date)}</div>
                {/* 카드 리스트 전체에 blur! */}
                <div className={`flex flex-col gap-2 ${isBlur ? "filter blur-[4px] pointer-events-none select-none" : ""}`}>
                  {list.map((c, idx) => (
                    <SpaceCongestionCard
                      key={idx}
                      type={c.type}
                      comment={c.comment}
                      date={c.date}
                      ago={c.ago}
                    />
                  ))}
                </div>
                {/* 블러일 때 오버레이 */}
                {isBlur && (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center border border-gray-200 rounded-lg"
                    style={{
                      zIndex: 10,
                      background: "rgba(255,255,255,0.60)",
                    }}
                  >
                    <span className="text-[13px] font-semibold flex items-center gap-2 ">
                      2P를 사용해 24시간 동안 열람
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SpaceCongestionDetailPage;
