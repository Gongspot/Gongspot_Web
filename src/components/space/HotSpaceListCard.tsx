import React from "react";
import heartIcon from "../../assets/heart.svg"; // 찜하기 SVG 아이콘

interface Props {
  rank: number;
  image: string;
  title: string;
  liked: boolean;
  onLike: () => void;
  onClick: () => void;
  className?: string;
}

const HotSpaceListCard: React.FC<Props> = ({
  rank,
  image,
  title,
  liked,
  onLike,
  onClick,
  className = "",
}) => (
  <div
    className={`relative w-full overflow-hidden rounded-2xl shadow-md aspect-square focus:outline-none ${className}`}
    style={{ background: "#fff", cursor: "pointer" }}
    onClick={onClick}
    tabIndex={0}
    role="button"
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") onClick();
    }}
  >
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover"
      draggable={false}
    />
    <div className="absolute inset-0 bg-black bg-opacity-35" />
    {/* 순위 */}
    <span className="absolute top-3 left-3 text-white font-bold text-2xl drop-shadow-lg z-10">
      {rank}
    </span>
    {/* 제목 */}
    <span className="absolute top-10 left-3 text-white text-base z-10">
      {title}
    </span>
    {/* 좋아요(찜) 버튼 */}
    <button
      type="button"
      className="absolute bottom-3 right-3 z-20"
      onClick={(e) => {
        e.stopPropagation();
        onLike();
      }}
      aria-label="좋아요"
      style={{ lineHeight: 0, background: "none", border: "none" }}
    >
      <img
        src={heartIcon}
        alt="좋아요 아이콘"
        width={25}
        height={25}
        // ▼▼▼ liked가 false일 때 CSS 필터로 회색조 처리 ▼▼▼
        style={{ filter: liked ? "none" : "grayscale(100%) brightness(1.5)" }}
        className="transition-transform duration-150 active:scale-90"
      />
    </button>
  </div>
);

export default HotSpaceListCard;