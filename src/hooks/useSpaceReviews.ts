// src/hooks/useSpaceReviews.ts
import { useQuery } from '@tanstack/react-query';
import { getSpaceReviews } from '../apis/places';

export const useSpaceReviews = (placeId?: string, page: number = 0) => {
  return useQuery({
    queryKey: ['spaceReviews', placeId, page], // 페이지 번호를 쿼리 키에 포함
    queryFn: () => getSpaceReviews(placeId!, page),
    enabled: !!placeId,
    select: (data) => data.result,
  });
};