import React from "react";
import banner1 from "../../assets/banner1.svg";
import banner2 from "../../assets/banner2.svg";
import banner3 from "../../assets/banner3.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

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
        autoplay={{ delay: 1800 }}
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
