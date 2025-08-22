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

export const postReview = async ({ placeId, reviewData, photos }: {
  placeId: string;
  reviewData: ReviewPayload;
  photos: File[];
}) => {
  // 📸 사진 파일이 하나 이상 첨부된 경우
  if (photos && photos.length > 0) {
    const formData = new FormData();
    formData.append('review', new Blob([JSON.stringify(reviewData)], { type: 'application/json' }));
    
    photos.forEach((file) => {
      formData.append('reviewPictures', file);
    });
    
    return axiosInstance.post(`/reviews/${placeId}`, formData, {
      // FormData 사용 시 Content-Type은 axios가 자동으로 처리하므로 이 부분은 생략해도 됩니다.
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

  } else {
    // ✍️ 사진 파일이 없는 경우 (수정된 부분)
    // 두 번째 인자로 reviewData를 전달하여 JSON 형태로 요청합니다.
    return axiosInstance.post(`/reviews/${placeId}`, reviewData);
  }
};