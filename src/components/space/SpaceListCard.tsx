import React from "react";
interface Props {
  name: string;
  image: string;
  rating: number;
  distance: number;
  tags: string[];
  isLiked: boolean;
  onDetail: () => void;
  onLike: () => void;
}

const SpaceListCard: React.FC<Props> = ({
  name,
  image,
  rating,
  distance,
  tags,
  isLiked,
  onDetail,
  onLike,
}) => (
  <div className="flex items-center bg-white rounded-2xl shadow px-4 py-4 mb-4 relative" style={{ minHeight: 110 }}>
    <img
      src={image}
      alt={name}
      className="w-[120px] h-[90px] object-cover rounded-xl border border-[#E5ECF2]"
    />

    <div className="flex-1 min-w-0 ml-4">
      <div className="flex items-center mb-1">
        <span className="font-semibold text-base text-[#222] truncate">{name}</span>
      </div>
      <div className="flex items-center text-[#666] text-[15px] gap-1 mb-0.5">
        <svg width={14} height={14} className="inline-block mr-0.5" viewBox="0 0 14 14">
          <circle cx="7" cy="7" r="7" fill="#4CB1F1" />
        </svg>
        <span className="font-medium">{rating}</span>
        <span className="ml-2">{distance}km</span>
      </div>
      <div className="text-xs text-[#6A7A92] truncate">{tags.join(" ")}</div>
      <button
        onClick={onDetail}
        className="block w-[120px] mt-3 py-1.5 rounded-full bg-sky-400 text-white text-base font-semibold shadow active:bg-sky-500"
        style={{ fontSize: "15px" }}
      >
        상세보기
      </button>
    </div>

    <button
      className="absolute top-3 right-3"
      onClick={onLike}
      aria-label="좋아요"
      style={{ background: "none", border: "none" }}
    >
      <svg
        width={24}
        height={24}
        fill={isLiked ? "#FF7D8A" : "none"}
        stroke={isLiked ? "#FF7D8A" : "#C2C7CE"}
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M12 21s-6.7-5.2-8.2-7.1A5.4 5.4 0 0 1 5.5 5.5a5.5 5.5 0 0 1 6.5.7 5.5 5.5 0 0 1 6.5-.7 5.4 5.4 0 0 1 1.7 8.4C18.7 15.8 12 21 12 21z" />
      </svg>
    </button>
  </div>
);

export default SpaceListCard;
