// src/constants/adminRequests.ts

export interface AdminRequest {
  id: number;
  placeName: string;
  date: string; // 신청일 (yyyy-mm-dd)
  isReviewed: boolean;
  googleMapsUrl: string;
  reason: string;
}

export const adminRequests: AdminRequest[] = [
  {
    id: 1,
    placeName: "홍대 청년취업카페",
    date: "2025-07-15",
    isReviewed: false,
    googleMapsUrl: "https://maps.app.goo.gl/abcde12345",
    reason: "조용하고 분위기가 좋아 꼭 등록하고 싶습니다.",
  },
  {
    id: 2,
    placeName: "강남 토즈스터디카페",
    date: "2025-07-14",
    isReviewed: false,
    googleMapsUrl: "https://maps.app.goo.gl/xyz987654",
    reason: "스터디나 과제할 때 이용하기 좋은 곳이라 청년들에게 꼭 소개했으면 해서 신청해요.",
  },
  {
    id: 3,
    placeName: "신촌 캐치카페",
    date: "2025-07-14",
    isReviewed: false,
    googleMapsUrl: "https://maps.app.goo.gl/qwerty12345",
    reason: "친구들과 함께 사용하기 좋아서 추천합니다.",
  },
  {
    id: 4,
    placeName: "홍대 청년공간",
    date: "2025-07-13",
    isReviewed: false,
    googleMapsUrl: "https://maps.app.goo.gl/asdfg09876",
    reason: "공간이 넓고 다양한 시설을 갖추고 있어 신청합니다.",
  },
  {
    id: 5,
    placeName: "건대 공공카페",
    date: "2025-07-12",
    isReviewed: true,
    googleMapsUrl: "https://maps.app.goo.gl/qweqweqwe",
    reason: "대학생이 많이 이용해서 유용합니다.",
  },
  {
    id: 6,
    placeName: "이대 라운지",
    date: "2025-07-11",
    isReviewed: false,
    googleMapsUrl: "https://maps.app.goo.gl/zxcvbnm",
    reason: "여성 전용 공간으로 추천합니다.",
  },
  {
    id: 7,
    placeName: "노량진 독서실",
    date: "2025-07-11",
    isReviewed: false,
    googleMapsUrl: "https://maps.app.goo.gl/asdqwezxc",
    reason: "공부하기 조용하고 편해서 신청합니다.",
  },
  {
    id: 8,
    placeName: "영등포 청년카페",
    date: "2025-07-10",
    isReviewed: false,
    googleMapsUrl: "https://maps.app.goo.gl/qwexcvbn",
    reason: "청년 창업 지원 공간으로 좋아요.",
  },
  {
    id: 9,
    placeName: "서울숲 스터디룸",
    date: "2025-07-09",
    isReviewed: false,
    googleMapsUrl: "https://maps.app.goo.gl/poiuytrewq",
    reason: "자연 경관이 좋아서 추천해요.",
  },
  {
    id: 12,
    placeName: "건대 공공카페",
    date: "2025-07-12",
    isReviewed: true,
    googleMapsUrl: "https://maps.app.goo.gl/qweqweqwe",
    reason: "대학생이 많이 이용해서 유용합니다.",
  },
  {
    id: 13,
    placeName: "건대 공공카페",
    date: "2025-07-12",
    isReviewed: true,
    googleMapsUrl: "https://maps.app.goo.gl/qweqweqwe",
    reason: "대학생이 많이 이용해서 유용합니다.",
  },
  {
    id: 14,
    placeName: "건대 공공카페",
    date: "2025-07-12",
    isReviewed: true,
    googleMapsUrl: "https://maps.app.goo.gl/qweqweqwe",
    reason: "대학생이 많이 이용해서 유용합니다.",
  },
  {
    id: 15,
    placeName: "건대 공공카페",
    date: "2025-07-12",
    isReviewed: true,
    googleMapsUrl: "https://maps.app.goo.gl/qweqweqwe",
    reason: "대학생이 많이 이용해서 유용합니다.",
  },
];
