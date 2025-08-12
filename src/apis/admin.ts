import type { ResponseNoticeAdminDTO } from "../types/admin";
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