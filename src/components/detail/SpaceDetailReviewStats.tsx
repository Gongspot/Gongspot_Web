import React from "react";
import type { Space } from "../../constants/dummySpaces";

const SpaceDetailReviewStats: React.FC<{ space: Space }> = ({ space }) => {
  if (!space.reviewStats) return null;
  return (
    <div className="px-5 py-4 border-b bg-white">
      <div className="flex items-center gap-4 mb-4">
        <div>
          <div className="text-3xl font-bold text-sky-500">
            {space.reviewStats.score}점
          </div>
          <div className="text-sm text-gray-400">전체 평점</div>
        </div>
        <div>
          {space.reviewStats.counts.map((c, i) => (
            <div key={i} className="flex items-center text-xs text-gray-600">
              <span>{5 - i}점</span>
              <div className="w-32 mx-2 h-2 rounded bg-gray-100">
                <div className="bg-sky-300 h-2 rounded" style={{ width: `${c * 10}%` }} />
              </div>
              <span>{c}명</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-2">
        {space.reviewStats.tags.map((t, i) => (
          <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs">
            {t.label}({t.count})
          </span>
        ))}
      </div>
    </div>
  );
};

export default SpaceDetailReviewStats;
