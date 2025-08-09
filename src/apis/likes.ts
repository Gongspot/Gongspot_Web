import type { ResponseLikesDTO } from "../types/space";
import { axiosInstance } from "./axios";

export const getLikes = async (): Promise<ResponseLikesDTO> => {
    const { data } = await axiosInstance.get('/places/liked');
    return data;
};