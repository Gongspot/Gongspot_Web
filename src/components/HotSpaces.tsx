import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import dummySpaces from "../constants/dummySpaces";

const HotSpaces: React.FC = () => {
  return (
    <div className="mt-8 px-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">요즘 HOT한 학습 공간</h2>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        spaceBetween={20}
        slidesPerView={1.15}
        className="rounded-xl"
      >
        {dummySpaces.slice(0, 8).map((space) => (
          <SwiperSlide key={space.id}>
            <div className="bg-white rounded-xl shadow p-2 flex items-center gap-4 min-h-[90px]">
              <img
                src={space.image}
                alt={space.name}
                className="w-20 h-16 object-cover rounded-lg"
              />
              <div>
                <div className="font-semibold text-base">{space.name}</div>
                <div className="text-xs text-gray-400">{space.tags.join(" ")}</div>
                <div className="text-sm">⭐ {space.rating} | {space.distance}km</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotSpaces;
