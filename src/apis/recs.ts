import axios from 'axios';
import type { RecommendationApiResponse } from '../types/space';

// AI 서버 전용 axios 인스턴스 생성
const aiApi = axios.create({
  baseURL: import.meta.env.VITE_AI_API_BASE_URL,
});

// 추천 목록을 가져오는 API 함수
export const getRecommendations = async (userId: number): Promise<RecommendationApiResponse> => {
  const response = await aiApi.post<RecommendationApiResponse>('/fast-recommendations', {
    user_id: userId,
  });
  return response.data;
};
