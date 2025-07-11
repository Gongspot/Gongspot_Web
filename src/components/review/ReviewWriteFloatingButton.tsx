import { useNavigate } from "react-router-dom";
import pencilIcon from "../../assets/pencil_icon.svg";

const ReviewWriteFloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="
        fixed bottom-20 right-4 z-30
        w-14 h-14 rounded-full bg-white
        flex items-center justify-center
        shadow-xl border border-gray-200
        hover:bg-blue-50 active:scale-95
        transition
      "
      onClick={() => navigate("/review/write")}
      aria-label="리뷰 작성"
    >
      <img src={pencilIcon} alt="리뷰 작성" className="w-7 h-7" />
    </button>
  );
};

export default ReviewWriteFloatingButton;
