import React from "react";

interface CongestionCardProps {
  type: string;
  comment: string;
  date: string;
  ago: string;
}

const SpaceCongestionCard: React.FC<CongestionCardProps> = ({
  type,
  comment,
  date,
  ago,
}) => (
  <div className="flex items-center border border-gray-200 rounded-lg p-2 mb-2 text-sm bg-white">
    <span className="mr-2 font-medium ml-2">{type}</span>
    <span className="flex-1 ml-2">{comment}</span>
    <span className="text-xs text-gray-400 mr-2">
      {date}
    </span>
    <span className="text-xs text-gray-400 mr-2">
      {ago}
    </span>
  </div>
);

export default SpaceCongestionCard;
