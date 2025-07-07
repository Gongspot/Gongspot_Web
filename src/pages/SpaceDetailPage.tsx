import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dummySpaces from "../constants/dummySpaces";
import dummyReviews from "../constants/dummyReviews";
import SpaceDetailInfo from "../components/space/SpaceDetailInfo";
import SpaceDetailReview from "../components/space/SpaceDetailReview";
import { FaHeart, FaRegClock, FaStar } from "react-icons/fa";
import TopHeader from "../components/TopHeader";

// 상단고정(header+이미지+요약+탭), BottomNavBar 고정
const TOP_HEADER_HEIGHT = 42;  // TopHeader 높이(px)
const IMAGE_HEIGHT = 220;
const SUMMARY_HEIGHT = 84;     // 이름+별점+태그+탭
const BOTTOM_NAV_HEIGHT = 64;  // BottomNavBar h-16 = 16*4=64px

function isOpen(opening: string): boolean {
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

  // 전체 fixed header height
  const fixedHeaderHeight = TOP_HEADER_HEIGHT + IMAGE_HEIGHT + SUMMARY_HEIGHT;

  return (
    <div className="max-w-[400px] mx-auto bg-white min-h-screen flex flex-col relative h-[100dvh]">
      {/* 최상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-30">
        <TopHeader title="" />
      </div>

      {/* 상단 고정 영역 (이미지+요약+탭) */}
      <div style={{ paddingTop: TOP_HEADER_HEIGHT, background: "#fff" }}>
        {/* 이미지 */}
        <div className="relative">
          <img src={space.image} className="w-full h-[220px] object-cover" alt={space.name} />
        </div>
        {/* 요약 정보 */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="text-2xl font-bold text-black">{space.name}</div>
              <span className="text-[11px] font-bold bg-[#D8F5FF] rounded-xl py-0.3 w-10 text-center border-1 border-[#FFFFFF]">
                {space.isFree ? "무료" : "유료"}
              </span>
            </div>
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
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-0.5 text-sm text-black">
                <FaStar className="text-sky-400" /> {space.rating}
              </span>
              <span className="flex items-center text-xs text-gray-500">
                <FaRegClock className="mr-1" />
                {open ? "영업중" : "영업종료"}
              </span>
            </div>
            <div className="text-xs text-black">
              {space.tags.map((tag: string) => `${tag}`).join(" ")}
            </div>
          </div>
        </div>
        {/* 탭 메뉴 (sticky, 이미지+요약 바로 아래에 고정) */}
        <div
          className="flex border-b bg-white z-10 sticky"
          style={{ top: TOP_HEADER_HEIGHT }}
        >
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
      </div>

      {/* 하단 스크롤 영역 */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          maxHeight: `calc(100dvh - ${fixedHeaderHeight + BOTTOM_NAV_HEIGHT}px)`,
          minHeight: 0,
        }}
      >
        {tab === "info" ? (
          <SpaceDetailInfo space={space} />
        ) : (
          <SpaceDetailReview
            space={space}
            reviews={dummyReviews.filter((r) => space.reviews.includes(r.id))}
          />
        )}
      </div>
    </div>
  );
};

export default SpaceDetailPage;
