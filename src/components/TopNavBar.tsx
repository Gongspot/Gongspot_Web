import React from "react";

interface TopNavBarProps {
  title?: string; 
}

const TopNavBar: React.FC<TopNavBarProps> = ({ title = "Gong Spot" }) => (
  <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white shadow-md">
    <h1 className="text-2xl font-extrabold text-gray-800">{title}</h1>
  </header>
);

export default TopNavBar;
