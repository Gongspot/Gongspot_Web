// src/apis/home.ts
import { axiosInstance } from './axios'; // axios 대신 axiosInstance를 import
import type { HotPlacesApiResponse } from '../types/space';

export const getHotPlaces = async (): Promise<HotPlacesApiResponse> => {
  const response = await axiosInstance.get<HotPlacesApiResponse>('/home/hot');
  return response.data;
};