import React from "react";
import BannerCarousel from "../components/homepage/BannerCarousel";
import SpaceSection from "../components/space/SpaceSection";
import hotSpaces from "../constants/dummySpaces"; 
import { themeSpaces } from "../constants/spaceThemes"; 

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
