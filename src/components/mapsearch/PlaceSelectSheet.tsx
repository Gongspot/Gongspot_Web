import React from "react";
import SpaceListCard from "../space/SpaceListCard";

interface SpaceLite {
  id: number;
  name: string;
  image: string;
  rating: number;
  distance: number | null;
  tags: string[];
  isLiked: boolean;
}

interface PlaceSelectSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  space: SpaceLite | null;
  onDetail: () => void;
  onLike: () => void;
  onRequestClose?: () => void;
}

const PlaceSelectSheet: React.FC<PlaceSelectSheetProps> = ({
  isOpen,
  setIsOpen,
  space,
  onDetail,
  onLike,
  onRequestClose,
}) => {
  return (
    <>
      {isOpen && space && (
        // 바깥 컨테이너(배경 클릭 시 닫힘)
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            if (onRequestClose) onRequestClose();
            else setIsOpen(false);
          }}
        >
          {/* 시트 박스 */}
          <div
            className="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg transition-transform duration-300"
            style={{ height: "240px" }}
            onClick={(e) => e.stopPropagation()} // ★ 시트 내부 클릭은 닫힘 방지
          >
            {/* 손잡이 */}
            <div className="select-none touch-none">
              <div className="w-[30px] h-[3px] bg-gray-400 rounded-full mx-auto mt-2 cursor-pointer" />
            </div>

            {/* 내용 */}
            <div className="px-4">
              <SpaceListCard
                key={space.id}
                name={space.name}
                image={space.image}
                rating={space.rating}
                distance={space.distance}
                tags={space.tags}
                isLiked={space.isLiked}
                onDetail={onDetail}
                onLike={onLike}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceSelectSheet;
