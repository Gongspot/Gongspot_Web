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
  enableWholeCardClick?: boolean; // 카드 전체 클릭 허용 여부 (기본 false)
  buttonText?: string;
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
  enableWholeCardClick = false, // 기본값 false
  buttonText,
}) => (
  <div
    className="
      flex items-center relative
      border-b border-[#CCCCCC]
      pr-[30px] pl-[20px] py-5
    "
    onClick={enableWholeCardClick ? onDetail : undefined} // 카드 전체 클릭 적용 여부
  >
    {/* 이미지 영역 */}
    <div className="relative w-[180px] h-[130px] flex-shrink-0 mr-4">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover rounded-xl border border-[#E5ECF2]"
      />
      <button
        className="absolute top-2 right-2 z-10"
        onClick={(e) => {
          e.stopPropagation(); // 카드 클릭 이벤트 방지
          onLike();
        }}
        aria-label="좋아요"
        style={{ lineHeight: 0, background: "none", border: "none" }}
      >
        <svg
          width={25}
          height={25}
          fill={isLiked ? "#FF7D8A" : "#FFFFFF"}
          stroke={isLiked ? "#FF7D8A" : "#C2C7CE"}
          strokeWidth={1}
          viewBox="0 0 24 24"
        >
          <path d="M12 21s-6.7-5.2-8.2-7.1A5.4 5.4 0 0 1 5.5 5.5a5.5 5.5 0 0 1 6.5.7 5.5 5.5 0 0 1 6.5-.7 5.4 5.4 0 0 1 1.7 8.4C18.7 15.8 12 21 12 21z" />
        </svg>
      </button>
    </div>

    {/* 내용 영역 */}
    <div className="flex-1 min-w-0 flex flex-col justify-center0">
      <div className="font-semibold text-l text-[#222] truncate mb-2">
        {name}
      </div>
      <div className="flex items-center text-[15px]">
        <span className="flex items-center">
          <svg
            width={12}
            height={12}
            viewBox="0 0 20 20"
            fill="#FFFFFF"
            stroke="#000000"
            stroke-width="1"
            className="inline"
          >
            <path d="M10 15.272l-5.708 3.11 1.09-6.365L.764 7.982l6.383-.927L10 1.018l2.853 6.037 6.383.927-4.618 4.035 1.09 6.365z" />
          </svg>
          <span className="font-medium ml-2 text-[13px]">{rating}</span>
        </span>
      </div>
      <div>
        <span className="text-[#000000] text-[13px]">{distance}km</span>
      </div>
      <div className="text-[13px] truncate mb-2">
        {tags.join(" ")}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDetail();
        }}
        className="block w-[140px] py-1 rounded-full bg-[#4CB1F1] text-white text-[13px] font-semibold active:bg-sky-500"
      >
        {buttonText || "상세보기"}
      </button>
    </div>
  </div>
);

export default SpaceListCard;
