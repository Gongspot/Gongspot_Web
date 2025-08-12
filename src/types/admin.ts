export type RequestNoticeDTO = {
    title: string;
    content: string;
    attachments?: File[] | null;
    thumbnailFile?: File | null;
};