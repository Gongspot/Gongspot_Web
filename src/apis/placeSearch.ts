import { axiosInstance } from "./axios";

export interface PlaceItem {
  placeId: number;
  name: string;
  rating: number | null;
  hashtag: string;
  imageUrl: string;
  isLike: boolean;
}

interface PlaceSearchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    placeList: PlaceItem[];
  };
}

interface PlaceSearchParams {
  keyword?: string;
  purpose?: string;
  type?: string;
  mood?: string;
  facilities?: string;
  location?: string;
  page?: number;
}

export const searchPlaces = async (params: PlaceSearchParams): Promise<PlaceItem[]> => {
  try {
    console.log("📤 searchPlaces 요청 파라미터:", params);

    const response = await axiosInstance.get<PlaceSearchResponse>("/places/", { params });

    console.log("📥 searchPlaces 응답 전체:", response.data);
    console.log("📥 응답 내 placeList:", response.data.result.placeList); 

    if (response.data.isSuccess) {
      return response.data.result.placeList;
    } else {
      console.warn("공간 검색 실패:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("공간 검색 중 오류 발생:", error);
    return [];
  }
};
