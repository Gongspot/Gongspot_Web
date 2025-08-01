import React from "react";
import { FaHeart } from "react-icons/fa6";

// Props 타입을 정의합니다.
interface Props {
  liked: boolean;
  onToggle: () => void;
}

const LikeButton: React.FC<Props> = ({ liked, onToggle }) => {
  // 컴포넌트 내부에서 관리하던 useState는 제거합니다.

  return (
    <button
      type="button"
      className="px-5 py-2 rounded-full border flex items-center gap-2 font-semibold text-[18px] transition-all"
      style={{
        borderStyle: "solid",
        borderColor: liked ? "#4CB1F1" : "#E5E5E5",
        color: "#212121",
        background: "#fff",
        boxShadow: liked ? "0 0 0 2px #eaf6fd" : undefined,
        outline: "none",
      }}
      onClick={onToggle} // props로 받은 onToggle 함수를 연결합니다.
    >
      공간이 마음에 들어요!
      <span
        className="inline-flex items-center justify-center"
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: liked ? "#FF3959" : "#DBDBDB",
          transition: "background 0.2s",
        }}
      >
        <FaHeart
          size={16}
          color="#fff"
          style={{
            filter: liked ? "" : "brightness(0.95)",
            transition: "color 0.2s",
          }}
        />
      </span>
    </button>
  );
};

export default LikeButton;