import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dummySpaces from "../constants/dummySpaces";
import TopHeader from "../components/TopHeader";
import ReviewRatingInput from "../components/review/ReviewRatingInput";
import ReviewCongestionInput from "../components/review/ReviewCongestionInput";
import ReviewTagSelector from "../components/review/ReviewTagSelector";
import ReviewPhotoInput from "../components/review/ReviewPhotoInput";
import ReviewDatePicker from "../components/review/ReviewDatePicker";
import ReviewTimeWheelPicker from "../components/review/ReviewTimeWheelPicker";

const SpaceReviewWritePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const space = dummySpaces.find((s) => s.id === Number(id));
  const [date, setDate] = useState<Date | null>(null);

  // 시간 state (오전/오후, 시, 분)
  const [ampm, setAmpm] = useState<"오전" | "오후">("오전");
  const [hour, setHour] = useState<string>("1");
  const [minute, setMinute] = useState<string>("00");

  const [rating, setRating] = useState(0);
  const [congestion, setCongestion] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [review, setReview] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  if (!space) return <div>잘못된 접근입니다.</div>;

  // 시간 표시 예시: "오전 4:05"
  const timeDisplay = `${ampm} ${hour}:${minute}`;

  return (
    <div className="max-w-[400px] mx-auto min-h-screen bg-white flex flex-col">
      <TopHeader title="리뷰 작성" />
      <div className="px-5 py-4 flex-1">
        <div className="mb-4 font-bold text-lg flex items-center gap-2">
          <span role="img" aria-label="위치">📍</span>
          {space.name}
        </div>
        {/* 날짜/시간 */}
        <div className="mb-4">
          <div className="font-semibold mb-1">언제 이용하셨나요?</div>
          <div className="space-y-2">
            <ReviewDatePicker value={date} onChange={setDate} />
            <ReviewTimeWheelPicker
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
        <ReviewCongestionInput congestion={congestion} setCongestion={setCongestion} />
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
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={4}
            value={review}
            onChange={e => setReview(e.target.value)}
            placeholder="공간에 대한 솔직한 후기를 남겨주세요."
            maxLength={500}
          />
          <div className="text-right text-xs text-gray-400">{review.length}/500</div>
        </div>
        {/* 파일 업로드 */}
        <ReviewPhotoInput files={files} setFiles={setFiles} />
        {/* 좋아요 */}
        <div className="flex items-center justify-center my-3">
          <button type="button" className="px-4 py-2 rounded-full border text-sky-500 border-sky-300 flex items-center gap-1">
            공간이 마음에 들어요! <span>🤍</span>
          </button>
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
