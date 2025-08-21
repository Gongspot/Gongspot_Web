// src/apis/placeDetails.ts
import { axiosInstance } from "./axios";

// 상세조회 응답 타입
export interface PlaceDetails {
  name: string;
  locationInfo: string;
  openingHours: string;
  phoneNumber: string;
  purpose: string[];     // 서버 응답 키
  type: string;
  mood: string[];
  facilities: string[];
  location: string[];
}

interface DetailsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PlaceDetails;
}

// PATCH DTO (서버 명세)
export interface UpdatePlaceDto {
  locationInfo: string;
  openingHours: string;
  phoneNumber: string;
  purposeList: string[];
  type: string;
  moodList: string[];
  facilityList: string[];
  locationList: string[];
}

// 상세조회
export const getPlaceDetails = async (placeId: number): Promise<PlaceDetails | null> => {
  try {
    const res = await axiosInstance.get<DetailsResponse>(`/places/details/${placeId}`);
    if (res.data.isSuccess) {
      return res.data.result;
    }
    console.warn("상세 조회 실패:", res.data.message);
    return null;
  } catch (e) {
    console.error("상세 조회 오류:", e);
    return null;
  }
};

// 수정(PATCH)
export const updatePlace = async (placeId: number, dto: UpdatePlaceDto): Promise<boolean> => {
  try {
    const res = await axiosInstance.patch(`/places/${placeId}`, dto);
    // 서버 공통 응답: {isSuccess, code, message}
    return !!res.data?.isSuccess;
  } catch (e) {
    console.error("공간 수정 오류:", e);
    return false;
  }
};
