import React from "react";

interface ThemeSpaceCardProps {
  image: string;
  title: string;
  className?: string;
  onClick?: () => void;
}

const ThemeSpaceCard: React.FC<ThemeSpaceCardProps> = ({
  image,
  title,
  className = "",
  onClick,
}) => (
  <button
    className={`relative w-full overflow-hidden rounded-2xl shadow-md focus:outline-none ${className}`}
    style={{ aspectRatio: "1/1" }}
    onClick={onClick}
    type="button"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-35 transition" />
    <span className="absolute top-3 left-4 text-white font-bold text-lg drop-shadow-lg z-10">
      {title}
    </span>
  </button>
);

export default ThemeSpaceCard;
