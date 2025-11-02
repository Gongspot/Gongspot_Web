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

// src/apis/places.ts (전체 함수 수정)

export const postReview = async ({ placeId, reviewData, photos }: {
  placeId: string;
  reviewData: ReviewPayload;
  photos: File[];
}) => {
  
  // ▼▼▼ [수정됨] else 문을 없애고 항상 FormData를 사용합니다. ▼▼▼

  const formData = new FormData();
  
  // 1. review (JSON) 파트를 application/json 타입으로 추가합니다.
  formData.append('review', new Blob([JSON.stringify(reviewData)], { 
    type: 'application/json' 
  }));
  
  // 2. 사진이 있는 경우에만 reviewPictures 파트를 추가합니다.
  if (photos && photos.length > 0) {
    photos.forEach((file) => {
      formData.append('reviewPictures', file);
    });
  }
  
  // 3. 사진이 있든 없든, 항상 multipart/form-data로 요청을 보냅니다.
  return axiosInstance.post(`/reviews/${placeId}`, formData);
};