import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import ReviewRatingInput from "../../components/review/ReviewRatingInput";
import ReviewCongestionInput from "../../components/review/ReviewCongestionInput";
import ReviewTagSelector from "../../components/review/ReviewTagSelector";
import ReviewPhotoInput from "../../components/review/ReviewPhotoInput";
import ReviewDatePicker from "../../components/review/ReviewDatePicker";
import ReviewTimeWheel from "../../components/review/ReviewTimeWheel";
import ReviewTextArea from "../../components/review/ReviewTextArea";
import minilogo from "../../assets/minilogo.svg";
import LikeButton from "../../components/review/LikeButton";
import { useSpaceDetail } from "../../hooks/useSpaceDetail";
import { usePostReview } from "../../hooks/usePostReview";

type AmpmType = "오전" | "오후" | "";

const purposeMap: { [key: string]: number } = { "개인공부": 0, "그룹공부": 1, "노트북 작업": 2, "휴식": 3, "집중 공부": 4 };
const moodMap: { [key: string]: number } = { "넓은": 0, "아늑한": 1, "깔끔한": 2, "조용한": 3, "음악이 나오는": 4, "이야기를 나눌 수 있는": 5 };
const facilityMap: { [key: string]: number } = { "Wi-Fi": 0, "콘센트": 1, "넓은 좌석": 2, "음료": 3 };
const congestionMap: { [key: string]: number } = { "낮음": 0, "보통": 1, "높음": 2 };

const purposeList = Object.keys(purposeMap);
const moodList = Object.keys(moodMap);

const SpaceReviewWritePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: space, isLoading: isSpaceLoading } = useSpaceDetail(id);
  const { mutate: submitReview, isPending } = usePostReview(id);

  const [date, setDate] = useState<Date | null>(new Date());
  const [ampm, setAmpm] = useState<AmpmType>("오전");
  const [hour, setHour] = useState<string>("9");
  const [minute, setMinute] = useState<string>("00");
  const [rating, setRating] = useState(0);
  const [congestion, setCongestion] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isLike, setIsLike] = useState(false);

  const handleSubmit = () => {
    const selectedPurpose = selectedTags.filter(tag => purposeList.includes(tag));
    const selectedMood = selectedTags.filter(tag => moodList.includes(tag));

    if (!date || !ampm || !hour || !minute || rating === 0 || !congestion || selectedPurpose.length === 0 || selectedMood.length === 0) {
      alert("날짜, 시간, 별점, 혼잡도, 방문 목적, 분위기는 필수 입력 항목입니다.");
      return;
    }
    if (content.length < 10) {
      alert("리뷰를 10자 이상 작성해주세요.");
      return;
    }

    let h = parseInt(hour, 10);
    if (ampm === '오후' && h !== 12) h += 12;
    if (ampm === '오전' && h === 12) h = 0;
    
    const finalDate = new Date(date);
    finalDate.setHours(h, parseInt(minute, 10), 0);
    const datetime = finalDate.toISOString().slice(0, 19).replace('T', ' ');

    const reviewData = {
      datetime,
      rate: rating,
      congest: congestionMap[congestion],
      purpose: selectedPurpose.map(tag => purposeMap[tag]),
      mood: selectedMood.map(tag => moodMap[tag]),
      facility: selectedFacilities.map(fac => facilityMap[fac]),
      content,
      like: isLike,
    };
    
    // photos: files를 함께 전달합니다.
    submitReview({ reviewData, photos: files }, {
      onSuccess: () => {
        alert("리뷰가 등록되었습니다!");
        navigate(`/space/${id}`);
      }
    });
  };

  if (isSpaceLoading) return <div>공간 정보를 불러오는 중...</div>;
  if (!space) return <div>잘못된 접근이거나 공간 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-[400px] mx-auto min-h-screen bg-white flex flex-col pb-14">
      <TopHeader title="리뷰 작성" />
      <div className="px-5 py-4 flex-1">
        <div className="mb-4 font-bold text-lg flex items-center gap-2">
          <img src={minilogo} alt="로고" className="w-5 h-5" />
          {space.name}
        </div>
        
        <div className="mb-4">
          <div className="font-semibold mb-1">언제 이용하셨나요?</div>
          <div className="space-y-2">
            <ReviewDatePicker value={date} onChange={setDate} />
            <ReviewTimeWheel 
              ampm={ampm} setAmpm={setAmpm}
              hour={hour} setHour={setHour}
              minute={minute} setMinute={setMinute}
            />
          </div>
        </div>
        
        <ReviewRatingInput rating={rating} setRating={setRating} />
        <ReviewCongestionInput congestion={congestion} setCongestion={setCongestion} />
        <ReviewTagSelector
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          selectedFacilities={selectedFacilities}
          setSelectedFacilities={setSelectedFacilities}
        />
        
        <div className="mb-4">
          <div className="font-semibold mb-1">리뷰를 작성해주세요.</div>
          <ReviewTextArea value={content} onChange={setContent} maxLength={500} />
        </div>
        
        <ReviewPhotoInput files={files} setFiles={setFiles} />
        
        <div className="flex flex-col items-center justify-center my-3">
          <LikeButton liked={isLike} onToggle={() => setIsLike(prev => !prev)} />
          <div className="text-xs text-gray-400 mt-1">
            하트를 누르면 유사한 공간을 추천받을 수 있어요!
          </div>
        </div>
        
        <button
          className="w-full mt-6 bg-sky-400 text-white rounded-lg py-3 font-semibold text-lg disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? '등록 중...' : '리뷰 등록하기'}
        </button>
      </div>
    </div>
  );
};

export default SpaceReviewWritePage;
