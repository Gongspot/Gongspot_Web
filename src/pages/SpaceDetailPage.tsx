import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dummySpaces from "../constants/dummySpaces";
import dummyReviews from "../constants/dummyReviews";
import type { Space } from "../constants/dummySpaces";
import type { Review } from "../constants/dummyReviews";
import SpaceDetailInfo from "../components/detail/SpaceDetailInfo";
import SpaceDetailReviewStats from "../components/detail/SpaceDetailReviewStats";
import SpaceDetailReview from "../components/detail/SpaceDetailReview";
import { FaHeart, FaRegClock, FaStar } from "react-icons/fa";
import TopHeader from "../components/TopHeader";

const TOP_HEADER_HEIGHT = 42; // TopHeader height(px)
const IMAGE_HEIGHT = 220;
const SUMMARY_HEIGHT = 84; // 이름+별점+태그+탭
const BOTTOM_NAV_HEIGHT = 64; // BottomNavBar 등

const SpaceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<"info" | "review">("info");
  const [liked, setLiked] = useState(false);

  const space: Space =
    dummySpaces.find((s) => s.id === Number(id)) || dummySpaces[0];

  const isOpen = (opening: string): boolean => {
    const match = opening.match(/(\d{2}):(\d{2}) ~ (\d{2}):(\d{2})/);
    if (!match) return false;
    const now = new Date();
    const open = new Date();
    open.setHours(Number(match[1]), Number(match[2]), 0);
    const close = new Date();
    close.setHours(Number(match[3]), Number(match[4]), 0);
    return now >= open && now <= close;
  };

  const open = isOpen(space.opening);
  const reviews = dummyReviews.filter((r: Review) =>
    space.reviews.includes(r.id)
  );

  return (
    <div className="max-w-[400px] mx-auto bg-white min-h-screen flex flex-col relative pb-20">
      {/* 상단(고정) */}
      <div
        className="sticky top-0 left-0 z-20 bg-white"
        style={{
          boxShadow: "0 4px 16px -10px rgba(0,0,0,0.08)",
        }}
      >
        <TopHeader title="" />
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-[220px] object-cover"
        />
        <div className="p-4 pt-3 pb-2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{space.name}</h1>
            <button onClick={() => setLiked((prev) => !prev)}>
              <FaHeart className={liked ? "text-red-500" : "text-gray-400"} />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <FaStar className="text-yellow-400" />
            <span>{space.rating}</span>
            <FaRegClock />
            <span>{open ? "영업중" : "영업종료"}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {space.tags.join(" ")}
          </div>
        </div>
        <div className="flex border-b my-2">
          <button
            className={`flex-1 pb-2 ${
              tab === "info"
                ? "border-b-2 border-blue-400 font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setTab("info")}
          >
            상세정보
          </button>
          <button
            className={`flex-1 pb-2 ${
              tab === "review"
                ? "border-b-2 border-blue-400 font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setTab("review")}
          >
            공간리뷰
          </button>
        </div>
        {/* 평점 통계 영역을 탭 아래에 "고정" */}
        {tab === "review" && <SpaceDetailReviewStats space={space} />}
      </div>

      {/* 스크롤 영역: 상세/리뷰 */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          maxHeight: `calc(100vh - ${
            TOP_HEADER_HEIGHT +
            IMAGE_HEIGHT +
            SUMMARY_HEIGHT +
            BOTTOM_NAV_HEIGHT
          }px)`,
        }}
      >
        {tab === "info" ? (
          <SpaceDetailInfo space={space} />
        ) : (
          <SpaceDetailReview reviews={reviews} />
        )}
      </div>
    </div>
  );
};

export default SpaceDetailPage;
