// src/types/review.types.ts

export interface ReviewPayload {
  datetime: string;
  rate: number;
  congest: number;
  purpose: number[];
  mood: number[];
  facility: number[];
  content: string;
  // photos 필드는 FormData로 별도 처리
  like: boolean;
}