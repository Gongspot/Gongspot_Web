import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { themeSpaces } from "../constants/spaceThemes";
import SpaceListCard from "../components/space/SpaceListCard";
import TopHeader from "../components/TopHeader";
import { usePlacesByCategory } from "../hooks/usePlacesByCategory";
import { useLikeSpace } from "../hooks/useLikeSpace";
import type { CategoryPlaceItem } from "../types/space";

const ThemeDetailPage: React.FC = () => {
  const { themeTitle } = useParams<{ themeTitle: string }>();
  const navigate = useNavigate();

  const theme = themeSpaces.find(t => t.title === themeTitle) || themeSpaces[0];
  const categoryId = theme.id;

  const { data: initialSpaces, isLoading, isError } = usePlacesByCategory(categoryId);
  const { mutate: toggleLike } = useLikeSpace();

  const [places, setPlaces] = useState<CategoryPlaceItem[]>([]);

  useEffect(() => {
    if (initialSpaces) {
      setPlaces(initialSpaces);
    }
  }, [initialSpaces]);

  const handleLike = (id: number) => {
    setPlaces(prev =>
      prev.map(space =>
        space.placeId === id ? { ...space, isLike: !space.isLike } : space
      )
    );
    const currentSpace = places.find(s => s.placeId === id);
    if (currentSpace) {
      toggleLike({ placeId: String(id), isLiked: currentSpace.isLike });
    }
  };

  return (
    // 1. 전체 레이아웃을 화면 높이에 맞게 설정
    <div className="h-screen bg-[#F7F9FB] flex flex-col">
      <TopHeader title={theme.title} />

      {/* 2. 상단 고정 영역 (테마 정보) */}
      <div className="px-4 pt-8 pb-2 bg-[#FAFAFA]">
        <div className="rounded-2xl overflow-hidden mb-3 relative" style={{ height: 180 }}>
          <img src={theme.image} alt={theme.title} className="w-full h-full object-cover" />
          <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute left-5 bottom-3 z-10 text-white">
            <div className="font-semibold text-xl mb-1">{theme.title}</div>
            <div className="text-[14px] font-medium opacity-90">{theme.subtitle}</div>
          </div>
        </div>
        <div className="text-[14px] mb-2 mt-2 whitespace-pre-wrap">
          {theme.description}
        </div>
      </div>
      
      {/* 3. 하단 스크롤 영역 */}
      <div className="flex-1 flex flex-col min-h-0 pb-14">
        <div className="font-semibold p-3 bg-[#FFFFFF]">
          <span>{theme.title} 공간 살펴보기</span>
        </div>
        <div className="overflow-y-auto flex-1 bg-[#EFF7FB]">
          {isLoading && <div className="text-center py-16">목록을 불러오는 중...</div>}
          {isError && <div className="text-center text-red-500">오류가 발생했습니다.</div>}
          
          {!isLoading && !isError && (
            places.length === 0 ? (
              <div className="text-gray-400 text-sm py-10 text-center">
                해당 테마의 공간이 없습니다.
              </div>
            ) : (
              places.map(space => (
                <SpaceListCard
                  key={space.placeId}
                  name={space.name}
                  image={space.imageUrl || "https://via.placeholder.com/150"}
                  rating={space.rating}
                  location={space.location}
                  tags={space.location ? [space.location] : []}
                  isLiked={space.isLike}
                  onDetail={() => navigate(`/space/${space.placeId}`)}
                  onLike={() => handleLike(space.placeId)}
                />
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeDetailPage;