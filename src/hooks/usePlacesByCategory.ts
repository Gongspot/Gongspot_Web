// src/hooks/usePlacesByCategory.ts
import { useQuery } from '@tanstack/react-query';
import { getPlacesByCategory } from '../apis/themes';

export const usePlacesByCategory = (categoryId?: number) => {
  return useQuery({
    queryKey: ['placesByCategory', categoryId],
    queryFn: () => getPlacesByCategory(categoryId!),
    // categoryId가 존재할 때만 쿼리를 실행합니다.
    enabled: !!categoryId,
    select: (data) => data.result.placeList,
  });
};