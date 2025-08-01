import type { ResponsePointDTO, ResponsePointHistoryDTO } from "../../types/mypage";
import { axiosInstance } from "../axios";

export const getPoint = async (): Promise<ResponsePointDTO> => {
    const { data } = await axiosInstance.get('/points/total');
    return data;
};

export const getPointHistory = async (): Promise<ResponsePointHistoryDTO> => {
    const { data } = await axiosInstance.get('/points/history');
    return data;
};