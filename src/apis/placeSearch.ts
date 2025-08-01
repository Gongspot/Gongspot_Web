import { axiosInstance } from "./axios";

interface PlaceItem {
  placeId: number;
  name: string;
  rating: number;
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
    const response = await axiosInstance.get<PlaceSearchResponse>("/places", { params });

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
