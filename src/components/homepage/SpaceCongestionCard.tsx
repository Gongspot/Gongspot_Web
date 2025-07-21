// src/components/homepage/SpaceCongestionCard.tsx

import React from "react";
import profile from "../../assets/profile2.svg"; // 프로필 SVG 경로

interface CongestionCardProps {
  type: string;
  comment: string;
  date: string;
  ago: string;
}

// 날짜를 '오늘', 'N일 전'으로 변환
function getDateLabel(dateStr: string) {
  const today = new Date();
  const target = new Date(dateStr);

  if (isNaN(target.getTime())) return dateStr;

  const diff = Math.floor((today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "오늘";
  if (diff === 1) return "1일 전";
  return `${diff}일 전`;
}

const SpaceCongestionCard: React.FC<CongestionCardProps> = ({
  type,
  comment,
  date,
  ago,
}) => (
  <div className="flex items-center border border-gray-200 rounded-lg p-2 mb-2 text-sm bg-white relative">
    {/* 프로필 SVG */}
    <img src={profile} alt="profile" className="w-6 h-6 mr-2 ml-1" />

    <span className="mr-2 font-medium">{type}</span>
    <span
      className="flex-1 ml-2 truncate"
      style={{
        maxWidth: 180,        // 필요에 따라 조정하세요 (부모 영역에 맞게)
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}
    >
      {comment}
    </span>
    <span className="text-xs text-gray-400 mr-2">{getDateLabel(date)}</span>
    <span className="text-xs text-gray-400 mr-2">{ago}</span>
  </div>
);

export default SpaceCongestionCard;
