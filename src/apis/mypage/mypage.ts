import type { RequestProposalDTO, ResponseProfileDTO } from "../../types/mypage";
import { axiosInstance } from "../axios";

export const postProposal = async (body: RequestProposalDTO) => {
    const { data } = await axiosInstance.post('/request/proposal', body);
    return data;
};

export const getProfile = async (): Promise<ResponseProfileDTO> => {
    const { data } = await axiosInstance.get('/users/profile');
    return data;
};