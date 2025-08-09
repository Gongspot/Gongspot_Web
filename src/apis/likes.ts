import type { ResponseLikesDTO } from "../types/space";
import { axiosInstance } from "./axios";

export const getLikes = async (isFree: 'ALL' | 'FREE' | 'PAID'): Promise<ResponseLikesDTO> => {
    const { data } = await axiosInstance.get(`/places/liked?isFree=${isFree}`);
    return data;
};