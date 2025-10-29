// approveProposal.ts
import { axiosInstance } from "./axios";

export async function approveProposal(proposalId: number, body: any) {
  try {
    const res = await axiosInstance.post("/places/approve", body, {
      params: { proposalId },
      withCredentials: true,
    });
    return !!res.data?.isSuccess;
  } catch (e: any) {
    console.log("[approveProposal] status:", e?.response?.status);
    console.log("[approveProposal] payload:", e?.response?.data);
    return false;
  }
}
