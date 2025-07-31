import type { CommonResponse } from "./common";

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