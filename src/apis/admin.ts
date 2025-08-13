import type { ResponseNoticeAdminDTO, ProposalApiResponse, ProposalDetailApiResponse } from "../types/admin";
import { axiosInstance } from "./axios";

export const postNotice = async (formData: FormData, category: string) => {
  const { data } = await axiosInstance.post(`/notifications/${category}`, formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const getNoticeAdmin = async (type: 'ALL' | 'B' | 'N'): Promise<ResponseNoticeAdminDTO> => {
  const { data } = await axiosInstance.get(`/notifications/admin?type=${type}`);
  return data;
};

export const getProposals = async ({ approve, page, size = 20 }: {
  approve: boolean;
  page: number;
  size?: number;
}): Promise<ProposalApiResponse> => {
  const { data } = await axiosInstance.get('/request/proposal', {
    params: { approve, page, size },
  });
  return data;
};

export const getProposalDetail = async (proposalId: string): Promise<ProposalDetailApiResponse> => {
  const { data } = await axiosInstance.get(`/request/proposal/${proposalId}`);
  return data;
};
