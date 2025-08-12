import { useQuery } from '@tanstack/react-query';
import { getBanners } from '../apis/banners';

export const useBanners = () => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: getBanners,
    select: (data) => data.result.bannerList,
  });
};
