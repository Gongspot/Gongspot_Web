import React from "react";
import SpaceListCard from "../space/SpaceListCard";

interface SpaceLite {
  id: number;
  name: string;
  image: string;
  rating: number;
  distance: number;
  tags: string[];
  isLiked: boolean;
}

interface PlaceSelectSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  space: SpaceLite | null;
}

const PlaceSelectSheet: React.FC<PlaceSelectSheetProps> = ({
  isOpen,
  setIsOpen,
  space,
}) => {
  return (
    <>
      {isOpen && space && (
        <div
          className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-30 transition-transform duration-300"
          style={{ height: "230px" }} // ← 필요 시 높이 조절
          onClick={() => setIsOpen(false)} // 임시 동작, 실제 버튼으로 교체 가능
        >
          {/* 손잡이만 있는 헤더 */}
          <div className="select-none touch-none">
            <div className="w-10 h-1 bg-gray-400 rounded-full mx-auto mt-2 cursor-pointer" />
          </div>

          {/* 공간 정보 하나만 표시 */}
          <div className="px-4 pt-4">
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
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceSelectSheet;
