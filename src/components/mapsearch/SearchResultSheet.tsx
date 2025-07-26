import React, { useRef } from "react";
import SpaceListCard from "../space/SpaceListCard";
import dummySpaces from "../../constants/dummySpaces";
import type { TabLabel } from "../../hooks/useSearchFilters";
import TabButtons from "./TabButtons";
import type { Space } from "../../types/space";

interface SearchResultSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  height: string;
  setHeight: (height: string) => void;
  selectedFilters: Record<TabLabel, string[]>;
  setSelectedSpace: (space: Space) => void;
  setIsPlaceSelectSheetOpen: (open: boolean) => void;
}

const SearchResultSheet: React.FC<SearchResultSheetProps> = ({
  isOpen,
  setIsOpen,
  height,
  setHeight,
  selectedFilters,
  setSelectedSpace,
  setIsPlaceSelectSheetOpen,
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
            className="select-none touch-none pt-[8px]"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            {/* 손잡이 */}
            <div className="w-[30px] h-[3px] bg-gray-400 rounded-full mx-auto cursor-pointer" />

            {/* 탭 버튼 */}
            <div className="mt-[1px] pb-0 pr-0 overflow-x-hidden" style={{ paddingLeft: "13px" }}>
              <TabButtons selectedFilters={selectedFilters} onClick={() => setIsOpen(true)} />
            </div>

            {/* 구분선 추가 */}
            <div className="h-px bg-gray-200" />
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
                  onDetail={() => {
                    setSelectedSpace({
                      id: space.id,
                      name: space.name,
                      image: space.image,
                      rating: space.rating,
                      distance: space.distance,
                      tags: space.tags,
                      isLiked: space.isLiked,
                    }); // 필요한 필드만 전달
                    setIsPlaceSelectSheetOpen(true);
                    setIsOpen(false);
                  }}
                  onLike={() => {
                    // 좋아요 토글 로직이 있다면 여기에
                  }}
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
