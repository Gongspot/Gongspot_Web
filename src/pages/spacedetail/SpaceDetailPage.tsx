// src/pages/spacedetail/SpaceDetailPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegClock, FaStar } from "react-icons/fa";

import TopHeader from "../../components/TopHeader";
import SpaceDetailInfo from "../../components/detail/SpaceDetailInfo";
import SpaceDetailReview from "../../components/detail/SpaceDetailReview";
import SpaceDetailReviewStats from "../../components/detail/SpaceDetailReviewStats";
import pencilIcon from "../../assets/pencil_icon.svg";
import { useSpaceDetail } from "../../hooks/useSpaceDetail";
import { useSpaceReviews } from "../../hooks/useSpaceReviews";
import { useLikeSpace } from "../../hooks/useLikeSpace";

// 영업 상태를 판단하는 함수
const getOpenStatus = (hoursString: string): "영업중" | "영업종료" => {
  try {
    const weeklyHours = hoursString.split(',').map(item => {
      const parts = item.trim().split(/:\s(.*)/s);
      return { day: parts[0].charAt(0), hours: parts[1] };
    });

    const now = new Date();
    const todayIndex = now.getDay();
    const dayMap = ['일', '월', '화', '수', '목', '금', '토'];
    const todayShortName = dayMap[todayIndex];
    
    const todayInfo = weeklyHours.find(d => d.day === todayShortName);
    if (!todayInfo || todayInfo.hours.includes("휴무")) {
      return "영업종료";
    }

    // 시간 파싱 (예: "오전 9:00 ~ 오후 5:00")
    const timeParts = todayInfo.hours.match(/(\d{1,2}:\d{2}).*?(\d{1,2}:\d{2})/);
    if (!timeParts) return "영업종료";

    const [, startTime, endTime] = timeParts;
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHourRaw, endMinute] = endTime.split(':').map(Number);
    
    // "오후" 시간을 24시간 형식으로 변환
    let endHour = endHourRaw;
    if (todayInfo.hours.includes("오후") && endHour !== 12) {
      endHour += 12;
    }

    const openTime = new Date();
    openTime.setHours(startHour, startMinute, 0, 0);

    const closeTime = new Date();
    closeTime.setHours(endHour, endMinute, 0, 0);

    if (now >= openTime && now <= closeTime) {
      return "영업중";
    }
    return "영업종료";
  } catch {
    return "영업종료"; // 파싱 실패 시
  }
};

const SpaceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"info" | "review">("info");

  const { data: space, isLoading: isSpaceLoading } = useSpaceDetail(id);
  const { data: reviewData, isLoading: isReviewsLoading } = useSpaceReviews(id);
  const { mutate: toggleLike } = useLikeSpace();

  const [isLikedUI, setIsLikedUI] = useState(false);
  
  useEffect(() => {
    if (space) {
      setIsLikedUI(space.isLiked);
    }
  }, [space?.isLiked]);

  const handleLikeClick = () => {
    if (!id) return;
    const newLikedState = !isLikedUI;
    setIsLikedUI(newLikedState);
    toggleLike({ placeId: id, isLiked: isLikedUI });
  };
  
  // ▼▼▼ useMemo를 사용해 openStatus 계산 최적화 ▼▼▼
  const openStatus = useMemo(() => {
    if (!space?.openingHours) return "영업종료";
    return getOpenStatus(space.openingHours);
  }, [space?.openingHours]);
  
  if (isSpaceLoading || isReviewsLoading) return <div>로딩 중...</div>;
  if (!space || !reviewData) return <div>데이터를 불러오는 데 실패했습니다.</div>;

  return (
    <div className="max-w-[400px] mx-auto bg-white min-h-screen flex flex-col relative pb-20">
      <div className="sticky top-0 left-0 z-20 bg-white shadow-sm">
        <TopHeader title="" />
        <img src={space.photoUrl} alt={space.name} className="w-full h-[180px] object-cover" />
        <div className="p-4 pt-3 pb-2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{space.name}</h1>
            <button onClick={handleLikeClick} className="p-0 border-none bg-transparent">
              <span className="flex items-center justify-center w-[30px] h-[30px] rounded-full transition-colors" style={{ background: isLikedUI ? "#FF3959" : "#DBDBDB" }}>
                <FaHeart size={21} color="#fff" />
              </span>
            </button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <FaStar className="text-yellow-400" />
            <span>{(space.rating ?? 0).toFixed(1)}</span>
            <FaRegClock />
            <span>{openStatus}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {(Array.isArray(space.hashtag) ? space.hashtag : [space.hashtag])
              .map(tag => `#${tag}`)
              .join(" ")}
          </div>
        </div>
        <div className="flex border-b">
          <button className={`flex-1 pb-2 ${tab === "info" ? "border-b-2 border-blue-400 font-bold" : "text-gray-500"}`} onClick={() => setTab("info")}>상세정보</button>
          <button className={`flex-1 pb-2 ${tab === "review" ? "border-b-2 border-blue-400 font-bold" : "text-gray-500"}`} onClick={() => setTab("review")}>공간리뷰</button>
        </div>
        {tab === "review" && (
          <SpaceDetailReviewStats
            placeId={space.placeId}
            averageRating={reviewData.averageRating}
            reviewCount={reviewData.reviewCount}
            ratingPercentages={reviewData.ratingPercentages}
            categoryList={reviewData.categoryList}
          />
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "info" ? (
          <SpaceDetailInfo space={space} />
        ) : (
          <SpaceDetailReview reviews={reviewData.reviewList.slice(0, 10)} />
        )}
      </div>

      <button className="fixed z-50 bottom-24 right-5 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white shadow-lg border" onClick={() => navigate(`/space/${id}/review`)}>
        <img src={pencilIcon} alt="리뷰 작성" className="w-8 h-8"/>
      </button>
    </div>
  );
};

export default SpaceDetailPage;