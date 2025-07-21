// src/components/admin/home/AdminRequestCard.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";

interface Props {
  id: number;
  placeName: string;
  date: string;
  isReviewed: boolean;
  googleMapsUrl?: string;
}

const AdminRequestCard: React.FC<Props> = ({
  id,
  placeName,
  date,
  isReviewed,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl flex items-center px-2 py-2 shadow-sm border border-[#D8D8D8] cursor-pointer"
      onClick={() => navigate(`/admin/request/${id}`)}
    >
      <FaBuilding className="text-[#D9E3EF] mr-3" size={28} />
      <div className="flex-1">
        <div className="font-semibold">{placeName}</div>
        <div className="text-xs text-gray-500">{date} 신청</div>
      </div>
      <span
        className={
          isReviewed
            ? "ml-3 bg-[#F1F2F4] text-[#A4A8B0] rounded px-3 py-1 text-xs font-semibold"
            : "ml-3 bg-[#EFF7FB] rounded px-3 py-1 text-xs font-semibold"
        }
      >
        {isReviewed ? "승인" : "검토"}
      </span>
    </div>
  );
};

export default AdminRequestCard;
