// src/pages/HotSpaceListPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopHeader from "../components/TopHeader";
import HotSpaceListCard from "../components/space/HotSpaceListCard";
import { useHotPlaces } from "../hooks/useHotPlaces";
import { useLikeSpace } from "../hooks/useLikeSpace";
import type { HotPlaceListItem } from "../types/space";

const HotSpaceListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: initialSpaces, isLoading, isError } = useHotPlaces();
  const { mutate: toggleLike } = useLikeSpace();

  const [spaces, setSpaces] = useState<HotPlaceListItem[]>([]);

  useEffect(() => {
    if (initialSpaces) {
      setSpaces(initialSpaces);
    }
  }, [initialSpaces]);

  const handleLike = (id: number) => {
    setSpaces(prevSpaces =>
      prevSpaces.map(space =>
        space.placeId === id ? { ...space, isLike: !space.isLike } : space
      )
    );
    
    const currentSpace = spaces.find(s => s.placeId === id);
    if (currentSpace) {
      toggleLike({ placeId: String(id), isLiked: currentSpace.isLike });
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="min-h-screen bg-[#EFF7FB] pb-20">
      <TopHeader title="요즘 HOT한 학습 공간" />
      <div className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          {spaces.map((space, idx) => (
            <HotSpaceListCard
              key={space.placeId}
              rank={idx + 1}
              image={space.imageUrl || "https://via.placeholder.com/200"}
              title={space.name}
              liked={space.isLike}
              onLike={() => handleLike(space.placeId)}
              onClick={() => navigate(`/space/${space.placeId}`)}
              className="h-44"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotSpaceListPage;