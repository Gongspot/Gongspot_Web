import { FaStar } from "react-icons/fa";

const ReviewRatingInput = ({ rating, setRating }: { rating: number; setRating: (n: number) => void }) => (
  <div className="mb-4">
    <div className="font-semibold mb-1">공간이 어땠나요?</div>
    <div className="flex gap-1">
      {[1,2,3,4,5].map(n => (
        <button type="button" key={n} onClick={() => setRating(n)}>
          <FaStar size={28} className={n <= rating ? "text-sky-400" : "text-gray-300"} />
        </button>
      ))}
    </div>
  </div>
);

export default ReviewRatingInput;
