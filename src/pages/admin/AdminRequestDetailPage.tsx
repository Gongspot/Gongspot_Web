import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import AdminBottomNavBar from "../../components/AdminBottomNavBar";
import { adminRequests } from "../../constants/adminRequests";

const AdminRequestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const request = adminRequests.find((r) => r.id === Number(id));

  if (!request) {
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
          <div className="text-xl font-semibold mr-2">{request.placeName}</div>
          <span className="bg-[#F1F2F4] text-[#A4A8B0] rounded px-3 py-1 text-xs font-semibold">
            {request.isReviewed ? "승인" : "검토중"}
          </span>
        </div>
        <div className="text-xs text-gray-500 mb-5">{request.date} 신청</div>
        {/* 상세 입력 폼 */}
        <div className="bg-white rounded-xl p-5 mb-7 border">
          <div className="mb-3">
            <div className="text-m font-semibold mb-2 mt-2 ">장소명</div>
            <input
              className="text-[#ADAEBC] w-full  border border-[#ADAEBC] rounded-md px-3 py-2 text-sm"
              value={request.placeName}
              disabled
            />
          </div>
          <div className="mb-3">
            <div className="text-m font-semibold mb-1 mt-5">구글 맵스 링크</div>
            <input
              className="text-[#ADAEBC] w-full border border-[#ADAEBC] rounded-md px-3 py-2 text-sm"
              value={request.googleMapsUrl}
              disabled
            />
          </div>
          <div>
            <div className="text-m font-semibold mb-1 mt-6">신청 이유</div>
            <textarea
              className="text-[#ADAEBC] w-full h-44 border border-[#ADAEBC] rounded-md px-3 py-2 text-sm resize-none"
              value={request.reason}
              disabled
              rows={4}
            />
          </div>
        </div>
        {/* 하단 버튼 */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-white border border-[#DFE2E7] rounded-lg font-semibold text-gray-500">
            거절
          </button>
          <button className="flex-1 py-3 bg-[#4CB1F1] rounded-lg font-semibold text-white">
            승인
          </button>
        </div>
      </div>
      <AdminBottomNavBar />
    </div>
  );
};

export default AdminRequestDetailPage;
