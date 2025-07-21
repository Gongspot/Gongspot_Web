import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";

const LikeButton: React.FC = () => {
  const [liked, setLiked] = useState(false);

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
      onClick={() => setLiked(v => !v)}
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
