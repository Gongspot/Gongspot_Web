import React from "react";
import homeLogo from "../assets/homelogo.svg";

const TopNavBar: React.FC = () => (
  <header
    className="sticky top-0 z-10 flex items-center px-4 h-10 bg-white"
    style={{ boxShadow: '0px 4px 8px 0px #0000000D' }}
  >
    <div className="flex items-end gap-[5px]">
      <img src={homeLogo} alt="로고" className="w-[18px] h-[18px]" />
      <span className="text-[18px] font-bold text-[#4CB1F1] select-none leading-[18px]">GongSpot</span>
    </div>
    <div className="flex-1" />
  </header>
);

export default TopNavBar;
