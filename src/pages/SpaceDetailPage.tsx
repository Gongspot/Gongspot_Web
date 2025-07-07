import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dummySpaces from "../constants/dummySpaces";
import dummyReviews from "../constants/dummyReviews";
import SpaceDetailInfo from "../components/space/SpaceDetailInfo";
import SpaceDetailReview from "../components/space/SpaceDetailReview";
import { FaHeart, FaRegClock , FaStar } from "react-icons/fa";

function isOpen(opening: string): boolean {
  // 예시: "오늘 10:00 ~ 22:00"
  const match = opening.match(/(\d{2}):(\d{2}) ~ (\d{2}):(\d{2})/);
  if (!match) return false;
  const now = new Date();
  const open = new Date();
  open.setHours(Number(match[1]), Number(match[2]), 0);
  const close = new Date();
  close.setHours(Number(match[3]), Number(match[4]), 0);
  return now >= open && now <= close;
}

const SpaceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<"info" | "review">("info");
  const [liked, setLiked] = useState(false);

  const space = dummySpaces.find((s) => s.id === Number(id)) || dummySpaces[0];
  const open = isOpen(space.opening);

  return (
    <div className="max-w-[400px] mx-auto bg-white min-h-screen shadow-lg">
      {/* 상단 이미지와 카드영역 */}
      <div className="relative">
        <img src={space.image} className="w-full h-[220px] object-cover" />
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* 왼쪽: 이름 + 무료뱃지 */}
          <div className="flex items-center gap-x-2">
            <div className="text-2xl font-bold text-black">{space.name}</div>
            <span className="text-[11px] font-bold bg-[#D8F5FF] rounded-xl py-0.3 w-10 text-center border-1 border-[#FFFFFF]">
              {space.isFree ? "무료" : "유료"}
            </span>
          </div>
          {/* 오른쪽: 하트 버튼 */}
          <button
            onClick={() => setLiked((l) => !l)}
            aria-label="찜하기"
            className={`
            flex items-center justify-center w-6 h-6 rounded-full transition
            ${liked || space.isLiked ? "bg-red-400" : "bg-gray-200"}
          `}
          >
            <FaHeart className="text-white text-base" />
          </button>
        </div>

        <div className="mt-3">
          {/* 윗줄: 별점 + 운영상태 */}
          <div className="flex items-center gap-2 mb-1">
            {/* 별점 */}
            <span className="flex items-center gap-0.5 text-sm text-black">
              <FaStar className="text-sky-400" /> {/* 파란색 별 */}
              {space.rating}
            </span>
            {/* 운영상태 */}
            <span className={`flex items-center text-xs text-gray-500`}>
              <FaRegClock className="mr-1" /> {/* 시계 아이콘 */}
              {open ? "영업중" : "영업종료"}
            </span>
          </div>
          {/* 해시태그 */}
          <div className="text-xs text-black">
            {space.tags.map((tag: string) => `${tag}`).join(" ")}
          </div>
        </div>
      </div>
      {/* 탭 */}
      <div className="flex border-b mt-2">
        <button
          className={`flex-1 py-2 text-base ${
            tab === "info"
              ? "border-b-2 border-sky-400 font-bold text-black"
              : "text-gray-400"
          }`}
          onClick={() => setTab("info")}
        >
          상세정보
        </button>
        <button
          className={`flex-1 py-2 text-base ${
            tab === "review"
              ? "border-b-2 border-sky-400 font-bold text-black"
              : "text-gray-400"
          }`}
          onClick={() => setTab("review")}
        >
          공간리뷰
        </button>
      </div>
      {/* 내용 */}
      {tab === "info" ? (
        <SpaceDetailInfo space={space} />
      ) : (
        <SpaceDetailReview
          space={space}
          reviews={dummyReviews.filter((r) => space.reviews.includes(r.id))}
        />
      )}
    </div>
  );
};

export default SpaceDetailPage;
