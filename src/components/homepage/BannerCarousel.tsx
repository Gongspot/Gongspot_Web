import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useBanners } from "../../hooks/useBanners"; // API 호출을 위한 훅
import { useNavigate } from "react-router-dom";

const BannerCarousel: React.FC = () => {
  const { data: banners, isLoading, isError } = useBanners();
  const navigate = useNavigate();

  // 로딩 중일 때 보여줄 UI
  if (isLoading) {
    return <div className="banner h-48 rounded-lg bg-gray-200 animate-pulse" />;
  }

  // 에러 발생 시 보여줄 UI
  if (isError || !banners) {
    return <div className="banner h-48 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">배너를 불러올 수 없습니다.</div>;
  }

  // thumbnailUrl이 null이 아닌 유효한 배너만 필터링
  const validBanners = banners.filter(banner => banner.thumbnailUrl);

  // 표시할 배너가 없을 때
  if (validBanners.length === 0) {
    return <div className="banner h-48 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">표시할 배너가 없습니다.</div>;
  }

  return (
    <div className="page-container">
      <Swiper
        // ▼▼▼ 기존 스타일과 설정을 그대로 유지합니다. ▼▼▼
        className="banner h-48 rounded-lg"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 1800, disableOnInteraction: false }}
        loop={true}
      >
        {/* API로부터 받은 데이터로 슬라이드를 생성합니다. */}
        {validBanners.map((banner) => (
          <SwiperSlide key={banner.bannerId}>
            <img 
              className="home-img w-full h-full object-cover" 
              src={banner.thumbnailUrl!}
              alt={`이벤트 배너 ${banner.bannerId}`}
              onClick={() => navigate(`/banners/${banner.bannerId}`)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
