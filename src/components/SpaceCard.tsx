import React from "react";

interface SpaceCardProps {
  image: string;
  title: string;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ image, title }) => (
  <div className="w-60 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg relative">
    <img
      src={image}
      alt={title}
      className="w-full h-40 object-cover"
    />
    <div className="absolute bottom-2 left-2 bg-black bg-opacity-30 px-2 py-1 rounded-md">
      <span className="text-white text-base font-medium">{title}</span>
    </div>
  </div>
);

export default SpaceCard;
