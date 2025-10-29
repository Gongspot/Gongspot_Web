// apis/space.ts
import { axiosInstance } from "./axios";
import axios from "axios";

export interface SpaceCreateApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

export interface ApproveBody {
  googlePlace: {
    placeId: string;
    name: string;
    formattedAddress?: string;
    internationalPhoneNumber?: string;
    geometry?: string;
    openingHours?: string;
    secondaryOpeningHours?: string;
    photoUrl?: string;
  };
  purpose?: string[];
  type?: string;
  mood?: string[];
  facilities?: string[];
  location?: string[];
  isFree?: boolean;
}

export const approveProposal = async (
  proposalId: number,
  body?: ApproveBody
): Promise<SpaceCreateApiResponse> => {
  try {
    const res = await axiosInstance.post<SpaceCreateApiResponse>(
      "/request/approve",
      body ?? {}, // JSON으로 보냄
      { params: { proposalId } }
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("[approve] status:", err.response?.status);
      console.error("[approve] server data:", err.response?.data); // ← 필드 에러 확인
    }
    throw err;
  }
};
