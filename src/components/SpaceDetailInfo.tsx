import React, { useState } from "react";
import type { Space } from "../constants/dummySpaces";
import mapSample from "../assets/map_sample.jpg";
import SpaceCongestionCard from "./SpaceCongestionCard";

// 급변하는 더미 혼잡도 데이터 (9시~24시, 16개씩)
const dummyCongestion = [
  [3, 4, 6, 34, 26, 19, 12, 7, 4, 3, 9, 13, 18, 24, 32, 40], // 월
  [2, 3, 5, 8, 17, 9, 5, 3, 2, 14, 22, 33, 42, 48, 40, 29], // 화
  [4, 5, 7, 11, 18, 26, 36, 44, 50, 41, 30, 21, 13, 7, 4, 3], // 수
  [3, 44, 55, 60, 52, 4, 8, 14, 22, 31, 38, 25, 15, 8, 5, 2], // 목
  [2, 5, 11, 21, 34, 74, 65, 52, 37, 22, 49, 62, 70, 11, 5, 2], // 금
  [1, 2, 7, 16, 31, 18, 8, 3, 1, 28, 43, 57, 68, 71, 64, 47], // 토
  [2, 4, 8, 14, 27, 15, 7, 3, 2, 22, 34, 48, 60, 62, 56, 40], // 일
];
const days = ["월", "화", "수", "목", "금", "토", "일"];
const hours = Array.from({ length: 16 }, (_, i) => 9 + i);

function getCurrentHourIndex() {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 9) return 0;
  if (hour > 24) return 15;
  return hour - 9;
}

const SpaceDetailInfo: React.FC<{ space: Space }> = ({ space }) => {
  const [selectedDay, setSelectedDay] = useState(() => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1;
  });
  const [copySuccess, setCopySuccess] = useState(false);

  const currentHourIdx = getCurrentHourIndex();
  const congestionData = dummyCongestion[selectedDay];

  // 주소 복사 핸들러
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(space.address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    } catch (err) {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div className="px-5 py-4">
      {/* 영업정보 */}
      <div>
        <div className="font-semibold mb-2">영업정보</div>
        <div className="text-sm mb-1">운영시간: {space.opening}</div>
        <div className="text-sm mb-1">정기휴무: {space.holiday}</div>
        {/* 전화번호(전화 버튼 포함) */}
        <div className="text-sm mb-1 flex items-center gap-2">
          <span>전화번호</span>
          <span className="ml-1 font-medium">{space.phone}</span>
          <a
            href={`tel:${space.phone}`}
            className="text-[10px] font-bold bg-gray-100 text-gray-500 rounded-lg ml-1 w-10 transition text-center"
            style={{ userSelect: "none" }}
          >
            전화
          </a>
        </div>
      </div>

      {/* 위치정보 (주소 복사 버튼 포함) */}
      <div className="mt-10">
        <div className="font-semibold mb-2">위치정보</div>
        <img
          src={mapSample}
          alt="지도"
          className="w-full h-28 object-cover rounded-xl mt-2"
        />
        <div className="text-sm flex items-center gap-2 mt-2">
          <span>{space.address}</span>
          <button
            onClick={handleCopyAddress}
            className="text-[10px] font-bold bg-gray-100 text-gray-500 rounded-lg ml-1 w-10 transition"
            style={{ userSelect: "none" }}
          >
            복사
          </button>
          {copySuccess && (
            <span className="ml-0.5 text-[8px] text-gray-400">복사되었습니다.</span>
          )}
        </div>
      </div>

      {/* 예상 혼잡도 */}
      <div className="mt-12 w-full flex flex-col items-center">
        <div className="font-semibold mb-2 w-[360px] text-left">예상 혼잡도</div>
        <div className="flex justify-between text-xs text-gray-400 w-[360px] mx-auto mb-1 px-1">
          <span>9시</span>
          <span>14시</span>
          <span>24시</span>
        </div>
        {/* 막대그래프 */}
        <div
          className="relative w-[360px] flex items-end justify-between"
          style={{ height: "120px" }}
        >
          {congestionData.map((v, i) => (
            <div
              key={i}
              className={`
                w-3 rounded-t-lg transition-all duration-300
                ${i === currentHourIdx ? "bg-sky-500" : "bg-sky-200"}
              `}
              style={{
                height: `${v * 1.2 + 20}px`,
                opacity: 1,
              }}
            />
          ))}
        </div>

        {/* 요일 선택 바 */}
        <div className="flex gap-2 mt-3 justify-center w-[360px]">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`rounded-full px-4 py-1 text-sm font-semibold
                ${
                  i === selectedDay
                    ? "bg-gray-100 text-black"
                    : "bg-transparent text-gray-400"
                }
                transition
              `}
            >
              {d}
            </button>
          ))}
        </div>
        {/* 현재 해당 시간 */}
        <div className="w-[360px] mt-2 text-xs text-gray-400 text-left">
          현재 해당 시간: {hours[currentHourIdx]} - {hours[currentHourIdx] + 1}
          시
        </div>
      </div>

      {/* 실시간 혼잡도 */}
      <div className="mt-6">
        <div className="font-semibold mb-2">실시간 혼잡도</div>
        {space.realTimeCongestion.map((d, i) => (
          <SpaceCongestionCard
            key={i}
            type={d.type}
            comment={d.comment}
            date={d.date}
            ago={d.ago}
          />
        ))}
      </div>
    </div>
  );
};

export default SpaceDetailInfo;