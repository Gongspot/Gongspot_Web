import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { SpaceDetail } from "../../types/space";
import LocationMap from "./LocationMap";
import OperatingHours from "./OperatingHours";
import { useLatestCongestions } from "../../hooks/useLatestCongestions";
import { FaUserCircle } from "react-icons/fa";
import { getCoordsByAddress } from "../../utils/location"; // 주소 변환 유틸리티

const SpaceDetailInfo: React.FC<{ space: SpaceDetail }> = ({ space }) => {
  const navigate = useNavigate();
  const { data: latestCongestions, isLoading: isCongestionLoading } = useLatestCongestions(String(space.placeId));

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (space.locationInfo) {
        try {
          const coords = await getCoordsByAddress(space.locationInfo);
          setCoordinates(coords);
        } catch (error) {
          console.error("주소 좌표 변환 실패:", error);
        }
      }
    };
    fetchCoordinates();
  }, [space.locationInfo]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(space.locationInfo);
      alert("주소가 복사되었습니다.");
    } catch (err) {
      alert("주소 복사에 실패했습니다.");
    }
  };

  const handleDirections = () => {
    if (coordinates) {
      const url = `https://map.kakao.com/link/to/${space.name},${coordinates.lat},${coordinates.lng}`;
      window.open(url, '_blank');
    } else {
      alert("위치 좌표를 가져올 수 없어 길찾기를 실행할 수 없습니다.");
    }
  };

  // 주소 표시를 위한 로직
  const formatAddress = (address: string) => {
    let formatted = address;
    if (formatted.startsWith("대한민국 ")) {
      formatted = formatted.substring(5); // "대한민국 " (5글자 + 공백) 제거
    }
    if (formatted.length > 20) {  // 20글자 이상일 경우
      // 20글자까지만 표시하고 나머지는 '...'으로 대체
      formatted = formatted.replace(/(\s+)/g, ' ').trim();
      return `${formatted.substring(0, 20)}...`;
    }
    return formatted;
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
        <LocationMap address={space.locationInfo} />
        <div className="text-sm flex items-center gap-2 mt-2">
          <span className="flex-1 truncate">
            {/* 포맷팅 함수를 사용하여 주소 표시 */}
            {formatAddress(space.locationInfo)}
          </span>
          <button
            onClick={handleCopyAddress}
            className="text-[10px] font-bold bg-gray-100 text-gray-500 rounded-lg w-10 flex-shrink-0 transition"
          >
            복사
          </button>
          <button
            onClick={handleDirections}
            disabled={!coordinates}
            className="text-[10px] font-bold bg-yellow-400 text-black rounded-lg w-10 flex-shrink-0 transition disabled:bg-gray-300 disabled:text-gray-500"
          >
            길찾기
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
