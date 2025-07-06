// SpaceSection.tsx
import React from "react";
import SpaceCard from "./SpaceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";

interface SpaceSectionProps {
  className?: string;
  title: string;
  items: { id: number; title: string; image: string }[];
  moreLink?: string;
}

const SpaceSection: React.FC<SpaceSectionProps> = ({
  className = "",
  title,
  items,
  moreLink,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`mt-8 ${className}`}>
      <div className="flex justify-between items-center px-4 mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {moreLink && (
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() => navigate(moreLink)}
          >
            더보기 &gt;
          </button>
        )}
      </div>
      <div className="px-4">
        <Swiper spaceBetween={16} slidesPerView={2.1}>
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <SpaceCard image={item.image} title={item.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SpaceSection;
