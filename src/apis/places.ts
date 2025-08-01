// src/apis/places.ts
import { axiosInstance } from './axios';
import type { 
  SpaceDetailApiResponse, 
  ReviewApiResponse,
  CongestionApiResponse,
  ReviewPayload 
} from '../types/space';

export const getSpaceDetail = async (placeId: string): Promise<SpaceDetailApiResponse> => {
  const response = await axiosInstance.get<SpaceDetailApiResponse>(`/places/${placeId}`);
  return response.data;
};

export const getSpaceReviews = async (placeId: string, page: number = 0): Promise<ReviewApiResponse> => {
  const response = await axiosInstance.get<ReviewApiResponse>(`/places/${placeId}/reviews`, {
    params: { page },
  });
  return response.data;
};

export const getCongestions = async (placeId: string, page: number = 0): Promise<CongestionApiResponse> => {
  const response = await axiosInstance.get<CongestionApiResponse>(`/places/${placeId}/congestions`, {
    params: { page },
  });
  return response.data;
};

export const likeSpace = async (placeId: string) => {
  const response = await axiosInstance.post(`/places/${placeId}/isLiked`);
  return response.data;
};

export const unlikeSpace = async (placeId: string) => {
  const response = await axiosInstance.delete(`/places/${placeId}/isLiked`);
  return response.data;
};

export const postReview = async ({ placeId, reviewData }: {
  placeId: string;
  reviewData: ReviewPayload;
}) => {
  const response = await axiosInstance.post(`/reviews/${placeId}`, reviewData);
  return response.data;
};