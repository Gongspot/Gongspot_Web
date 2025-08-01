// src/apis/recentSearch.ts
import { axiosInstance } from "./axios";

// 최근 검색어 조회
// types
export interface RecentSearchItem {
  id: number;
  keyword: string;
}

export const getRecentSearches = async (): Promise<RecentSearchItem[]> => {
  try {
    const response = await axiosInstance.get("/recent-search");
    console.log("🔍 전체 응답 데이터:", response.data);
    console.log("🔍 result 키워드들:", response.data.result?.keywords);

    const { isSuccess, result } = response.data;

    if (isSuccess && result?.keywords) {
      return result.keywords; // [{ id, keyword }, ...] 형식이라고 가정
    } else {
      console.warn("최근 검색어 조회 실패:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("최근 검색어 조회 중 오류 발생:", error);
    return [];
  }
};

// 최근 검색어 삭제
export const deleteRecentSearchByKeyword = async (keyword: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete(`/recent-search`, {
      data: { keywords: [keyword] }, // 백엔드 형식: { keywords: [...] }
    });
    return response.data.isSuccess;
  } catch (error) {
    console.error("최근 검색어 삭제 실패:", error);
    return false;
  }
};