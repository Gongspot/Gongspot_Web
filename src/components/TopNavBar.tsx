import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";

interface TopNavBarProps {
  title?: string; 
}

const TopNavBar: React.FC<TopNavBarProps> = ({ title = "Gong Spot" }) => (
  <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white shadow-md">
    <h1 className="text-2xl font-extrabold text-gray-800">{title}</h1>
    <BellIcon className="h-6 w-6 text-gray-600 hover:text-blue-500 transition-colors" />
  </header>
);

export default TopNavBar;
