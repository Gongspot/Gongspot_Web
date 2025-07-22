import React from "react";

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
    {/* 좋아요(찜) 버튼: SpaceListCard 디자인과 동일, 우하단 */}
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
      <svg
        width={25}
        height={25}
        fill={liked ? "#FF7D8A" : "#FFFFFF"}
        stroke={liked ? "#FF7D8A" : "#C2C7CE"}
        strokeWidth={1}
        viewBox="0 0 24 24"
      >
        <path d="M12 21s-6.7-5.2-8.2-7.1A5.4 5.4 0 0 1 5.5 5.5a5.5 5.5 0 0 1 6.5.7 5.5 5.5 0 0 1 6.5-.7 5.4 5.4 0 0 1 1.7 8.4C18.7 15.8 12 21 12 21z" />
      </svg>
    </button>
  </div>
);

export default HotSpaceListCard;
