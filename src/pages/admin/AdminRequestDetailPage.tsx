import { useParams, useLocation, useNavigate } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import AdminBottomNavBar from "../../components/AdminBottomNavBar";
import { useProposalDetail } from "../../hooks/useProposalDetail";
import { format } from 'date-fns';

const AdminRequestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅 추가
  const isReviewed = location.state?.isReviewed;

  const { data: request, isLoading, isError } = useProposalDetail(id);

  // '승인' 버튼 클릭 시 실행될 함수
  const handleApprove = () => {
    if (!request) return;
    // /admin/create-space 경로로 이동하면서 state에 정보 전달
    navigate('/admin/create-space', {
      state: {
        placeName: request.name,
        googleMapsLink: request.link,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopHeader title="등록 요청 검토" backButton />
        <div className="flex-1 flex items-center justify-center">로딩 중...</div>
        <AdminBottomNavBar />
      </div>
    );
  }

  if (isError || !request) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopHeader title="등록 요청 검토" backButton />
        <div className="flex-1 flex items-center justify-center text-gray-400">
          등록 요청을 찾을 수 없습니다.
        </div>
        <AdminBottomNavBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopHeader title="등록 요청 검토" backButton />
      <div className="flex-1 px-5 py-6 bg-[#FFFFFF]">
        {/* 상단 정보 */}
        <div className="flex items-center mb-1">
          <div className="text-xl font-semibold mr-2">{request.name}</div>
          <span className={`rounded px-3 py-1 text-xs font-semibold ${isReviewed ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"}`}>
            {isReviewed ? "승인" : "검토중"}
          </span>
        </div>
        <div className="text-xs text-gray-500 mb-5">
          {format(new Date(request.createdAt), 'yyyy.MM.dd')} 신청
        </div>
        
        {/* 상세 입력 폼 */}
        <div className="bg-white rounded-xl p-5 mb-7 border">
          <div className="mb-3">
            <div className="text-m font-semibold mb-2 mt-2 ">장소명</div>
            <input
              className="text-[#ADAEBC] w-full border border-[#ADAEBC] rounded-md px-3 py-2 text-sm bg-gray-50"
              value={request.name}
              readOnly
            />
          </div>
          <div className="mb-3">
            <div className="text-m font-semibold mb-1 mt-5">구글 맵스 링크</div>
            <input
              className="text-[#ADAEBC] w-full border border-[#ADAEBC] rounded-md px-3 py-2 text-sm bg-gray-50"
              value={request.link}
              readOnly
            />
          </div>
          <div>
            <div className="text-m font-semibold mb-1 mt-6">신청 이유</div>
            <textarea
              className="text-[#ADAEBC] w-full h-44 border border-[#ADAEBC] rounded-md px-3 py-2 text-sm resize-none bg-gray-50"
              value={request.reason}
              readOnly
              rows={4}
            />
          </div>
        </div>
        
        {/* 하단 버튼 */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-white border border-[#DFE2E7] rounded-lg font-semibold text-gray-500">
            거절
          </button>
          <button 
            onClick={handleApprove}
            className="flex-1 py-3 bg-[#4CB1F1] rounded-lg font-semibold text-white"
          >
            승인
          </button>
        </div>
      </div>
      <AdminBottomNavBar />
    </div>
  );
};

export default AdminRequestDetailPage;
