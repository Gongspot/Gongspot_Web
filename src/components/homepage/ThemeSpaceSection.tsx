// src/components/homepage/ThemeSpaceSection.tsx
import React from "react";
import SpaceCard from "../space/SpaceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useNavigate } from "react-router-dom";

interface ThemeSpaceSectionProps {
  className?: string;
  title: string;
  items: { id: number; title: string; image: string }[];
  moreLink?: string;
}

const ThemeSpaceSection: React.FC<ThemeSpaceSectionProps> = ({
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
              <div
                onClick={() => navigate(`/theme/${encodeURIComponent(item.title)}`)}
                className="cursor-pointer"
              >
                <SpaceCard image={item.image} title={item.title} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThemeSpaceSection;
