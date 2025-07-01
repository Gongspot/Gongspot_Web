import React from "react";
import type { Space } from "../constants/dummySpaces";
import mapSample from "../assets/map_sample.jpg";

const SpaceDetailInfo: React.FC<{ space: Space }> = ({ space }) => (
  <div className="px-5 py-4">
    {/* 운영정보 */}
    <div>
      <div className="font-semibold mb-2">영업정보</div>
      <div className="text-sm mb-1">운영시간: {space.opening}</div>
      <div className="text-sm mb-1">정기휴무: {space.holiday}</div>
      <div className="text-sm mb-1">전화번호: {space.phone}</div>
    </div>
    {/* 위치정보 */}
    <div className="mt-4">
      <div className="font-semibold mb-2">위치정보</div>
      <div className="text-sm">{space.address}</div>
      <img src={mapSample} alt="지도" className="w-full h-28 object-cover rounded-xl mt-2" />
    </div>
    {/* 예상 혼잡도(간단한 그래프) */}
    <div className="mt-6">
      <div className="font-semibold mb-2">예상 혼잡도</div>
      <div className="flex gap-1 items-end h-20">
        {space.congestionGraph.map((v, i) => (
          <div key={i} className="bg-sky-300 w-4 rounded-t" style={{ height: `${v * 4}px` }}></div>
        ))}
      </div>
    </div>
    {/* 실시간 혼잡도 */}
    <div className="mt-6">
      <div className="font-semibold mb-2">실시간 혼잡도</div>
      {space.realTimeCongestion.map((d, i) => (
        <div key={i} className="flex items-center bg-gray-100 rounded-lg p-2 mb-2 text-sm">
          <span className="mr-2 font-medium">{d.type}</span>
          <span className="flex-1">{d.comment}</span>
          <span className="text-xs text-gray-400">{d.date} {d.ago}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SpaceDetailInfo;
