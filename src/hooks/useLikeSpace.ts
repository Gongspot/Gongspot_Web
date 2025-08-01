// src/hooks/useLikeSpace.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeSpace, unlikeSpace } from '../apis/places';

export const useLikeSpace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ placeId, isLiked }: { placeId: string, isLiked: boolean }) => {
      // isLiked가 현재 false라면, true로 만들어야 하므로 likeSpace 호출
      if (!isLiked) {
        return likeSpace(placeId);
      } 
      // isLiked가 현재 true라면, false로 만들어야 하므로 unlikeSpace 호출
      else {
        return unlikeSpace(placeId);
      }
    },
    // 성공적으로 API 호출이 끝나면...
    onSuccess: (_, { placeId }) => {
      // 'spaceDetail' 쿼리를 무효화시켜서 최신 'isLiked' 상태를 다시 불러오게 합니다.
      queryClient.invalidateQueries({ queryKey: ['spaceDetail', placeId] });
    },
    onError: (error) => {
      // 에러 처리 로직
      console.error('찜하기/취소 처리 중 에러가 발생했습니다.', error);
      alert('요청에 실패했습니다. 다시 시도해주세요.');
    }
  });
};