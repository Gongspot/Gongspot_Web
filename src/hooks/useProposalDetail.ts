import { useQuery } from '@tanstack/react-query';
import { getProposalDetail } from '../apis/admin';

export const useProposalDetail = (proposalId?: string) => {
  return useQuery({
    queryKey: ['proposalDetail', proposalId],
    queryFn: () => getProposalDetail(proposalId!),
    enabled: !!proposalId, // proposalId가 있을 때만 쿼리 실행
    select: (data) => data.result, // 실제 사용할 result 객체만 추출
  });
};
