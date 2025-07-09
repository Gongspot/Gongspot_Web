// src/pages/HomePage.tsx

import React from "react";
import BannerCarousel from "../components/homepage/BannerCarousel";
import HotSpaceSection from "../components/homepage/HotSpaceSection";
import ThemeSpaceSection from "../components/homepage/ThemeSpaceSection";
import TopNavBar from "../components/TopNavBar";
import hotSpaces from "../constants/hotSpaces";     
import { themeSpaces } from "../constants/spaceThemes"; 

const HomePage: React.FC = () => {
  return (
    <div className="bg-[#EFF7FB] pb-16 min-h-screen">
      <TopNavBar title="Gong Spot" />

      {/* 배너 */}
      <div className="px-6 mt-10">
        <BannerCarousel />
      </div>

      {/* 요즘 HOT한 학습 공간 */}
      <HotSpaceSection items={hotSpaces} moreLink="/hot-all" />

      {/* 테마별 학습 공간 */}
      <ThemeSpaceSection
        title="테마별 학습 공간"
        items={themeSpaces}
        moreLink="/theme-all"
      />
    </div>
  );
};

export default HomePage;