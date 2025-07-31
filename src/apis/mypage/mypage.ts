import type { RequestProposalDTO } from "../../types/mypage";
import { axiosInstance } from "../axios";

export const postProposal = async (body: RequestProposalDTO) => {
    const { data } = await axiosInstance.post('/request/proposal', body);
    return data;
};