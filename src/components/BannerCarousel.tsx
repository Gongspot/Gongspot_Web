import React from "react";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const banners = [banner1, banner2, banner3];

const BannerCarousel: React.FC = () => (
  <div className="relative overflow-hidden">
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4">
      {banners.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`banner-${i}`}
          className="w-full flex-shrink-0 h-40 object-cover rounded-2xl snap-center"
        />
      ))}
    </div>
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
      {banners.map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 bg-white bg-opacity-75 rounded-full"
        />
      ))}
    </div>
  </div>
);

export default BannerCarousel;
