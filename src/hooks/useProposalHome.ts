import { useQuery } from '@tanstack/react-query';
import { getProposalHome } from '../apis/admin';

export const useProposalHome = () => {
  return useQuery({
    queryKey: ['proposalHome'],
    queryFn: getProposalHome,
    select: (data) => data.result, // 실제 사용할 result 객체만 추출
  });
};
