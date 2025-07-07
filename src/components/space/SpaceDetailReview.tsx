import React from "react";
import type { Space } from "../../constants/dummySpaces";
import type { Review } from "../../constants/dummyReviews";

const SpaceDetailReview: React.FC<{ space: Space; reviews: Review[] }> = ({ space, reviews }) => (
  <div className="px-5 py-4">
    {/* 평점 통계 */}
    <div className="flex items-center gap-4 mb-4">
      <div>
        <div className="text-3xl font-bold text-sky-500">{space.reviewStats.score}점</div>
        <div className="text-sm text-gray-400">전체 평점</div>
      </div>
      <div>
        {space.reviewStats.counts.map((c, i) => (
          <div key={i} className="flex items-center text-xs text-gray-600">
            <span>{5-i}점</span>
            <div className="w-32 mx-2 h-2 rounded bg-gray-100">
              <div className="bg-sky-300 h-2 rounded" style={{ width: `${c * 10}%` }} />
            </div>
            <span>{c}명</span>
          </div>
        ))}
      </div>
    </div>
    {/* 태그 */}
    <div className="flex gap-2 mb-4">
      {space.reviewStats.tags.map((t, i) => (
        <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs">{t.label}({t.count})</span>
      ))}
    </div>
    {/* 리뷰목록 */}
    {reviews.map(r => (
      <div key={r.id} className="bg-gray-100 rounded-lg p-4 mb-3">
        <div className="flex items-center mb-1">
          <span className="font-medium mr-2">{r.user}</span>
          <span className="text-xs text-gray-400">{r.date}</span>
          <span className="ml-3 flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width={12} height={12}>
                <circle
                  cx={6}
                  cy={6}
                  r={5}
                  fill={i < r.rating ? "#4CB1F1" : "#E5E7EB"}
                />
              </svg>
            ))}
          </span>
        </div>
        <div className="text-xs">{r.text}</div>
      </div>
    ))}
  </div>
);

export default SpaceDetailReview;
