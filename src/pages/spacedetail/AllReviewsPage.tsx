// src/pages/spacedetail/AllReviewsPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TopHeader from '../../components/TopHeader';
import SpaceDetailReview from '../../components/detail/SpaceDetailReview';
import { useSpaceReviews } from '../../hooks/useSpaceReviews';

const REVIEWS_PER_PAGE = 20; // API가 페이지당 반환하는 리뷰 개수

const AllReviewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(0); // 0부터 시작하는 페이지 인덱스

  const { data: reviewData, isLoading, isError } = useSpaceReviews(id, currentPage);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !reviewData) return <div>리뷰를 불러올 수 없습니다.</div>;

  const totalPages = Math.ceil(reviewData.reviewCount / REVIEWS_PER_PAGE);

  return (
    <div className="max-w-[400px] mx-auto bg-white min-h-screen">
      <TopHeader title="전체 리뷰" />
      <div className="pt-4">
        <SpaceDetailReview reviews={reviewData.reviewList} />
      </div>

      {/* 페이지네이션 컨트롤 */}
      <div className="flex justify-center items-center gap-4 py-8">
        <button
          onClick={() => setCurrentPage(p => p - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          이전
        </button>
        <span>
          {currentPage + 1} / {totalPages > 0 ? totalPages : 1}
        </span>
        <button
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage + 1 >= totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default AllReviewsPage;