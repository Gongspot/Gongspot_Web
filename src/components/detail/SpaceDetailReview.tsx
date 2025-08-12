import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReviewListItem } from '../../types/space';
import ReviewCard from '../review/ReviewCard';

// Props에 placeId를 추가하여 "전체보기" 링크에 사용합니다.
interface Props {
  reviews: ReviewListItem[];
  placeId?: string;
}

const SpaceDetailReview: React.FC<Props> = ({ reviews, placeId }) => {
  const navigate = useNavigate();

  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500 bg-gray-50 rounded-b-lg">
        <p className="font-semibold">아직 방문자 리뷰가 없습니다.</p>
        <p className="text-sm mt-1">첫 번째 리뷰를 남겨보세요!</p>
      </div>
    );
  }
  return (
    <div className="px-4 py-4 space-y-3 bg-gray-50 rounded-b-lg">
      {/* 리뷰를 5개만 잘라서 보여줍니다. */}
      {reviews.slice(0, 5).map((review) => (
        review && <ReviewCard key={review.reviewId} review={review} />
      ))}

      {/* 리뷰가 5개보다 많을 경우 '전체보기' 버튼을 표시합니다. */}
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
