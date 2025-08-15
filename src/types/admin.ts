import type { CommonResponse } from "./common";

export type RequestNoticeDTO = {
    title: string;
    content: string;
    attachments?: File[] | null;
    thumbnailFile?: File | null;
};

export interface NoticeAdmin {
    type: 'B' | 'N';
    bannerId: number | null;
    notificationId: number | null;
    date: string;
    title: string;
};

export type ResponseNoticeAdminDTO = CommonResponse<{
    notificationBannerList: NoticeAdmin[];
}>;

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ProposalItem {
  proposalId: number;
  name: string;
  link: string;
  reason: string;
  createdAt: string;
}

export type ProposalApiResponse = CommonResponse<{
  pageInfo: PageInfo;
  result: ProposalItem[];
}>;

export type ProposalDetailApiResponse = CommonResponse<ProposalItem>;

export type ProposalHomeApiResponse = CommonResponse<{
  totalAllProposalsCount: number;
  totalUnapprovedProposalsCount: number;
  unapprovedProposals: ProposalItem[];
}>;
