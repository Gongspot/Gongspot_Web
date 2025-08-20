import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReviewListItem } from '../../types/space';
import ReviewCard from '../review/ReviewCard';

interface Props {
  reviews: ReviewListItem[];
  placeId?: string;
}

const SpaceDetailReview: React.FC<Props> = ({ reviews, placeId }) => {
  const navigate = useNavigate();

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 bg-gray-50 rounded-b-lg">
        <p className="font-semibold">아직 방문자 리뷰가 없습니다.</p>
        <p className="text-sm mt-1">첫 번째 리뷰를 남겨보세요!</p>
      </div>
    );
  }
  return (
    <div className="px-4 py-4 space-y-3 bg-gray-50 rounded-b-lg">
      {reviews.slice(0, 5).map((review) => (
        review && <ReviewCard key={review.reviewId} review={review} />
      ))}

      {reviews.length > 5 && placeId && (
        <button
          onClick={() => navigate(`/space/${placeId}/reviews`)}
          className="w-full mt-2 py-3 text-center text-gray-600 font-semibold bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          전체보기
        </button>
      )}
    </div>
  );
};

export default SpaceDetailReview;
