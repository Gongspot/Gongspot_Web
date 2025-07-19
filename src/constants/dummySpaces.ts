// src/constants/dummySpaces.ts

import hot1 from "../assets/hot1.jpg";
import hot2 from "../assets/hot2.jpg";
import hot3 from "../assets/hot3.jpg";
import theme1 from "../assets/theme1.jpg";
import theme2 from "../assets/theme2.jpg";
import theme3 from "../assets/theme3.jpg";
import theme4 from "../assets/theme4.jpg";
import theme5 from "../assets/theme5.jpg";


export interface RealTimeCongestion {
  type: string;
  comment: string;
  date: string;
  ago: string;
}

export interface Space {
  id: number;
  name: string;
  image: string;
  rating: number;
  distance: number;
  tags: string[];
  isFree: boolean;
  isLiked: boolean;
  address: string;
  phone: string;
  opening: string;
  holiday: string;
  congestionGraph: number[];
  realTimeCongestion: RealTimeCongestion[];
  reviews: number[];
  reviewStats: ReviewStats;
}


export interface ReviewTag {
  label: string;
  count: number;
}

export interface ReviewStats {
  score: number;
  counts: number[];
  tags: ReviewTag[];
}

const dummySpaces: Space[] = [
  {
    id: 1,
    name: "서울청년센터 희망점",
    image: hot1,
    rating: 4.8,
    distance: 0.2,
    tags: ["#공공도서관"],
    isFree: true,
    isLiked: false,
    address: "서울 강북구 미래로 1층",
    phone: "02-022-0222",
    opening: "오늘 10:00 ~ 22:00",
    holiday: "매주 월요일 휴무",
    congestionGraph: [8, 5, 8, 12, 20, 22, 8, 5],
    realTimeCongestion: [
  // 2025-07-09
  { type: "보통", comment: "적당히 자리가 있습니다.", date: "2025-07-09", ago: "방금 전" },
  { type: "혼잡", comment: "자리가 많이 찼습니다.", date: "2025-07-09", ago: "5분 전" },
  { type: "여유", comment: "거의 비어 있습니다!", date: "2025-07-09", ago: "40분 전" },
  { type: "혼잡", comment: "대기 인원 발생!", date: "2025-07-09", ago: "1시간 전" },
  // 2025-07-08
  { type: "여유", comment: "여유롭게 공부할 수 있어요.", date: "2025-07-08", ago: "30분 전" },
  { type: "보통", comment: "적당히 북적입니다.", date: "2025-07-08", ago: "1시간 전" },
  { type: "혼잡", comment: "자리가 거의 없습니다.", date: "2025-07-08", ago: "2시간 전" },
  { type: "여유", comment: "쾌적한 분위기!", date: "2025-07-08", ago: "3시간 전" },
  // 2025-07-07
  { type: "보통", comment: "자리가 반쯤 찼어요.", date: "2025-07-07", ago: "5분 전" },
  { type: "혼잡", comment: "사람이 정말 많아요!", date: "2025-07-07", ago: "20분 전" },
  { type: "여유", comment: "한산해서 좋아요.", date: "2025-07-07", ago: "50분 전" },
  // 2025-07-06
  { type: "여유", comment: "주말이라 한산해요.", date: "2025-07-06", ago: "15분 전" },
  { type: "보통", comment: "주변에 자리가 있습니다.", date: "2025-07-06", ago: "1시간 전" },
  { type: "혼잡", comment: "빈자리가 거의 없어요.", date: "2025-07-06", ago: "2시간 전" },
  // 2025-07-05
  { type: "여유", comment: "아침엔 항상 여유!", date: "2025-07-05", ago: "10분 전" },
  { type: "보통", comment: "점심시간 이후 사람이 늘었어요.", date: "2025-07-05", ago: "1시간 전" },
  { type: "혼잡", comment: "자리가 부족합니다.", date: "2025-07-05", ago: "2시간 전" },
  // 2025-07-04
  { type: "보통", comment: "이용하기 무난해요.", date: "2025-07-04", ago: "5분 전" },
  { type: "여유", comment: "공간이 많이 남아요.", date: "2025-07-04", ago: "50분 전" },
  { type: "혼잡", comment: "사람이 꽉 찼어요!", date: "2025-07-04", ago: "2시간 전" },
  // 2025-07-03
  { type: "여유", comment: "최고의 여유로움!", date: "2025-07-03", ago: "10분 전" },
  { type: "혼잡", comment: "바로 앞에서 입장 마감.", date: "2025-07-03", ago: "1시간 전" },
],
    reviews: [1, 2],
    reviewStats: {
      score: 4.8,
      counts: [7, 2, 1, 0, 0],
      tags: [
        { label: "개인 공부", count: 3 },
        { label: "넓음", count: 5 },
        { label: "콘센트 다수", count: 7 }
      ],
    },
  },
  {
    id: 2,
    name: "비담 도서관",
    image: theme1,
    rating: 4.5,
    distance: 0.6,
    tags: ["#도서관"],
    isFree: true,
    isLiked: false,
    address: "서울 중구 비담로 15",
    phone: "02-234-1234",
    opening: "오늘 09:00 ~ 21:00",
    holiday: "연중무휴",
    congestionGraph: [4, 4, 8, 14, 22, 24, 10, 2],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [3, 4],
    reviewStats: {
      score: 4.2,
      counts: [5, 6, 3, 0, 0],
      tags: [
        { label: "책 많음", count: 2 },
        { label: "분위기 좋음", count: 3 },
        { label: "공간 넓음", count: 3 }
      ],
    },
  },
  {
    id: 3,
    name: "유라 독서실",
    image: hot2,
    rating: 4.7,
    distance: 1.0,
    tags: ["#스터디룸", "#공공도서관"],
    isFree: false,
    isLiked: false,
    address: "서울 강동구 유라로 19",
    phone: "02-125-3345",
    opening: "오늘 08:00 ~ 21:00",
    holiday: "매월 마지막주 일요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [5, 6],
    reviewStats: {
      score: 4.4,
      counts: [6, 5, 3, 0, 0],
      tags: [
        { label: "조용함", count: 4 },
        { label: "시설 깨끗", count: 2 }
      ],
    },
  },
  {
    id: 4,
    name: "서울청년센터 구로점",
    image: hot3,
    rating: 4.6,
    distance: 0.9,
    tags: ["#공공도서관"],
    isFree: true,
    isLiked: false,
    address: "서울 구로구 새말로 123",
    phone: "02-888-8888",
    opening: "오늘 10:00 ~ 22:00",
    holiday: "매주 금요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [7, 8],
    reviewStats: {
      score: 4.6,
      counts: [8, 2, 0, 0, 0],
      tags: [
        { label: "분위기 좋음", count: 4 },
        { label: "좌석 편함", count: 3 }
      ],
    },
  },
  {
    id: 5,
    name: "성북구립도서관",
    image: theme1,
    rating: 4.3,
    distance: 1.5,
    tags: ["#도서관"],
    isFree: true,
    isLiked: false,
    address: "서울 성북구 책로 17",
    phone: "02-567-4321",
    opening: "오늘 09:00 ~ 20:00",
    holiday: "매월 2번째 화요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [9, 10],
    reviewStats: {
      score: 4.3,
      counts: [4, 4, 2, 0, 0],
      tags: [
        { label: "조용함", count: 2 },
        { label: "책 많음", count: 4 }
      ],
    },
  },
  {
    id: 6,
    name: "숲속작은도서관",
    image: theme1,
    rating: 4.5,
    distance: 1.8,
    tags: ["#도서관"],
    isFree: true,
    isLiked: false,
    address: "서울 은평구 숲속길 22",
    phone: "02-111-2222",
    opening: "오늘 10:00 ~ 19:00",
    holiday: "매주 일요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [11, 12],
    reviewStats: {
      score: 4.5,
      counts: [6, 4, 0, 0, 0],
      tags: [
        { label: "자연뷰", count: 3 }
      ],
    },
  },
  {
    id: 7,
    name: "공공스터디 라운지",
    image: theme4,
    rating: 4.7,
    distance: 0.8,
    tags: ["#공공학습공간"],
    isFree: true,
    isLiked: false,
    address: "서울 종로구 공유로 25",
    phone: "02-765-0000",
    opening: "오늘 09:30 ~ 20:30",
    holiday: "매월 마지막주 토요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [13, 14],
    reviewStats: {
      score: 4.7,
      counts: [7, 3, 0, 0, 0],
      tags: [
        { label: "공유공간", count: 4 },
        { label: "저렴함", count: 4 }
      ],
    },
  },
  {
    id: 8,
    name: "청년공유스페이스",
    image: theme4,
    rating: 4.3,
    distance: 1.2,
    tags: ["#공공학습공간"],
    isFree: true,
    isLiked: false,
    address: "서울 강서구 공유로 3길 10",
    phone: "02-090-9090",
    opening: "오늘 10:00 ~ 22:00",
    holiday: "매주 화요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [15, 16],
    reviewStats: {
      score: 4.3,
      counts: [5, 3, 2, 0, 0],
      tags: [
        { label: "청년특화", count: 3 }
      ],
    },
  },
  {
    id: 9,
    name: "스터디카페 루트",
    image: theme2,
    rating: 4.2,
    distance: 1.2,
    tags: ["#민간학습공간", "#카페"],
    isFree: false,
    isLiked: false,
    address: "서울 동작구 루트길 11",
    phone: "02-222-3333",
    opening: "오늘 09:00 ~ 22:00",
    holiday: "매주 월요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [17, 18],
    reviewStats: {
      score: 4.2,
      counts: [5, 3, 2, 0, 0],
      tags: [
        { label: "음료 다양", count: 3 }
      ],
    },
  },
  {
    id: 10,
    name: "더지니어스 스터디",
    image: theme2,
    rating: 4.7,
    distance: 1.9,
    tags: ["#민간학습공간"],
    isFree: false,
    isLiked: false,
    address: "서울 광진구 지니어스길 9",
    phone: "02-666-1234",
    opening: "오늘 09:00 ~ 22:00",
    holiday: "매월 1일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [19, 20],
    reviewStats: {
      score: 4.7,
      counts: [7, 2, 1, 0, 0],
      tags: [
        { label: "조용함", count: 3 },
        { label: "책 많음", count: 2 }
      ],
    },
  },
  {
    id: 11,
    name: "스터디존",
    image: theme2,
    rating: 4.3,
    distance: 1.7,
    tags: ["#민간학습공간"],
    isFree: false,
    isLiked: false,
    address: "서울 성동구 스터디길 22",
    phone: "02-321-4444",
    opening: "오늘 08:00 ~ 22:00",
    holiday: "공휴일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [21, 22],
    reviewStats: {
      score: 4.3,
      counts: [6, 2, 2, 0, 0],
      tags: [
        { label: "넓음", count: 4 }
      ],
    },
  },
  {
    id: 12,
    name: "스터디하우스",
    image: theme2,
    rating: 4.5,
    distance: 2.0,
    tags: ["#민간학습공간"],
    isFree: false,
    isLiked: false,
    address: "서울 마포구 하우스로 7",
    phone: "02-777-1111",
    opening: "오늘 11:00 ~ 23:00",
    holiday: "매주 수요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [23, 24],
    reviewStats: {
      score: 4.5,
      counts: [8, 2, 0, 0, 0],
      tags: [
        { label: "쾌적함", count: 4 }
      ],
    },
  },
  {
    id: 13,
    name: "서울대 제1열람실",
    image: theme5,
    rating: 4.9,
    distance: 2.2,
    tags: ["#교내학습공간"],
    isFree: true,
    isLiked: false,
    address: "서울 관악구 대학로 1",
    phone: "02-525-2121",
    opening: "오늘 08:00 ~ 23:00",
    holiday: "공휴일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [25, 26],
    reviewStats: {
      score: 4.9,
      counts: [10, 1, 0, 0, 0],
      tags: [
        { label: "대형 열람실", count: 6 }
      ],
    },
  },
  {
    id: 14,
    name: "연세대 학습관",
    image: theme5,
    rating: 4.3,
    distance: 2.8,
    tags: ["#교내학습공간"],
    isFree: true,
    isLiked: false,
    address: "서울 서대문구 연세로 50",
    phone: "02-778-8888",
    opening: "오늘 08:00 ~ 22:00",
    holiday: "매주 토요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [27, 28],
    reviewStats: {
      score: 4.3,
      counts: [4, 5, 1, 0, 0],
      tags: [
        { label: "스마트공간", count: 3 }
      ],
    },
  },
  {
    id: 15,
    name: "이화여대 도서관",
    image: theme5,
    rating: 4.6,
    distance: 3.1,
    tags: ["#교내학습공간"],
    isFree: true,
    isLiked: false,
    address: "서울 서대문구 이화로 52",
    phone: "02-653-3333",
    opening: "오늘 09:00 ~ 23:00",
    holiday: "매월 마지막주 일요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [29, 30],
    reviewStats: {
      score: 4.6,
      counts: [7, 3, 0, 0, 0],
      tags: [
        { label: "책 많음", count: 5 }
      ],
    },
  },
  {
    id: 16,
    name: "고려대 개방형열람실",
    image: theme5,
    rating: 4.5,
    distance: 2.4,
    tags: ["#교내학습공간"],
    isFree: true,
    isLiked: false,
    address: "서울 성북구 안암로 23",
    phone: "02-987-1122",
    opening: "오늘 08:30 ~ 22:30",
    holiday: "공휴일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [1, 3],
    reviewStats: {
      score: 4.5,
      counts: [8, 2, 0, 0, 0],
      tags: [
        { label: "편안함", count: 4 }
      ],
    },
  },
  {
    id: 17,
    name: "카페아뜰리에",
    image: theme3,
    rating: 4.5,
    distance: 1.3,
    tags: ["#카페"],
    isFree: false,
    isLiked: false,
    address: "서울 마포구 아뜰리에길 8",
    phone: "02-100-8008",
    opening: "오늘 11:00 ~ 22:00",
    holiday: "매주 월요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [2, 4],
    reviewStats: {
      score: 4.5,
      counts: [7, 2, 1, 0, 0],
      tags: [
        { label: "커피 맛있음", count: 5 }
      ],
    },
  },
  {
    id: 18,
    name: "힐링 카페",
    image: theme3,
    rating: 4.2,
    distance: 1.7,
    tags: ["#카페"],
    isFree: false,
    isLiked: false,
    address: "서울 은평구 힐링로 10",
    phone: "02-1000-2828",
    opening: "오늘 09:30 ~ 22:00",
    holiday: "매주 일요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [5, 7],
    reviewStats: {
      score: 4.2,
      counts: [7, 4, 1, 0, 0],
      tags: [
        { label: "조용한 분위기", count: 5 }
      ],
    },
  },
  {
    id: 19,
    name: "카페 모던",
    image: theme3,
    rating: 4.1,
    distance: 2.1,
    tags: ["#카페"],
    isFree: false,
    isLiked: false,
    address: "서울 영등포구 모던길 44",
    phone: "02-2000-1919",
    opening: "오늘 08:00 ~ 21:00",
    holiday: "매주 토요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [8, 10],
    reviewStats: {
      score: 4.1,
      counts: [6, 3, 1, 0, 0],
      tags: [
        { label: "디저트 맛집", count: 2 }
      ],
    },
  },
  {
    id: 20,
    name: "도서사랑방",
    image: theme1,
    rating: 4.5,
    distance: 2.0,
    tags: ["#도서관"],
    isFree: true,
    isLiked: false,
    address: "서울 송파구 도서길 23",
    phone: "02-912-1010",
    opening: "오늘 10:00 ~ 20:00",
    holiday: "매월 1일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [9, 12],
    reviewStats: {
      score: 4.5,
      counts: [7, 2, 1, 0, 0],
      tags: [
        { label: "책 많음", count: 4 }
      ],
    },
  },
  {
    id: 21,
    name: "스터디파크",
    image: hot1,
    rating: 4.3,
    distance: 2.4,
    tags: ["#스터디룸"],
    isFree: false,
    isLiked: false,
    address: "서울 강서구 스터디파크로 13",
    phone: "02-432-4321",
    opening: "오늘 09:00 ~ 22:00",
    holiday: "매주 월요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [11, 13],
    reviewStats: {
      score: 4.3,
      counts: [5, 4, 1, 0, 0],
      tags: [
        { label: "조용함", count: 4 }
      ],
    },
  },
  {
    id: 22,
    name: "공유열린공간",
    image: theme4,
    rating: 4.1,
    distance: 1.8,
    tags: ["#공공학습공간"],
    isFree: true,
    isLiked: false,
    address: "서울 마포구 열린길 9",
    phone: "02-788-9090",
    opening: "오늘 09:00 ~ 21:00",
    holiday: "매주 화요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [14, 16],
    reviewStats: {
      score: 4.1,
      counts: [6, 3, 1, 0, 0],
      tags: [
        { label: "저렴함", count: 4 }
      ],
    },
  },
  {
    id: 23,
    name: "민간스페이스A",
    image: hot2,
    rating: 4.4,
    distance: 2.3,
    tags: ["#민간학습공간"],
    isFree: false,
    isLiked: false,
    address: "서울 강남구 스페이스길 28",
    phone: "02-292-9292",
    opening: "오늘 10:00 ~ 21:00",
    holiday: "매주 목요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [18, 19],
    reviewStats: {
      score: 4.4,
      counts: [5, 3, 2, 0, 0],
      tags: [
        { label: "분위기 좋음", count: 4 }
      ],
    },
  },
  {
    id: 24,
    name: "민간스페이스B",
    image: hot3,
    rating: 4.3,
    distance: 2.9,
    tags: ["#민간학습공간"],
    isFree: false,
    isLiked: false,
    address: "서울 마포구 스페이스길 32",
    phone: "02-399-9999",
    opening: "오늘 11:00 ~ 22:00",
    holiday: "매주 토요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [20, 21],
    reviewStats: {
      score: 4.3,
      counts: [4, 3, 3, 0, 0],
      tags: [
        { label: "넓음", count: 2 }
      ],
    },
  },
  {
    id: 25,
    name: "책방공간",
    image: theme1,
    rating: 4.2,
    distance: 2.1,
    tags: ["#도서관"],
    isFree: true,
    isLiked: false,
    address: "서울 은평구 책방길 27",
    phone: "02-159-1591",
    opening: "오늘 10:00 ~ 20:00",
    holiday: "매주 일요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [22, 23],
    reviewStats: {
      score: 4.2,
      counts: [3, 4, 3, 0, 0],
      tags: [
        { label: "책 많음", count: 4 }
      ],
    },
  },
  {
    id: 26,
    name: "자유스터디존",
    image: theme4,
    rating: 4.0,
    distance: 3.3,
    tags: ["#공공학습공간"],
    isFree: true,
    isLiked: false,
    address: "서울 구로구 자유길 24",
    phone: "02-246-1313",
    opening: "오늘 09:30 ~ 22:30",
    holiday: "공휴일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [24, 25],
    reviewStats: {
      score: 4.0,
      counts: [4, 4, 2, 0, 0],
      tags: [
        { label: "공유공간", count: 4 }
      ],
    },
  },
  {
    id: 27,
    name: "도심스터디카페",
    image: hot1,
    rating: 4.6,
    distance: 1.5,
    tags: ["#카페", "#민간학습공간"],
    isFree: false,
    isLiked: false,
    address: "서울 중구 도심길 2",
    phone: "02-190-9090",
    opening: "오늘 10:00 ~ 21:00",
    holiday: "매주 월요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [26, 27],
    reviewStats: {
      score: 4.6,
      counts: [8, 2, 0, 0, 0],
      tags: [
        { label: "커피 맛있음", count: 3 }
      ],
    },
  },
  {
    id: 28,
    name: "마포 열린카페",
    image: theme3,
    rating: 4.7,
    distance: 2.2,
    tags: ["#카페"],
    isFree: false,
    isLiked: false,
    address: "서울 마포구 마포대로 7",
    phone: "02-174-2586",
    opening: "오늘 08:00 ~ 23:00",
    holiday: "매주 수요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [28, 29],
    reviewStats: {
      score: 4.7,
      counts: [8, 2, 0, 0, 0],
      tags: [
        { label: "분위기 좋음", count: 5 }
      ],
    },
  },
  {
    id: 29,
    name: "명동 스터디카페",
    image: theme2,
    rating: 4.4,
    distance: 2.3,
    tags: ["#민간학습공간"],
    isFree: false,
    isLiked: false,
    address: "서울 중구 명동길 1",
    phone: "02-2233-7878",
    opening: "오늘 10:00 ~ 21:30",
    holiday: "매주 월요일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [30, 1],
    reviewStats: {
      score: 4.4,
      counts: [9, 2, 1, 0, 0],
      tags: [
        { label: "집중 잘 됨", count: 6 }
      ],
    },
  },
  {
    id: 30,
    name: "교내 열린 학습관",
    image: theme5,
    rating: 4.9,
    distance: 2.9,
    tags: ["#교내학습공간"],
    isFree: true,
    isLiked: false,
    address: "서울 관악구 캠퍼스길 10",
    phone: "02-555-9999",
    opening: "오늘 08:00 ~ 23:00",
    holiday: "공휴일 휴무",
    congestionGraph: [],
    realTimeCongestion: [
      {
        type: "보통",
        comment: "적당히 자리가 있습니다.",
        date: "2025-07-09",
        ago: "방금 전"
      },
      {
        type: "혼잡",
        comment: "자리가 많이 찼습니다.",
        date: "2025-07-09",
        ago: "5분 전"
      },
    ],
    reviews: [2, 3, 5],
    reviewStats: {
      score: 4.8,
      counts: [8, 3, 1, 0, 0],
      tags: [
        { label: "학생 친화적", count: 7 }
      ],
    },
  },
];



export default dummySpaces;
