// src/hooks/usePostReview.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReview } from '../apis/places';
import type { ReviewPayload } from '../types/review.types'; // 타입 경로 확인 필요

export const usePostReview = (placeId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewData, photos }: {
      reviewData: ReviewPayload;
      photos: File[];
    }) => {
      if (!placeId) throw new Error("Place ID is not provided");
      return postReview({ placeId, reviewData, photos });
    },
    onSuccess: () => {
      // 성공 시, 해당 공간의 리뷰 목록과 혼잡도 캐시를 무효화하여 새로고침 유도
      queryClient.invalidateQueries({ queryKey: ['spaceReviews', placeId] });
      queryClient.invalidateQueries({ queryKey: ['congestions', placeId] });
      queryClient.invalidateQueries({ queryKey: ['latestCongestions', placeId] });
    },
    onError: (error) => {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
    },
  });
};