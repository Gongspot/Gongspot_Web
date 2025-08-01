import { useInfiniteQuery } from '@tanstack/react-query';
import { getCongestions } from '../apis/places';

export const useCongestions = (placeId?: string) => {
  return useInfiniteQuery({
    queryKey: ['congestions', placeId],
    queryFn: ({ pageParam = 0 }) => getCongestions(placeId!, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.result.congestionList && lastPage.result.congestionList.length > 0) {
        return allPages.length;
      }
      return undefined; 
    },
    initialPageParam: 0,
    enabled: !!placeId,
  });
};