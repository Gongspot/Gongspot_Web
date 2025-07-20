import TopHeader from "../../components/TopHeader";
import SpaceInfoSimple from "../../components/detail/SpaceInfoSimple";
import dummySpaces from "../../constants/dummySpaces";
import type { Space } from "../../constants/dummySpaces";
import { useNavigate } from "react-router-dom";

const AdminConfirmSpacePage = () => {
  const navigate = useNavigate();

  // 예시: 첫 번째 공간 데이터 사용
  const space: Space = dummySpaces[0];

  const handleConfirm = () => {
    navigate("/admin/init-space-info", {
      state: {
        placeName: space.name,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-32 relative">
      <TopHeader title="새 공간 등록" />

      {/* 안내 문구 */}
      <p className="mt-6 text-center text-sm text-gray-700 whitespace-pre-line mb-6">
        이 공간 정보를 등록하시겠습니까?
        {"\n"}확인 후 진행해주세요.
      </p>

      {/* 장소명 */}
      <h2 className="text-xl font-bold mb-2">{space.name}</h2>

      {/* 정보 박스 */}
      <div className="border border-gray-300 bg-white rounded-lg p-4 mb-10">
        <SpaceInfoSimple space={space} />
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[400px] w-full mx-auto bg-white px-4 py-4">
        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-600 bg-white"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2 rounded-md text-sm font-semibold text-white bg-[#4cb1f1]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminConfirmSpacePage;
