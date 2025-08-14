import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import type { SpaceDetail } from "../../types/space";
import SpaceDetailMap from "./SpaceDetailMap";
import OperatingHours from "./OperatingHours";
import { useLatestCongestions } from "../../hooks/useLatestCongestions";
import { FaUserCircle } from "react-icons/fa";
import { loadKakaoScript } from "../../utils/kakaoMapLoader"; 

const SpaceDetailInfo: React.FC<{ space: SpaceDetail }> = ({ space }) => {
  const navigate = useNavigate();
  const { data: latestCongestions, isLoading: isCongestionLoading } = useLatestCongestions(String(space.placeId));

  const [isMapScriptLoaded, setIsMapScriptLoaded] = useState(false);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        await loadKakaoScript(); // 스크립트 로딩이 끝날 때까지 기다립니다.
        setIsMapScriptLoaded(true); // 로딩이 완료되면 상태를 true로 변경합니다.
      } catch (error) {
        console.error("지도 스크립트 로딩에 실패했습니다:", error);
      }
    };

    initializeMap();
  }, []); // 이 컴포넌트가 처음 렌더링될 때 한 번만 실행합니다.

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(space.locationInfo);
      alert("주소가 복사되었습니다.");
    } catch (err) {
      alert("주소 복사에 실패했습니다.");
    }
  };

  return (
    <div className="px-5 py-4">
      {/* 영업정보 */}
      <div>
        <div className="font-semibold mb-2">영업정보</div>
        <OperatingHours hoursString={space.openingHours} />
        <div className="text-sm mt-1 flex items-center gap-2">
          <span>전화번호</span>
          <span className="ml-1 font-medium">{space.phoneNumber}</span>
          <a
            href={`tel:${space.phoneNumber}`}
            className="text-[10px] font-bold bg-gray-100 text-gray-500 rounded-lg ml-1 w-10 transition text-center"
          >
            전화
          </a>
        </div>
      </div>

      {/* 위치정보 */}
      <div className="mt-10">
        <div className="font-semibold mb-2">위치정보</div>

        {isMapScriptLoaded ? (
          <SpaceDetailMap address={space.locationInfo} />
        ) : (
          <div className="w-full h-[200px] flex items-center justify-center bg-gray-100">
            지도 로딩 중...
          </div>
        )}
        
        <div className="text-sm flex items-center gap-2 mt-2">
          <span>{space.locationInfo}</span>
          <button
            onClick={handleCopyAddress}
            className="text-[10px] font-bold bg-gray-100 text-gray-500 rounded-lg ml-1 w-10 transition"
          >
            복사
          </button>
        </div>
      </div>
      
      {/* 실시간 혼잡도 */}
      <div className="mt-6">
        <div className="font-semibold mb-2 flex justify-between items-center">
          <span>실시간 혼잡도</span>
          <button
            onClick={() => navigate(`/space/${space.placeId}/congestion`)}
            className="text-xs font-medium text-gray-500"
          >
            전체보기 &gt;
          </button>
        </div>
        {isCongestionLoading ? (
          <div>혼잡도 정보 로딩 중...</div>
        ) : !latestCongestions || latestCongestions.length === 0 ? (
          <div className="text-gray-400 text-xs mt-6">혼잡도 정보가 없습니다.</div>
        ) : (
          <div className="space-y-2">
            {latestCongestions.map(item => (
              <div key={item.reviewId} className="flex items-center border border-gray-100 rounded-lg p-2 text-sm bg-white shadow-sm">
                {item.profileImageUrl ? (
                  <img src={item.profileImageUrl} alt={item.nickname} className="w-6 h-6 rounded-full mr-2"/>
                ) : (
                  <FaUserCircle size={24} className="text-gray-400 mr-2" />
                )}
                <span className="font-semibold text-gray-700 w-16 truncate">{item.nickname}</span>
                <span className="flex-1 text-gray-600 truncate">{item.congestion}</span>
                <span className="text-xs text-gray-400 whitespace-nowrap">{item.daytime} {item.datetime}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceDetailInfo;