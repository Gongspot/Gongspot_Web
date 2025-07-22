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
    <div className="min-h-screen bg-white">
      {/* 상단 헤더 */}
      <TopHeader title="새 공간 등록" />

      {/* 안내 문구 */}
      <p className="w-[224px] h-[28px] absolute top-[66px] left-1/2 -translate-x-1/2 text-md text-black text-center opacity-100">
        이 공간 정보를 등록하시겠습니까?
        {"\n"}확인 후 진행해주세요.
      </p>

      {/* 정보 박스 */}
      <div className="w-full px-[15px] pt-[100px] flex flex-col items-center">
        <div className="w-[344px] flex flex-col gap-[10px]">
          <h2 className="text-xl font-bold">{space.name}</h2>
          <div className="border border-gray-300 bg-white rounded-lg p-4">
            <SpaceInfoSimple space={space} />
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-[20px] left-1/2 -translate-x-1/2 w-[334px] h-[45px] bg-white flex justify-between gap-[6px]">
        <button
          onClick={() => navigate(-1)}
          className="w-1/2 h-full border border-gray-300 rounded-md text-sm font-semibold text-gray-600 bg-white"
        >
          취소
        </button>
        <button
          onClick={handleConfirm}
          className="w-1/2 h-full rounded-md text-sm font-semibold text-white bg-[#4cb1f1]"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AdminConfirmSpacePage;
