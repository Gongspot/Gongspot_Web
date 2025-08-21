import { useQuery } from '@tanstack/react-query';
import { getRecommendations } from '../apis/recs';

export const useRecommendations = (userId: number) => {
  return useQuery({
    queryKey: ['recommendations', userId],
    queryFn: () => getRecommendations(userId),
    select: (data) => data.recommended_places, 
    enabled: !!userId, 
  });
};
