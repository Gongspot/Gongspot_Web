import React from "react";
import SpaceCard from "./SpaceCard";

interface SpaceSectionProps {
  title: string;
  items: { id: number; title: string; image: string }[];
}

const SpaceSection: React.FC<SpaceSectionProps> = ({ title, items }) => (
  <div className="mt-8">
    <div className="flex justify-between items-center px-4 mb-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button className="text-sm text-gray-500 hover:text-gray-700">
        더보기 &gt;
      </button>
    </div>
    <div className="px-4 flex space-x-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
      {items.map(item => (
        <SpaceCard
          key={item.id}
          image={item.image}
          title={item.title}
        />
      ))}
    </div>
  </div>
);

export default SpaceSection;
