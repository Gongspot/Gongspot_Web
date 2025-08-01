// src/hooks/useHotPlaces.ts
import { useQuery } from '@tanstack/react-query';
import { getHotPlaces } from '../apis/home';

export const useHotPlaces = () => {
  return useQuery({
    queryKey: ['hotPlaces'],
    queryFn: getHotPlaces,
    select: (data) => data.result.placeList,
  });
};