import React, { useState, useEffect } from "react";
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
const congestionMap: { [key: string]: number } = { "낮음": 2, "보통": 1, "높음": 0 };

const purposeList = Object.keys(purposeMap);
const moodList = Object.keys(moodMap);

const pad = (num: number) => num.toString().padStart(2, '0');

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

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validate = () => {
      if (date) {
        const now = new Date();
        let h = parseInt(hour, 10);
        if (ampm === '오후' && h !== 12) h += 12;
        if (ampm === '오전' && h === 12) h = 0;
        
        const finalDate = new Date(date);
        finalDate.setHours(h, parseInt(minute, 10), 0, 0);

        if (finalDate > now) {
          setErrorMessage("리뷰 시간은 현재 시간보다 미래일 수 없습니다.");
          setIsValid(false);
          return;
        }
      }
      
      const selectedPurpose = selectedTags.filter(tag => purposeList.includes(tag));
      const selectedMood = selectedTags.filter(tag => moodList.includes(tag));

      if (!date || !ampm || !hour || !minute || rating === 0 || !congestion) {
        setErrorMessage("날짜, 시간, 별점, 혼잡도를 모두 입력해주세요.");
        setIsValid(false);
        return;
      }
      
      if (selectedPurpose.length === 0 || selectedMood.length === 0) {
        setErrorMessage("방문 목적과 분위기는 1개 이상 선택해주세요.");
        setIsValid(false);
        return;
      }

      if (content.length < 10) {
        setErrorMessage("리뷰를 10자 이상 작성해주세요.");
        setIsValid(false);
        return;
      }

      setErrorMessage(null);
      setIsValid(true);
    };

    validate();
  }, [date, ampm, hour, minute, rating, congestion, selectedTags, content]);


  const handleSubmit = () => {
    if (isPending || !isValid) {
      return; 
    }

    let h = parseInt(hour, 10);
    if (ampm === '오후' && h !== 12) h += 12;
    if (ampm === '오전' && h === 12) h = 0;
    const finalDate = new Date(date!);
    finalDate.setHours(h, parseInt(minute, 10), 0, 0);

    const year = finalDate.getFullYear();
    const month = pad(finalDate.getMonth() + 1);
    const day = pad(finalDate.getDate());
    const hours = pad(finalDate.getHours());
    const minutes = pad(finalDate.getMinutes());
    const seconds = pad(finalDate.getSeconds());

    const datetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const selectedPurpose = selectedTags.filter(tag => purposeList.includes(tag));
    const selectedMood = selectedTags.filter(tag => moodList.includes(tag));

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
    
    submitReview({ reviewData, photos: files }, {
      onSuccess: () => {
        navigate(`/space/${id}`);
      },
      onError: () => {
        setErrorMessage("리뷰 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
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
          className="w-full mt-6 bg-sky-400 text-white rounded-lg py-3 font-semibold text-lg disabled:bg-gray-300 disabled:text-gray-500"
          onClick={handleSubmit}
          disabled={isPending || !isValid}
        >
          {isPending ? '등록 중...' : '리뷰 등록하기'}
        </button>

        {errorMessage && (
          <div className="text-red-500 text-sm text-center mt-2">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceReviewWritePage;