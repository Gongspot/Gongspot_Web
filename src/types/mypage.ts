import type { CommonResponse } from "./common";

export type ResponsePointDTO = CommonResponse<{
    userId: number;
    totalPoints: number;
}>;

export type PointHistoryPageInfo = {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
};

export type PointHistoryResult = {
    pointId: number;
    content: string;
    updatedPoint: number;
    date: string;
};

export type ResponsePointHistoryDTO = CommonResponse<{
    pageInfo: PointHistoryPageInfo;
    result: PointHistoryResult[];
}>;

export interface Notice {
    notificationId: number;
    date: string;
    title: string;
};

export type ResponseNoticeDTO = CommonResponse<{
    notificationList: Notice[];
}>;

export interface NoticeDetail extends Notice {
    content: string;
}

export type ResponseNoticeDetailDTO = CommonResponse<NoticeDetail>;

export type RequestProposalDTO = {
    name: string;
    link: string;
    reason: string;
};

export type ResponseProfileDTO = CommonResponse<{
    nickname: string;
    profileImg: string;
}>;

export type VisitedPlaces = {
    placeId: number;
    name: string;
    rate: number;
    visitedDate: string;
    type: string;
    isLiked: boolean;
};

export type ResponseVisitDTO = CommonResponse<{
    totalCount: number;
    visitedPlaces: VisitedPlaces[];
}>;

export type Attachments = {
    attachmentId: number;
    url: string;
    fileName: string;
};

export type Banner = {
    bannerId: number;
    title: string;
    content: string;
    datetime: string;
    thumbnailUrl: string;
    attachments: Attachments[];
};

export type ResponseBannerDetailDTO = CommonResponse<Banner>;