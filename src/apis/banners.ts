import { axiosInstance } from './axios';
import type { BannersApiResponse } from '../types/space';

export const getBanners = async (): Promise<BannersApiResponse> => {
  const response = await axiosInstance.get<BannersApiResponse>('/banners');
  return response.data;
};
