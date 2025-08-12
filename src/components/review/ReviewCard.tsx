import React from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import type { ReviewListItem } from '../../types/space';

// 별점 표시를 위한 작은 컴포넌트
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} size={10} className={i < rating ? "text-[#4CB1F1]" : "text-gray-300"} />
    ))}
    <span className="ml-1 text-xs font-bold text-gray-600">{rating}</span>
  </div>
);

// 메인 리뷰 카드 컴포넌트
const ReviewCard: React.FC<{ review: ReviewListItem }> = ({ review }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      {/* 상단: 프로필, 닉네임, 날짜, 별점 */}
      <div className="flex items-start mb-3">
        {review.profileImageUrl ? (
          <img src={review.profileImageUrl} alt={review.nickname} className="w-10 h-10 rounded-full mr-3"/>
        ) : (
          <FaUserCircle size={40} className="text-gray-300 mr-3" />
        )}
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-semibold text-gray-800">{review.nickname}</span>
            <span className="text-xs text-gray-400 ml-2">{review.datetime}</span>
          </div>
          <StarRating rating={review.rating} />
        </div>
      </div>
      
      {/* 중간: 리뷰 사진 (있을 경우) */}
      {review.reviewImageUrl?.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {review.reviewImageUrl.map((url, idx) => (
            <img 
              key={idx} 
              src={url} 
              alt={`review-image-${idx}`} 
              className="w-24 h-24 rounded-md object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      {/* 하단: 리뷰 내용 */}
      <p className="text-sm text-gray-700 whitespace-pre-wrap mt-2">
        {review.content}
      </p>
    </div>
  );
};

export default ReviewCard;
