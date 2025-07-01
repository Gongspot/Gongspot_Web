import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dummySpaces from "../constants/dummySpaces";
import dummyReviews from "../constants/dummyReviews";
import SpaceDetailInfo from "../components/SpaceDetailInfo";
import SpaceDetailReview from "../components/SpaceDetailReview";

const SpaceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const space = dummySpaces.find(s => s.id === Number(id)) || dummySpaces[0];
  const [tab, setTab] = useState<"info" | "review">("info");

  return (
    <div className="max-w-[375px] mx-auto bg-white min-h-screen">
      {/* 상단 Bar/탭 */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => window.history.back()} className="text-xl">&larr;</button>
        <span className="font-bold">{space.name}</span>
        <button>
          <svg width={24} height={24} fill="none" stroke="#C2C7CE" strokeWidth={2}><circle cx={12} cy={12} r={10} /></svg>
        </button>
      </div>
      <img src={space.image} className="w-full h-[220px] object-cover" alt={space.name} />
      {/* 탭 */}
      <div className="flex border-b mt-2">
        <button className={`flex-1 py-2 ${tab === "info" ? "border-b-2 border-sky-400 font-bold" : "text-gray-400"}`} onClick={() => setTab("info")}>상세정보</button>
        <button className={`flex-1 py-2 ${tab === "review" ? "border-b-2 border-sky-400 font-bold" : "text-gray-400"}`} onClick={() => setTab("review")}>공간리뷰</button>
      </div>
      {tab === "info" ? (
        <SpaceDetailInfo space={space} />
      ) : (
        <SpaceDetailReview space={space} reviews={dummyReviews.filter(r => space.reviews.includes(r.id))} />
      )}
    </div>
  );
};

export default SpaceDetailPage;
