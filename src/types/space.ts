import type { CommonResponse } from "./common";

// src/types/space.ts
export interface Space {
  id: number;
  name: string;
  image: string;
  rating: number;
  distance: number;
  tags: string[];
  isLiked: boolean;
}

export interface SpaceCreateApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

// /places/{placeId} API 응답의 result 객체 타입
export interface SpaceDetail {
  placeId: number;
  name: string;
  isFree: boolean;
  isLiked: boolean;
  rating: number;
  hashtag: string | string[];
  photoUrl: string;
  locationInfo: string;
  openingHours: string;
  phoneNumber: string;
}

// /places/{placeId} API의 전체 응답 구조 타입
export interface SpaceDetailApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: SpaceDetail;
}

// /reviews API 응답 내부 타입들
export interface RatingPercentages {
  fiveStarPercentage: number;
  fourStarPercentage: number;
  threeStarPercentage: number;
  twoStarPercentage: number;
  oneStarPercentage: number;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface ReviewListItem {
  reviewId: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  datetime: string;
  rating: number;
  reviewImageUrl: string[];
  content: string;
}

// /reviews API의 전체 응답 구조 타입
export interface ReviewApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    reviewCount: number;
    averageRating: number;
    ratingPercentages: RatingPercentages;
    categoryList: CategoryCount[];
    reviewList: ReviewListItem[];
  };
}

// /home/hot API의 placeList 내부 객체 타입
export interface HotPlaceListItem {
  placeId: number;
  name: string;
  imageUrl: string | null;
  totalVisits: number;
  isLike: boolean;
}

// /home/hot API의 전체 응답 구조 타입
export interface HotPlacesApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    placeList: HotPlaceListItem[];
  };
}

// 카테고리별 장소 목록의 개별 아이템 타입
export interface CategoryPlaceItem {
  placeId: number;
  name: string;
  rating: number | null;
  location: string | null;
  imageUrl: string | null;
  isLike: boolean;
}

// 카테고리별 장소 목록 API의 전체 응답 구조 타입
export interface CategoryApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    placeList: CategoryPlaceItem[];
  };
}

// 개별 혼잡도 정보 타입
export interface CongestionListItem {
  reviewId: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  congestion: string;
  daytime: string;
  datetime: string;
}

// 날짜별로 그룹화된 혼잡도 정보 타입
export interface CongestionByDate {
  date: string;
  dateCongestionList: CongestionListItem[];
}

// 혼잡도 API의 전체 응답 구조 타입
export interface CongestionApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    congestionList: CongestionByDate[];
  };
}

export interface ReviewPayload {
  datetime: string;
  rate: number;
  congest: number;
  purpose: number[];
  mood: number[];
  facility: number[];
  content: string;
  like: boolean;
}

export type LikedPlace = {
  placeId: number;
  name: string;
  rating: number;
  hashtag: string;
  imageUrl: string;
  isLiked: boolean;
  isFree: boolean;
};

export type ResponseLikesDTO = CommonResponse<{
  totalCount: number;
  likedPlace: LikedPlace[];
}>;


export interface BannerItem {
  bannerId: number;
  thumbnailUrl: string | null;
}

// /banners API의 전체 응답 구조 타입
export interface BannersApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    bannerList: BannerItem[];
  };
}

// 추천 API의 개별 장소 아이템 타입
export interface RecommendedPlace {
  place_id: number;
  name: string;
  address: string; 
  is_free: boolean; 
  type: string;
  purpose: string[];
  mood: string[];
  location: string[];
  average_rating: number | null;
  photo_url: string;
  isLike?: boolean; // 찜하기 상태를 클라이언트에서 관리하기 위한 옵셔널 필드
}

// 추천 API의 전체 응답 구조 타입
export interface RecommendationApiResponse {
  recommended_places: RecommendedPlace[];
}

