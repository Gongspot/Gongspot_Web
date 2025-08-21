import React, { useState, useEffect } from "react";
import heartIcon from "../../assets/heart.svg";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { getCoordsByAddress, calculateDistance } from "../../utils/location";

interface Props {
  name: string;
  image: string;
  rating: number | null;
  distance?: number | null;
  location?: string | null;
  tags: string[];
  isLiked: boolean;
  onDetail: () => void;
  onLike: () => void;
  enableWholeCardClick?: boolean;
  buttonText?: string;
}

const isValidAddressFormat = (address: string | null | undefined): boolean => {
  if (!address) return false;
  const keywords = [
    "특별시",
    "광역시",
    "도",
    "시",
    "군",
    "구",
    "로",
    "길",
    "읍",
    "면",
    "동",
  ];
  return (
    address.startsWith("대한민국") ||
    keywords.some((keyword) => address.includes(keyword))
  );
};

const SpaceListCard: React.FC<Props> = ({
  name,
  image,
  rating,
  distance: distanceProp,
  location,
  tags,
  isLiked,
  onDetail,
  onLike,
  buttonText,
}) => {
  const myLocation = useCurrentLocation();
  const [distanceText, setDistanceText] = useState("계산 중...");

  useEffect(() => {
    if (typeof distanceProp === "number") {
      setDistanceText(`${distanceProp.toFixed(1)}km`);
      return;
    }

    if (myLocation.coordinates && isValidAddressFormat(location)) {
      const calculate = async () => {
        try {
          const placeCoords = await getCoordsByAddress(location!);
          const dist = calculateDistance(
            myLocation.coordinates!.lat,
            myLocation.coordinates!.lng,
            placeCoords.lat,
            placeCoords.lng
          );
          setDistanceText(`${dist.toFixed(1)}km`);
        } catch (error) {
          setDistanceText("측정불가");
        }
      };
      calculate();
    } else if (myLocation.loaded) {
      setDistanceText("측정불가");
    }
  }, [distanceProp, location, myLocation.coordinates, myLocation.loaded, name]);

  const formatLocation = (loc: string | null | undefined) => {
    if (!loc) return '';
    if (loc.startsWith("대한민국 ")) {
      return loc.substring(5); 
    }
    return loc;
  };

  return (
    <div className="border-b border-[#CCCCCC]">
      <div className="flex items-center relative pr-[30px] pl-[20px] py-5">
        <div className="relative w-[180px] h-[130px] flex-shrink-0 mr-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-xl border border-[#E5ECF2]"
          />
          <button
            className="absolute top-2 right-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            aria-label="좋아요"
            style={{ lineHeight: 0, background: "none", border: "none" }}
          >
            <img
              src={heartIcon}
              alt="좋아요 아이콘"
              width={25}
              height={25}
              style={{
                filter: isLiked ? "none" : "grayscale(100%) brightness(1.5)",
              }}
              className="transition-transform duration-150 active:scale-90"
            />
          </button>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="font-semibold text-lg text-[#222] truncate mb-2">
            {name}
          </div>
          <div className="flex items-center text-[15px]">
            <span className="flex items-center">
              <svg
                width={12}
                height={12}
                viewBox="0 0 20 20"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="1"
                className="inline"
              >
                <path d="M10 15.272l-5.708 3.11 1.09-6.365L.764 7.982l6.383-.927L10 1.018l2.853 6.037 6.383.927-4.618 4.035 1.09 6.365z" />
              </svg>
              <span className="font-medium ml-2 text-[13px]">
                {rating !== null ? rating.toFixed(1) : ''}
              </span>
            </span>
          </div>
          <div>
            <span className="text-[#000000] text-[13px]">{distanceText}</span>
          </div>
          <div className="text-[13px] text-gray-500 truncate mb-2">
            {formatLocation(location)}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetail();
            }}
            className="block w-[140px] py-1 rounded-full bg-[#4CB1F1] text-white text-[13px] font-semibold active:bg-sky-500"
          >
            {buttonText || "상세보기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceListCard;
