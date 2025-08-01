// src/components/detail/SpaceDetailReview.tsx
import React from 'react';
import { FaStar } from 'react-icons/fa';
import type { ReviewListItem } from '../../types/space';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"} />
    ))}
  </div>
);

const SpaceDetailReview: React.FC<{ reviews: ReviewListItem[] }> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <div className="p-8 text-center text-gray-400">작성된 리뷰가 없습니다.</div>;
  }
  return (
    <div className="px-5 divide-y">
      {reviews.map((r) => (
        <div key={r.reviewId} className="py-4">
          <div className="flex items-center mb-2">
            <img src={r.profileImageUrl} alt={r.nickname} className="w-8 h-8 rounded-full mr-3"/>
            <div>
              <span className="font-medium mr-2">{r.nickname}</span>
              <p className="text-xs text-gray-400">{r.datetime}</p>
            </div>
          </div>
          <div className="ml-11 mb-2">
            <StarRating rating={r.rating} />
          </div>
          <p className="text-sm ml-11 mb-2 whitespace-pre-wrap">{r.content}</p>
          {r.reviewImageUrl?.length > 0 && (
            <div className="flex gap-2 ml-11">
              {r.reviewImageUrl.map((url, idx) => (
                <img key={idx} src={url} alt={`review-image-${idx}`} className="w-20 h-20 rounded-md object-cover"/>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SpaceDetailReview;