import type { ResponseNoticeDTO } from "../../types/mypage";
import { axiosInstance } from "../axios";

export const getNotice = async (): Promise<ResponseNoticeDTO> => {
    const { data } = await axiosInstance.get('/notifications');
    return data;
};