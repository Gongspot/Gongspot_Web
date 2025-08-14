// src/components/mapsearch/SearchResultSheet.tsx
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpaceListCard from "../space/SpaceListCard";
import type { PlaceItem } from "../../apis/placeSearch";
import type { TabLabel } from "../../hooks/useSearchFilters";
import TabButtons from "./TabButtons";
import type { Space } from "../../types/space";
import { useLikeSpace } from "../../hooks/useLikeSpace";

interface SearchResultSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  height: string;
  setHeight: (height: string) => void;
  selectedFilters: Record<TabLabel, string[]>;
  setSelectedSpace: (space: Space) => void;
  setIsPlaceSelectSheetOpen: (open: boolean) => void;
  places: PlaceItem[];
}

const SearchResultSheet: React.FC<SearchResultSheetProps> = ({
  isOpen,
  setIsOpen,
  height,
  setHeight,
  selectedFilters,
  //setSelectedSpace,
  //setIsPlaceSelectSheetOpen,
  places,
}) => {
  const navigate = useNavigate();
  const { mutate: toggleLike } = useLikeSpace();

  const [placeList, setPlaceList] = useState<PlaceItem[]>(places);

  useEffect(() => {
    setPlaceList(places);
  }, [places]);

  const handleLike = (placeId: number) => {
    setPlaceList(currentPlaces =>
      currentPlaces.map(p =>
        p.placeId === placeId ? { ...p, isLike: !p.isLike } : p
      )
    );

    const currentPlace = placeList.find(p => p.placeId === placeId);
    if (currentPlace) {
      toggleLike({ placeId: String(placeId), isLiked: currentPlace.isLike });
    }
  };

  // ▼▼▼ toCard 함수를 수정합니다 ▼▼▼
  const toCard = (p: PlaceItem) => ({
    id: p.placeId,
    name: p.name,
    image: p.imageUrl,
    rating: p.rating ?? 0,
    distance: null,
    location: p.locationInfo || null, // locationInfo 값을 location prop으로 전달
    tags: p.hashtag ? [p.hashtag] : [],
    isLiked: !!p.isLike,
  });
  
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startYRef.current = clientY;
    startHeightRef.current = parseInt(height);

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const moveY = "touches" in moveEvent ? moveEvent.touches[0].clientY : (moveEvent as MouseEvent).clientY;
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
          <div
            className="select-none touch-none pt-[8px]"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            <div className="w-[30px] h-[3px] bg-gray-400 rounded-full mx-auto cursor-pointer" />
            <div className="mt-[1px] pb-0 pr-0 overflow-x-hidden" style={{ paddingLeft: "7px" }}>
              <TabButtons selectedFilters={selectedFilters} onClick={() => setIsOpen(true)} />
            </div>
            <div className="h-px bg-gray-200" />
          </div>

          <div className="h-full overflow-y-auto pb-36">
              {placeList.map((p) => {
                const space = toCard(p);
                return (
                  <SpaceListCard
                    key={space.id}
                    name={space.name}
                    image={space.image}
                    rating={space.rating}
                    distance={space.distance}
                    location={space.location} 
                    tags={space.tags}
                    isLiked={space.isLiked}
                    onDetail={() => navigate(`/space/${space.id}`)}
                    onLike={() => handleLike(space.id)}
                  />
                );})}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResultSheet;