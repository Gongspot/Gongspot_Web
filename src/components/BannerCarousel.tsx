import React from "react";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerCarousel: React.FC = () => {
  return (
    <div className="page-container">
      <Swiper
        className="banner h-48 rounded-lg"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 1200 }}
      >
        <SwiperSlide>
          <img className="home-img" src={banner1} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="home-img" src={banner2} />
        </SwiperSlide>
        <SwiperSlide>
          <img className="home-img" src={banner3} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
