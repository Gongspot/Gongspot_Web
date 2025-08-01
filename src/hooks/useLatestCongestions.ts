// src/hooks/useLatestCongestions.ts
import { useQuery } from '@tanstack/react-query';
import { getCongestions } from '../apis/places';
import type { CongestionByDate } from '../types/space';

export const useLatestCongestions = (placeId?: string) => {
  return useQuery({
    // 다른 훅과 겹치지 않도록 고유한 queryKey를 사용합니다.
    queryKey: ['latestCongestions', placeId], 
    
    // 항상 첫 페이지만(page=0) 요청합니다.
    queryFn: () => getCongestions(placeId!, 0), 
    
    // placeId가 있을 때만 훅이 동작합니다.
    enabled: !!placeId,

    // API 응답 데이터에서 필요한 부분만 가공하여 반환합니다.
    select: (data) => 
      data.result?.congestionList
        ?.flatMap((group: CongestionByDate) => group.dateCongestionList)
        .slice(0, 3) || [],
  });
};