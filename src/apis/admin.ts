import { axiosInstance } from "./axios";

export const postNotice = async (formData: FormData, category: string) => {
    const { data } = await axiosInstance.post(`/notifications/${category}`, formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return data;
};