// src/hooks/usePostReview.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReview } from '../apis/places';
import type { ReviewPayload } from '../types/space';

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