import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopHeader from '../../components/TopHeader';
import SpaceDetailReviewStats from '../../components/detail/SpaceDetailReviewStats';
import ReviewCard from '../../components/review/ReviewCard';
import { useSpaceReviews } from '../../hooks/useSpaceReviews';
import pencilIcon from '../../assets/pencil_icon.svg';

const REVIEWS_PER_PAGE = 20;

const AllReviewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const { data: reviewData, isLoading, isError } = useSpaceReviews(id, currentPage);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !reviewData) return <div>리뷰를 불러올 수 없습니다.</div>;

  const totalPages = Math.ceil(reviewData.reviewCount / REVIEWS_PER_PAGE);

  return (
    <div className="max-w-[400px] mx-auto bg-white min-h-screen flex flex-col relative">
      {/* 상단 고정 영역 */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <TopHeader title="전체 리뷰" />
        <SpaceDetailReviewStats
          placeId={Number(id)}
          averageRating={reviewData.averageRating}
          reviewCount={reviewData.reviewCount}
          ratingPercentages={reviewData.ratingPercentages}
          categoryList={reviewData.categoryList}
        />
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto pb-12">
        <div className="px-4 py-4 space-y-3 bg-gray-50">
          {reviewData.reviewList.length > 0 ? (
            reviewData.reviewList.map((review) => (
              review && <ReviewCard key={review.reviewId} review={review} />
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              <p className="font-semibold">아직 방문자 리뷰가 없습니다.</p>
              <p className="text-sm mt-1">첫 번째 리뷰를 남겨보세요!</p>
            </div>
          )}
        </div>

        {/* 페이지네이션 컨트롤 */}
        <div className="flex justify-center items-center gap-4 py-8 bg-gray-50">
          <button
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 text-sm font-semibold text-gray-800 transition disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            이전
          </button>
          <span className="font-bold text-gray-600">
            {currentPage + 1} / {totalPages > 0 ? totalPages : 1}
          </span>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage + 1 >= totalPages}
            className="px-4 py-2 text-sm font-semibold text-gray-800 transition disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>
      </div>

      {/* 리뷰 작성 플로팅 버튼 추가 */}
      <button 
        className="fixed z-50 bottom-24 right-5 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white shadow-lg border" 
        onClick={() => navigate(`/space/${id}/review`)}
      >
        <img src={pencilIcon} alt="리뷰 작성" className="w-8 h-8"/>
      </button>
    </div>
  );
};

export default AllReviewsPage;
