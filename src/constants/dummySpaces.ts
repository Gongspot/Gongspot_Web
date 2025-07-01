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
  realTimeCongestion: {
    type: string;
    comment: string;
    date: string;
    ago: string;
  }[];
  reviews: number[];
  reviewStats: {
    score: number;
    counts: number[];
    tags: { label: string; count: number }[];
  };
}

const dummySpaces: Space[] = [
  {
    id: 1,
    name: "서울청년센터 희망점",
    image: "/src/assets/hot1.jpg",
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
      { type: "카공족", comment: "혼잡도 높음 ‘거의 만석이에요’", date: "오늘", ago: "5분 전" },
      { type: "카공족", comment: "혼잡도 낮음 ‘자리 여유있어요’", date: "오늘", ago: "1시간 전" },
    ],
    reviews: [1, 2],
    reviewStats: {
      score: 4.0,
      counts: [7, 2, 1, 0, 0],
      tags: [
        { label: "개인 공부", count: 3 },
        { label: "넓음", count: 5 },
        { label: "조용한", count: 3 },
        { label: "콘센트 다수", count: 7 },
      ],
    },
  },
  {
    id: 2,
    name: "비담 도서관",
    image: "/src/assets/hot2.jpg",
    rating: 4.5,
    distance: 0.6,
    tags: ["#공공도서관", "#무료"],
    isFree: true,
    isLiked: false,
    address: "서울 중구 비담로 15",
    phone: "02-234-1234",
    opening: "오늘 09:00 ~ 21:00",
    holiday: "연중무휴",
    congestionGraph: [4, 4, 8, 14, 22, 24, 10, 2],
    realTimeCongestion: [
      { type: "학생", comment: "아침엔 한산, 오후엔 북적", date: "오늘", ago: "3시간 전" },
    ],
    reviews: [3, 4, 5],
    reviewStats: {
      score: 4.2,
      counts: [5, 6, 3, 0, 0],
      tags: [
        { label: "책 많음", count: 2 },
        { label: "분위기 좋음", count: 3 },
        { label: "공간 넓음", count: 3 },
      ],
    },
  },
  {
    id: 3,
    name: "유라 독서실",
    image: "/src/assets/hot3.jpg",
    rating: 4.1,
    distance: 0.8,
    tags: ["#스터디룸"],
    isFree: false,
    isLiked: false,
    address: "서울 마포구 양화로 300",
    phone: "02-333-4444",
    opening: "오늘 08:00 ~ 23:00",
    holiday: "명절 휴무",
    congestionGraph: [3, 6, 8, 12, 16, 12, 7, 2],
    realTimeCongestion: [
      { type: "직장인", comment: "오후 시간대 약간 붐빔", date: "오늘", ago: "2시간 전" },
    ],
    reviews: [6, 7],
    reviewStats: {
      score: 3.9,
      counts: [2, 7, 4, 1, 1],
      tags: [
        { label: "조용함", count: 4 },
        { label: "시설 깨끗", count: 2 },
      ],
    },
  },
  {
    id: 4,
    name: "당당카페",
    image: "/src/assets/hot1.jpg",
    rating: 4.7,
    distance: 1.2,
    tags: ["#카페", "#유료"],
    isFree: false,
    isLiked: false,
    address: "서울 강서구 강서로 101",
    phone: "02-123-9999",
    opening: "오늘 11:00 ~ 22:00",
    holiday: "매주 화요일 휴무",
    congestionGraph: [5, 8, 10, 17, 18, 10, 8, 2],
    realTimeCongestion: [
      { type: "카공족", comment: "오전은 한산, 오후 북적", date: "오늘", ago: "20분 전" },
    ],
    reviews: [8, 9],
    reviewStats: {
      score: 4.6,
      counts: [8, 4, 0, 0, 0],
      tags: [
        { label: "커피 맛있음", count: 3 },
        { label: "분위기 좋음", count: 5 },
      ],
    },
  },
  {
    id: 5,
    name: "서울 오픈스페이스",
    image: "/src/assets/hot2.jpg",
    rating: 4.3,
    distance: 1.8,
    tags: ["#공유공간"],
    isFree: true,
    isLiked: false,
    address: "서울 용산구 오픈로 19",
    phone: "02-555-1234",
    opening: "오늘 09:00 ~ 21:00",
    holiday: "매주 금요일 휴무",
    congestionGraph: [6, 6, 8, 14, 20, 22, 9, 1],
    realTimeCongestion: [
      { type: "공유족", comment: "점심시간 혼잡, 평소 한산", date: "오늘", ago: "40분 전" },
    ],
    reviews: [10, 11],
    reviewStats: {
      score: 4.4,
      counts: [6, 7, 2, 0, 0],
      tags: [
        { label: "편의시설", count: 3 },
        { label: "위치 좋음", count: 2 },
        { label: "넓음", count: 3 },
      ],
    },
  },
  {
    id: 6,
    name: "작은공간",
    image: "/src/assets/hot3.jpg",
    rating: 4.0,
    distance: 2.1,
    tags: ["#공공", "#무료"],
    isFree: true,
    isLiked: false,
    address: "서울 은평구 작은로 45",
    phone: "02-666-7890",
    opening: "오늘 09:30 ~ 20:00",
    holiday: "매월 마지막주 일요일 휴무",
    congestionGraph: [3, 4, 5, 7, 9, 7, 5, 2],
    realTimeCongestion: [
      { type: "주민", comment: "전체적으로 조용함", date: "오늘", ago: "2시간 전" },
    ],
    reviews: [12, 13],
    reviewStats: {
      score: 4.0,
      counts: [3, 5, 5, 0, 0],
      tags: [
        { label: "작지만 쾌적", count: 4 },
        { label: "조용함", count: 4 },
      ],
    },
  },
  {
    id: 7,
    name: "모두의카페",
    image: "/src/assets/hot1.jpg",
    rating: 4.7,
    distance: 1.4,
    tags: ["#카페"],
    isFree: false,
    isLiked: false,
    address: "서울 구로구 구로동 123",
    phone: "02-777-8888",
    opening: "오늘 10:00 ~ 21:00",
    holiday: "매주 일요일 휴무",
    congestionGraph: [2, 4, 7, 10, 12, 14, 8, 1],
    realTimeCongestion: [
      { type: "카공족", comment: "항상 인기, 오후 혼잡", date: "오늘", ago: "30분 전" },
    ],
    reviews: [14, 15],
    reviewStats: {
      score: 4.6,
      counts: [7, 5, 1, 0, 0],
      tags: [
        { label: "음료 다양", count: 4 },
        { label: "조용함", count: 2 },
      ],
    },
  },
  {
    id: 8,
    name: "책방스페이스",
    image: "/src/assets/hot2.jpg",
    rating: 4.9,
    distance: 0.4,
    tags: ["#도서관"],
    isFree: true,
    isLiked: false,
    address: "서울 종로구 책방길 23",
    phone: "02-888-4567",
    opening: "오늘 09:00 ~ 22:00",
    holiday: "매주 화요일 휴무",
    congestionGraph: [4, 5, 8, 13, 17, 14, 7, 2],
    realTimeCongestion: [
      { type: "학생", comment: "저녁에 많이 붐빔", date: "오늘", ago: "10분 전" },
    ],
    reviews: [16, 17],
    reviewStats: {
      score: 4.9,
      counts: [11, 3, 0, 0, 0],
      tags: [
        { label: "책 많음", count: 8 },
        { label: "조용함", count: 4 },
      ],
    },
  },
  {
    id: 9,
    name: "스터디파크",
    image: "/src/assets/hot3.jpg",
    rating: 4.5,
    distance: 1.8,
    tags: ["#스터디룸", "#공유"],
    isFree: false,
    isLiked: false,
    address: "서울 영등포구 공원로 10",
    phone: "02-987-6543",
    opening: "오늘 10:00 ~ 20:00",
    holiday: "공휴일 휴무",
    congestionGraph: [6, 8, 12, 18, 16, 10, 6, 2],
    realTimeCongestion: [
      { type: "스터디", comment: "모임 많음, 다소 시끄러움", date: "오늘", ago: "50분 전" },
    ],
    reviews: [18, 19],
    reviewStats: {
      score: 4.4,
      counts: [7, 6, 2, 1, 0],
      tags: [
        { label: "모임 적합", count: 5 },
        { label: "넓음", count: 4 },
      ],
    },
  },
  {
    id: 10,
    name: "스터디룸101",
    image: "/src/assets/hot1.jpg",
    rating: 4.3,
    distance: 2.5,
    tags: ["#스터디룸"],
    isFree: false,
    isLiked: false,
    address: "서울 동작구 상도로 101",
    phone: "02-555-0000",
    opening: "오늘 12:00 ~ 21:00",
    holiday: "명절 휴무",
    congestionGraph: [5, 6, 7, 11, 16, 10, 8, 1],
    realTimeCongestion: [
      { type: "스터디", comment: "주말 예약 필수", date: "오늘", ago: "1시간 전" },
    ],
    reviews: [20, 21],
    reviewStats: {
      score: 4.2,
      counts: [3, 4, 6, 1, 0],
      tags: [
        { label: "예약 필수", count: 7 },
        { label: "시설 좋음", count: 5 },
      ],
    },
  },
  {
    id: 11,
    name: "카페벨라",
    image: "/src/assets/hot2.jpg",
    rating: 4.0,
    distance: 1.1,
    tags: ["#카페"],
    isFree: false,
    isLiked: false,
    address: "서울 강동구 상일로 23",
    phone: "02-123-2222",
    opening: "오늘 09:00 ~ 21:00",
    holiday: "매주 월요일 휴무",
    congestionGraph: [3, 5, 6, 12, 13, 12, 7, 2],
    realTimeCongestion: [
      { type: "카공족", comment: "점심엔 붐빔, 저녁엔 한산", date: "오늘", ago: "2시간 전" },
    ],
    reviews: [22, 23],
    reviewStats: {
      score: 4.0,
      counts: [4, 6, 5, 1, 0],
      tags: [
        { label: "커피 맛있음", count: 5 },
        { label: "분위기 좋음", count: 2 },
      ],
    },
  },
  {
    id: 12,
    name: "책이랑 도서관",
    image: "/src/assets/hot3.jpg",
    rating: 4.2,
    distance: 1.7,
    tags: ["#공공도서관", "#무료"],
    isFree: true,
    isLiked: false,
    address: "서울 서초구 책이랑길 13",
    phone: "02-999-1111",
    opening: "오늘 10:00 ~ 19:00",
    holiday: "매월 1일 휴무",
    congestionGraph: [2, 3, 6, 7, 10, 9, 3, 1],
    realTimeCongestion: [
      { type: "학생", comment: "주중에는 한산", date: "오늘", ago: "3시간 전" },
    ],
    reviews: [24, 25],
    reviewStats: {
      score: 4.3,
      counts: [7, 2, 2, 1, 0],
      tags: [
        { label: "책 많음", count: 4 },
        { label: "공간 깨끗", count: 2 },
      ],
    },
  },
  {
    id: 13,
    name: "스터디센터",
    image: "/src/assets/hot1.jpg",
    rating: 4.6,
    distance: 0.8,
    tags: ["#스터디룸"],
    isFree: false,
    isLiked: false,
    address: "서울 성북구 공부길 88",
    phone: "02-888-3333",
    opening: "오늘 09:00 ~ 22:00",
    holiday: "명절 휴무",
    congestionGraph: [6, 8, 9, 14, 15, 11, 8, 2],
    realTimeCongestion: [
      { type: "스터디", comment: "평일엔 여유, 주말은 혼잡", date: "오늘", ago: "10분 전" },
    ],
    reviews: [26, 27],
    reviewStats: {
      score: 4.5,
      counts: [10, 6, 1, 0, 0],
      tags: [
        { label: "쾌적함", count: 4 },
        { label: "조용함", count: 5 },
      ],
    },
  },
  {
    id: 14,
    name: "힐링카페",
    image: "/src/assets/hot2.jpg",
    rating: 4.3,
    distance: 1.0,
    tags: ["#카페", "#힐링"],
    isFree: false,
    isLiked: false,
    address: "서울 관악구 힐링로 42",
    phone: "02-454-1234",
    opening: "오늘 11:00 ~ 20:00",
    holiday: "매주 수요일 휴무",
    congestionGraph: [3, 4, 7, 8, 12, 13, 5, 2],
    realTimeCongestion: [
      { type: "카공족", comment: "음악 좋고 여유있음", date: "오늘", ago: "1시간 전" },
    ],
    reviews: [28, 29],
    reviewStats: {
      score: 4.3,
      counts: [7, 5, 1, 1, 0],
      tags: [
        { label: "분위기 좋음", count: 5 },
        { label: "힐링", count: 2 },
      ],
    },
  },
  {
    id: 15,
    name: "열린마루",
    image: "/src/assets/hot3.jpg",
    rating: 4.1,
    distance: 2.0,
    tags: ["#공유공간"],
    isFree: true,
    isLiked: false,
    address: "서울 동대문구 열린로 9",
    phone: "02-321-4321",
    opening: "오늘 08:00 ~ 22:00",
    holiday: "매주 토요일 휴무",
    congestionGraph: [4, 4, 8, 11, 13, 12, 7, 1],
    realTimeCongestion: [
      { type: "공유족", comment: "점심시간 북적, 그 외는 한산", date: "오늘", ago: "1시간 전" },
    ],
    reviews: [30, 31],
    reviewStats: {
      score: 4.0,
      counts: [5, 5, 2, 1, 1],
      tags: [
        { label: "편의시설", count: 3 },
        { label: "책 많음", count: 2 },
      ],
    },
  },
];

export default dummySpaces;
