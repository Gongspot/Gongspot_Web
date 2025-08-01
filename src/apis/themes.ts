// src/apis/themes.ts
import { axiosInstance } from './axios'; // axios 대신 axiosInstance를 import
import type { CategoryApiResponse } from '../types/space';

export const getPlacesByCategory = async (categoryId: number): Promise<CategoryApiResponse> => {
  const response = await axiosInstance.get<CategoryApiResponse>('/home/category', {
    params: { categoryId },
  });
  return response.data;
};