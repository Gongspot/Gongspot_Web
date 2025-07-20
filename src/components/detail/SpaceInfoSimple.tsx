// src/components/detail/SpaceInfoSimple.tsx
import type { Space } from "../../constants/dummySpaces";
import mapSample from "../../assets/map_sample.jpg";

interface Props {
  space: Space;
}

const SpaceInfoSimple = ({ space }: Props) => {
  return (
    <div className="text-sm text-gray-800 space-y-6">
      {/* 위치정보 */}
      <div>
        <div className="font-semibold mb-2">위치정보</div>
        <img
          src={mapSample}
          alt="지도 미리보기"
          className="w-full h-28 object-cover rounded-xl mb-2"
        />
        <div>{space.address}</div>
      </div>

       {/* 영업정보 */}
      <div>
        <div className="font-semibold mb-2">영업정보</div>
        <div className="mb-1">운영시간: {space.opening}</div>
        <div className="mb-1">정기휴무: {space.holiday}</div>
        <div className="mb-1">전화번호: {space.phone}</div>
      </div>
    </div>
  );
};

export default SpaceInfoSimple;
