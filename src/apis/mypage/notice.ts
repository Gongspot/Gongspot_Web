import type { ResponseBannerDetailDTO, ResponseNoticeDetailDTO, ResponseNoticeDTO } from "../../types/mypage";
import { axiosInstance } from "../axios";

export const getNotice = async (): Promise<ResponseNoticeDTO> => {
    const { data } = await axiosInstance.get('/notifications');
    return data;
};

export const getNoticeDetail = async (notificationId: number): Promise<ResponseNoticeDetailDTO> => {
    const { data } = await axiosInstance.get(`/notifications/${notificationId}`);
    return data;
};

export const getBannerDetail = async (bannerId: number): Promise<ResponseBannerDetailDTO> => {
    const { data } = await axiosInstance.get(`/banners/${bannerId}`);
    return data;
};