import React from "react";
import TopNavBar from "../components/TopNavBar";
import BannerCarousel from "../components/BannerCarousel";
import SpaceSection from "../components/SpaceSection";

const hotSpaces = [
  { id: 1, title: "서울창신센터", image: "/src/assets/hot1.jpg" },
  { id: 2, title: "캐치카페",     image: "/src/assets/hot2.jpg" },
  { id: 3, title: "유라 도서관", image: "/src/assets/hot3.jpg" },
];
const themeSpaces = [
  { id: 1, title: "도서관",   image: "/src/assets/theme1.jpg" },
  { id: 2, title: "카페",     image: "/src/assets/theme2.jpg" },
  { id: 3, title: "스터디룸", image: "/src/assets/theme3.jpg" },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 pb-16">
      {/* 공통 상단바 */}
      <TopNavBar title="Gong Spot" />

      {/* 검색 창은 추후 개발*/}

      {/* 배너 */}
      <div className="px-6 mt-8">
        <BannerCarousel />
      </div>

      {/* 학습 공간 섹션 */}
      <SpaceSection title="요즘 HOT한 학습 공간" items={hotSpaces} />
      <SpaceSection title="테마별 학습 공간" items={themeSpaces} />
    </div>
  );
};

export default HomePage;
