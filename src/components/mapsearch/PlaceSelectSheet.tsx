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
  // 경고 제거 + 안전 닫기 핸들러
  const close = () => {
    if (onRequestClose) onRequestClose();
    else setIsOpen(false);
  };

  return (
    <>
      {isOpen && space && (
        // 바깥 컨테이너(배경 클릭 시 닫힘)
        <div
          className="fixed inset-0 z-30 pointer-events-none" // ★ 추가: 배경은 터치 통과(지도 제스처 유지)
        >
          {/* 시트 박스 */}
          <div
            className="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg transition-transform duration-300 pointer-events-auto" // ★ 추가/유지
            style={{ height: "240px" }}
            onClick={(e) => e.stopPropagation()} // 시트 내부 클릭은 닫힘 방지
          >
            {/* 손잡이 */}
            <div
              className="select-none touch-none"
              role="button"           // 접근성
              tabIndex={0}            // 키보드 포커스
              onClick={close}         // 클릭으로 닫기
              onKeyDown={(e) => {     // Enter/Space로 닫기
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  close();
                }
              }}
            >
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
