import type { ResponsePointHistoryDTO } from "../../types/mypage";
import { axiosInstance } from "../axios";

export const getPointHistory = async (): Promise<ResponsePointHistoryDTO> => {
    const { data } = await axiosInstance.get('/points/history');

    return data;
};