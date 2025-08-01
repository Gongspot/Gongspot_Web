// src/components/detail/SpaceDetailReviewStats.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { RatingPercentages, CategoryCount } from '../../types/space';

interface Props {
  placeId: number;
  averageRating: number;
  reviewCount: number;
  ratingPercentages: RatingPercentages;
  categoryList: CategoryCount[];
}

const SpaceDetailReviewStats: React.FC<Props> = ({
  placeId,
  averageRating,
  reviewCount,
  ratingPercentages,
  categoryList,
}) => {
  const navigate = useNavigate();
  const percentages = [
    ratingPercentages.fiveStarPercentage,
    ratingPercentages.fourStarPercentage,
    ratingPercentages.threeStarPercentage,
    ratingPercentages.twoStarPercentage,
    ratingPercentages.oneStarPercentage,
  ];

  return (
    <div className="px-5 py-4 border-b bg-white">
      <div className="flex justify-between items-start">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <div className="text-3xl font-bold text-sky-500">{averageRating.toFixed(1)}점</div>
              <div className="text-sm text-gray-400">총 {reviewCount}개</div>
            </div>
            <div className="flex-1">
              {percentages.map((p, i) => (
                <div key={i} className="flex items-center text-xs text-gray-600">
                  <span className="w-6 text-right mr-1">{5 - i}점</span>
                  <div className="w-24 sm:w-32 mx-2 h-2 rounded bg-gray-200">
                    <div className="bg-sky-400 h-2 rounded" style={{ width: `${p}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => navigate(`/space/${placeId}/reviews`)}
            className="text-xs font-bold text-gray-600 whitespace-nowrap mt-1"
          >
            전체보기 &gt;
          </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {categoryList.map((cat, i) => (
          <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs">
            {cat.category} ({cat.count})
          </span>
        ))}
      </div>
    </div>
  );
};

export default SpaceDetailReviewStats;