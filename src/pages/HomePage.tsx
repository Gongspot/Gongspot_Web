import React from "react";
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
    <div className="bg-[#EFF7FB] from-white to-gray-100 pb-16">

      {/* 배너 */}
      <div className="px-6">
        <BannerCarousel />
      </div>

      {/* 요즘 HOT한 학습 공간 */}
      <SpaceSection
        title="요즘 HOT한 학습 공간"
        items={hotSpaces}
        moreLink="/hot-all"
      />

      {/* 테마별 학습 공간 */}
      <SpaceSection
        title="테마별 학습 공간"
        items={themeSpaces}
        moreLink="/theme-all"
      />
    </div>
  );
};

export default HomePage;
