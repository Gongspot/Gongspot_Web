import React, { useRef } from "react";
import SpaceListCard from "/Gongspot_Web/src/components/space/SpaceListCard";
import TabButtons from "./TapButttons";
import dummySpaces from "/Gongspot_Web/src/constants/dummySpaces";

interface SearchResultSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  height: string;
  setHeight: (height: string) => void;
}

const SearchResultSheet: React.FC<SearchResultSheetProps> = ({
  isOpen,
  setIsOpen,
  height,
  setHeight,
}) => {
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startYRef.current = clientY;
    startHeightRef.current = parseInt(height);

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const moveY =
        "touches" in moveEvent
          ? moveEvent.touches[0].clientY
          : (moveEvent as MouseEvent).clientY;

      const diffY = moveY - startYRef.current;
      const newHeight = startHeightRef.current - diffY;

      const minHeight = window.innerHeight * 0.3;
      const maxHeight = 740;
      const clampedHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);
      setHeight(`${clampedHeight}px`);
    };

    const handleEnd = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-30 transform transition-transform duration-300"
          style={{ height }}
        >
          {/* 손잡이 + 탭버튼 드래그 구간 */}
          <div
            className="select-none touch-none"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            {/* 손잡이 */}
            <div className="w-10 h-1 bg-gray-400 rounded-full mx-auto mt-2 cursor-pointer" />

            {/* 탭 버튼 */}
            <div className="py-2 px-2 overflow-x-hidden">
              <TabButtons onClick={() => setIsOpen(true)} />
            </div>
          </div>

          {/* 공간 목록 */}
          <div className="h-full overflow-y-auto pb-24">
            <div className="px-4">
              {dummySpaces.map((space) => (
                <SpaceListCard
                  key={space.id}
                  name={space.name}
                  image={space.image}
                  rating={space.rating}
                  distance={space.distance}
                  tags={space.tags}
                  isLiked={space.isLiked}
                  onDetail={() => alert(`${space.name} 상세보기`)}
                  onLike={() => alert(`${space.name} 좋아요 토글`)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );

};

export default SearchResultSheet;
