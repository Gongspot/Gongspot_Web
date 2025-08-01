// src/hooks/useSpaceDetail.ts
import { useQuery } from '@tanstack/react-query';
import { getSpaceDetail } from '../apis/places';

export const useSpaceDetail = (placeId?: string) => {
  return useQuery({
    queryKey: ['spaceDetail', placeId],
    queryFn: () => getSpaceDetail(placeId!),
    enabled: !!placeId,
    select: (data) => data.result,
  });
};