import TopHeader from "../../components/TopHeader";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminCreateSpacePage = () => {
  // 추가된 코드: useLocation 훅을 사용해 이전 페이지에서 보낸 state를 받음
  const location = useLocation();
  const navigate = useNavigate();

  // 추가된 코드: location.state에서 초기값을 가져오고, 없으면 빈 문자열로 설정
  const initialPlaceName = location.state?.placeName || "";
  const initialGoogleMapsLink = location.state?.googleMapsLink || "";

  // 추가된 코드: useState의 초기값으로 위에서 받은 값
  const [placeName, setPlaceName] = useState(initialPlaceName);
  const [googleMapsLink, setGoogleMapsLink] = useState(initialGoogleMapsLink);
  const [isValidationFailed, setIsValidationFailed] = useState(false);

  const handleFetchInfo = () => {
    // 항상 성공 처리 (이 부분은 원래 주석 처리된 로직으로 되돌릴 수 있습니다)
    // setIsValidationFailed(false);

    // navigate("/admin/confirm-space", {
    //   state: {
    //     placeName,
    //     googleMapsLink,
    //   },
    // });
    
    // 원래 있던 유효성 검사 로직입니다.
    const normalizedPlaceName = placeName.trim().toLowerCase();
    const normalizedLink = googleMapsLink.trim().toLowerCase();

    if (!normalizedLink.includes(normalizedPlaceName) || !normalizedPlaceName) {
      setIsValidationFailed(true);
    } else {
      setIsValidationFailed(false);

      // 성공 시 확인 페이지로 이동 + state로 정보 전달
      navigate("/admin/confirm-space", {
        state: {
          placeName,
          googleMapsLink,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 헤더 */}
      <TopHeader title="새 공간 등록" />

      {/* 안내 문구 */}
      <p className="w-[224px] h-[28px] absolute top-[66px] left-1/2 -translate-x-1/2 text-md text-black text-center opacity-100">
        등록할 공간의 정보를 입력해주세요.
      </p>

      {/* 본문 */}
      <div className="absolute w-[334px] h-[316px] top-[110px] left-1/2 -translate-x-1/2 rounded-[5px] border border-gray-200 bg-white p-4">
        <div className="mb-6">
          <label className="block text-sm mb-1">장소명</label>
          <input
            type="text"
            placeholder="공간 이름을 작성해주세요."
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-[#4cb1f1]"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm mb-1">구글 맵스 링크</label>
          <input
            type="text"
            placeholder="공간 관련 정보를 입력해주세요."
            value={googleMapsLink}
            onChange={(e) => setGoogleMapsLink(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:border-[#4cb1f1]"
          />
        </div>

        {/* 3. 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleFetchInfo}
            className="absolute top-[224px] left-1/2 -translate-x-1/2 w-[146px] h-[34px] px-[34px] rounded-[20px] text-sm bg-[#4cb1f1] text-white border border-gray-300 flex items-center justify-center text-nowrap"
          >
            공간 정보 가져오기
          </button>
        </div>
      </div>

      {/* 4. 실패 메시지 박스 */}
      {isValidationFailed && (
        <div className="absolute top-[440px] left-1/2 -translate-x-1/2 w-[335px] h-[58px] rounded-[15px] bg-gray-100 flex items-center justify-center px-4 py-3 text-center">
          <p className="text-sm text-gray-700 font-semibold whitespace-pre-line">
            공간 조회에 실패했습니다.
            {"\n"}공간명과 링크를 다시 확인해주세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminCreateSpacePage;
