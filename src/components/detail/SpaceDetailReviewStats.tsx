import React from 'react';
import type { RatingPercentages, CategoryCount } from '../../types/space';
import { FaStar } from 'react-icons/fa';

interface Props {
  placeId: number;
  averageRating: number;
  reviewCount: number;
  ratingPercentages: RatingPercentages;
  categoryList: CategoryCount[];
}

const SpaceDetailReviewStats: React.FC<Props> = ({
  averageRating,
  ratingPercentages,
  categoryList,
}) => {
  const percentages = [
    ratingPercentages.fiveStarPercentage,
    ratingPercentages.fourStarPercentage,
    ratingPercentages.threeStarPercentage,
    ratingPercentages.twoStarPercentage,
    ratingPercentages.oneStarPercentage,
  ];

  return (
    <div className="px-5 py-2 border-b bg-white">
      <div className="flex items-center gap-6 mb-4">
        {/* 전체 평점 섹션 */}
        <div className="flex flex-col items-center flex-shrink-0 w-24">
          <span className="text-sm mb-1">전체 평점</span>
          <FaStar size={32} className="text-sky-400 my-1" />
          <span className="text-gray-800 font-bold text-xl mt-1">
            {averageRating.toFixed(1)}점
          </span>
        </div>

        {/* 별점별 비율 섹션 */}
        <div className="w-full">
          {percentages.map((p, i) => (
            <div key={i} className="flex items-center text-xs mb-1">
              <span className="w-6 text- mr-2">{5 - i}점</span>
              <div className="w-full flex-1 mx-2 hover:*:-1.5 rounded bg-gray-200">
                <div className="bg-[#737373] h-1.5 rounded" style={{ width: `${p}%` }} />
              </div>
              <span className="w-8 text-lef">{Math.round(p)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 태그 섹션 */}
      <div className="flex flex-wrap gap-2">
        {categoryList.map((cat, i) => (
          <span key={i} className="px-3 py-1 bg-white rounded-full border border-gray-300 flex items-baseline">
            <span className="text-xs font-semibold text-gray-800">{cat.category}</span>
            <span className="ml-1 text-[10px] text-gray-400">({cat.count})</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SpaceDetailReviewStats;
