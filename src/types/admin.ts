import type { CommonResponse } from "./common";

export type RequestNoticeDTO = {
    title: string;
    content: string;
    attachments?: File[] | null;
    thumbnailFile?: File | null;
};

export interface NoticeAdmin {
    type: string;
    bannerId: number;
    notificationId: number;
    date: string;
    title: string;
};

export type ResponseNoticeAdminDTO = CommonResponse<{
    notificationBannerList: NoticeAdmin[];
}>;