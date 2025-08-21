// src/apis/home.ts
import { axiosInstance } from './axios'; // axios 대신 axiosInstance를 import
import type { HotPlacesApiResponse } from '../types/space';
import type { RequestNicknameDTO, RequestPreferDTO } from '../types/home';

export const getHotPlaces = async (): Promise<HotPlacesApiResponse> => {
  const response = await axiosInstance.get<HotPlacesApiResponse>('/home/hot');
  return response.data;
};

export const postNickname = async (body: RequestNicknameDTO) => {
    const { data } = await axiosInstance.post('/users/nickname', body);
    return data;
};

export const postPrefer = async (body: RequestPreferDTO) => {
    const { data } = await axiosInstance.post('/users/prefer', body);
    return data;
};