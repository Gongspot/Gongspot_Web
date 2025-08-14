import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteProposal } from '../apis/admin';

export const useDeleteProposal = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (proposalId: string) => deleteProposal(proposalId),
    onSuccess: () => {
      // 성공 시, 관련 목록 데이터 캐시를 무효화하여 새로고침 유도
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['proposalHome'] });
      alert("요청이 거절(삭제)되었습니다.");
      navigate('/admin/all-requests'); // 목록 페이지로 이동
    },
    onError: (error) => {
      console.error("요청 거절 실패:", error);
      alert("요청 거절에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
