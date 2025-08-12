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
      w-[160px] h-[130px] min-w-[160px] max-w-[160px] min-h-[130px] max-h-[130px]
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
        absolute bottom-2 left-2 text-white font-bold drop-shadow text-[13px]
        z-10
      "
    >
      {title}
    </div>
  </div>
);

export default SpaceCard;
