// src/pages/AdminCreateSpacePage.tsx
import TopHeader from "../../components/TopHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가

const AdminCreateSpacePage = () => {
  const [placeName, setPlaceName] = useState("");
  const [googleMapsLink, setGoogleMapsLink] = useState("");
  const [isValidationFailed, setIsValidationFailed] = useState(false); // 실패 상태

  const navigate = useNavigate(); // 함수 내부에 추가

  const handleFetchInfo = () => {
    // 항상 성공 처리
    setIsValidationFailed(false);

    navigate("/admin/confirm-space", {
      state: {
        placeName,
        googleMapsLink,
      },
    });
    
    // const normalizedPlaceName = placeName.trim().toLowerCase();
    // const normalizedLink = googleMapsLink.trim().toLowerCase();

    // if (!normalizedLink.includes(normalizedPlaceName) || !normalizedPlaceName) {
    //   setIsValidationFailed(true);
    // } else {
    //   setIsValidationFailed(false);

    //   // 성공 시 확인 페이지로 이동 + state로 정보 전달
    //   navigate("/admin/confirm-space", {
    //     state: {
    //       placeName,
    //       googleMapsLink,
    //     },
    //   });
    // }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 헤더 */}
      <TopHeader title="새 공간 등록" />

      {/* 본문 */}
      <div className="px-4 py-6">
        <p className="text-sm text-gray-700 mb-6 text-center">
          등록할 공간의 정보를 입력해주세요.
        </p>

        <div className="rounded-lg border border-gray-200 p-4 bg-white">
          <div className="mb-8">
            <label className="block text-sm mb-1">장소명</label>
            <input
              type="text"
              placeholder="공간 이름을 작성해주세요."
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-[#4cb1f1]"
            />
          </div>

          <div className="mb-10">
            <label className="block text-sm mb-1">구글 맵스 링크</label>
            <input
              type="text"
              placeholder="공간 관련 정보를 입력해주세요."
              value={googleMapsLink}
              onChange={(e) => setGoogleMapsLink(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-[#4cb1f1]"
            />
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={handleFetchInfo}
              className="w-fit bg-[#4cb1f1] text-white text-sm py-2 px-6 rounded-full"
            >
              공간 정보 가져오기
            </button>
          </div>
        </div>

        {/* 실패 메시지 박스 (조건부 렌더링) */}
        {isValidationFailed && (
          <div className="flex justify-center w-full mt-8">
            <div className="bg-gray-100 text-sm text-gray-700 font-semibold rounded-md px-4 py-3 text-center whitespace-pre-line w-full max-w-[640px]">
              공간 조회에 실패했습니다.
              {"\n"}공간명과 링크를 다시 확인해주세요.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCreateSpacePage;
