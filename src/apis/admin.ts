import type { ResponseNoticeAdminDTO, ProposalApiResponse, ProposalDetailApiResponse, ProposalHomeApiResponse } from "../types/admin";
import { axiosInstance } from "./axios";

export const postNotice = async (formData: FormData, category: string) => {
  const { data } = await axiosInstance.post(`/notifications/${category}`, formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const patchNotice = async (formData: FormData, notificationId: number) => {
  const { data } = await axiosInstance.patch(`/notifications/${notificationId}`, formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const patchBanner = async (formData: FormData, bannerId: number) => {
  const { data } = await axiosInstance.patch(`/banners/${bannerId}`, formData,
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

export const getProposalHome = async (): Promise<ProposalHomeApiResponse> => {
  const { data } = await axiosInstance.get('/request/proposalHome', {
    params: { page: 0 },
  });
  return data;
};

export const deleteProposal = async (proposalId: string) => {
  const { data } = await axiosInstance.delete(`/request/proposal/${proposalId}`);
  return data;
};

export const deleteNotice = async (notificationId: number) => {
  const { data } = await axiosInstance.delete(`/notifications/${notificationId}`);
  return data;
};

export const deleteBanner = async (bannerId: number) => {
  const { data } = await axiosInstance.delete(`/banners/${bannerId}`);
  return data;
};