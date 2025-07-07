import React from "react";

interface SpaceCardProps {
  className?: string;
  image: string;
  title: string;
}

const SpaceCard: React.FC<SpaceCardProps> = ({
  className = "",
  image,
  title,
}) => (
  <div
    className={`
      rounded-xl overflow-hidden shadow-lg relative
      w-[160px] h-[120px] min-w-[160px] max-w-[160px] min-h-[120px] max-h-[120px]
      ${className}
    `}
  >
    <img src={image} alt={title} className="object-cover w-full h-full" />
    <div
      className="
      absolute bottom-0 left-0 w-full h-1/3
      bg-gradient-to-t from-black to-transparent
      pointer-events-none
    "
    />
    <div
      className="
      absolute bottom-2 left-2 text-white font-bold text-base drop-shadow
      z-10
    "
    >
      {title}
    </div>
  </div>
);

export default SpaceCard;
