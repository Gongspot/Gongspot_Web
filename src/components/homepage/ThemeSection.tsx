import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import themeSpaces from "../../constants/spaceThemes";
import { useNavigate } from "react-router-dom";

const ThemeSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center px-4 mb-3">
        <h2 className="text-lg font-semibold">테마별 학습 공간</h2>
        <button
          className="text-sm text-gray-500 hover:text-gray-700"
          onClick={() => navigate("/theme-all")}
        >
          더보기 &gt;
        </button>
      </div>
      <Swiper
        spaceBetween={16}
        slidesPerView={2.1}
        className="px-4"
      >
        {themeSpaces.map(item => (
          <SwiperSlide key={item.id}>
            <div className="rounded-xl overflow-hidden shadow bg-white">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-24 object-cover"
              />
              <div className="text-center text-sm py-2">{item.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ThemeSection;
