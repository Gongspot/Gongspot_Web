import React from "react";
import type { Review } from "../../constants/dummyReviews";

const SpaceDetailReview: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <div className="p-8 text-center text-gray-400">리뷰 정보가 없습니다.</div>;
  }
  return (
    <div className="px-5 py-4">
      {reviews.map((r) => (
        <div key={r.id} className="bg-white border rounded-lg p-4 mb-3">
          <div className="flex items-center mb-1">
            <span className="font-medium mr-2">{r.user}</span>
            <span className="text-xs text-gray-400">{r.date}</span>
            {/* 별점 */}
            <span className="ml-3 flex items-center gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < r.rating ? "text-sky-400" : "text-gray-300"}
                  style={{ fontSize: 13, marginRight: 2 }}
                >★</span>
              ))}
            </span>
          </div>
          <div className="text-xs">{r.text}</div>
        </div>
      ))}
    </div>
  );
};

export default SpaceDetailReview;
