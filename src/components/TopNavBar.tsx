import React from "react";
import homeLogo from "../assets/homelogo.svg";

const TopNavBar: React.FC = () => (
  <header className="sticky top-0 z-10 flex items-center gap-2 px-4 py-3 bg-white shadow">
    {/* SVG 이미지 */}
    <img src={homeLogo} alt="로고" className="w-6 h-6" />
    <span className="text-xl font-bold text-sky-400 select-none tracking-tight">GongSpot</span>
    <div className="flex-1" />
  </header>
);

export default TopNavBar;
