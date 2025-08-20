// src/pages/HomePage.tsx

import React, { useEffect } from "react";
import BannerCarousel from "../components/homepage/BannerCarousel";
import HotSpaceSection from "../components/homepage/HotSpaceSection";
import ThemeSpaceSection from "../components/homepage/ThemeSpaceSection";
import TopNavBar from "../components/TopNavBar";
import { themeSpaces } from "../constants/spaceThemes"; 
import { useHotPlaces } from "../hooks/useHotPlaces"; 

const HomePage: React.FC = () => {
  // React Query 훅을 사용해 핫플레이스 데이터 가져오기
  const { data: hotSpaces, isLoading, isError } = useHotPlaces();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");

    if (state !== "local") return;
    
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  return (
    <div className="bg-[#EFF7FB] pb-16 min-h-screen scrollbar-hide">
      <TopNavBar />

      {/* 배너 */}
      <div className="px-6 mt-10">
        <BannerCarousel />
      </div>

      {/* 요즘 HOT한 학습 공간 */}
      <HotSpaceSection
        items={
          !isLoading && !isError && hotSpaces
            ? hotSpaces.slice(0, 5).map(space => ({
                id: space.placeId,
                name: space.name,
                image: space.imageUrl || "https://via.placeholder.com/200", 
              }))
            : []
        }
        moreLink="/hot-all"
      />

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