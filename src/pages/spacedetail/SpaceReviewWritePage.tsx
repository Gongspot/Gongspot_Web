// src/pages/spacedetail/SpaceReviewWritePage.tsx

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dummySpaces from "../../constants/dummySpaces";
import TopHeader from "../../components/TopHeader";
import ReviewRatingInput from "../../components/review/ReviewRatingInput";
import ReviewCongestionInput from "../../components/review/ReviewCongestionInput";
import ReviewTagSelector from "../../components/review/ReviewTagSelector";
import ReviewPhotoInput from "../../components/review/ReviewPhotoInput";
import ReviewDatePicker from "../../components/review/ReviewDatePicker";
import ReviewTimeWheel from "../../components/review/ReviewTimeWheel"; // <-- 여기!!
import ReviewTextArea from "../../components/review/ReviewTextArea";
import minilogo from "../../assets/minilogo.svg";
import LikeButton from "../../components/review/LikeButton";

type AmpmType = "오전" | "오후" | "";

const SpaceReviewWritePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const space = dummySpaces.find((s) => s.id === Number(id));

  // 날짜/시간 state
  const [date, setDate] = useState<Date | null>(null);
  const [ampm, setAmpm] = useState<AmpmType>("");
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");

  // 나머지 리뷰 입력 state
  const [rating, setRating] = useState(0);
  const [congestion, setCongestion] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [review, setReview] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  if (!space) return <div>잘못된 접근입니다.</div>;

  return (
    <div className="max-w-[400px] mx-auto min-h-screen bg-white flex flex-col pb-14">
      <TopHeader title="리뷰 작성" />
      <div className="px-5 py-4 flex-1">
        <div className="mb-4 font-bold text-lg flex items-center gap-2">
          <img src={minilogo} alt="로고" className="w-5 h-5" />
          {space.name}
        </div>
        {/* 날짜/시간 */}
        <div className="mb-4">
          <div className="font-semibold mb-1">언제 이용하셨나요?</div>
          <div className="space-y-2">
            <ReviewDatePicker value={date} onChange={setDate} />
            <ReviewTimeWheel 
              ampm={ampm}
              setAmpm={setAmpm}
              hour={hour}
              setHour={setHour}
              minute={minute}
              setMinute={setMinute}
            />
          </div>
        </div>
        {/* 별점 */}
        <ReviewRatingInput rating={rating} setRating={setRating} />
        {/* 혼잡도 */}
        <ReviewCongestionInput
          congestion={congestion}
          setCongestion={setCongestion}
        />
        {/* 방문 목적/태그 */}
        <ReviewTagSelector
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          selectedFacilities={selectedFacilities}
          setSelectedFacilities={setSelectedFacilities}
        />
        {/* 후기 */}
        <div className="mb-4">
          <div className="font-semibold mb-1">리뷰를 작성해주세요.</div>
          <ReviewTextArea value={review} onChange={setReview} maxLength={500} />
        </div>
        {/* 사진 업로드 */}
        <ReviewPhotoInput files={files} setFiles={setFiles} />
        {/* 좋아요 */}
        <div className="flex flex-col items-center justify-center my-3">
          <LikeButton />
          <div className="text-xs text-gray-400 mt-1">
            하트를 누르면 유사한 공간을 추천받을 수 있어요!
          </div>
        </div>
        {/* 제출 */}
        <button
          className="w-full mt-6 bg-sky-400 text-white rounded-lg py-3 font-semibold text-lg"
          onClick={() => {
            alert("리뷰가 등록되었습니다!");
            navigate(-1);
          }}
        >
          리뷰 등록하기
        </button>
      </div>
    </div>
  );
};

export default SpaceReviewWritePage;
