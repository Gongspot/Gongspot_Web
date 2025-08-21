import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpaceFilterTab from "../components/space/SpaceFilterTab";
import SpaceListCard from "../components/space/SpaceListCard";
import TopHeader from "../components/TopHeader";
import { useRecommendations } from "../hooks/useRecommendations";
import { useLikeSpace } from "../hooks/useLikeSpace";
import type { RecommendedPlace } from "../types/space";

const RecsPage: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(Number(payload.sub));
      } catch (e) {
        console.error("Failed to parse token:", e);
      }
    }
  }, []);

  const { data: recommendedSpaces, isLoading, isError } = useRecommendations(userId!);
  const { mutate: toggleLike } = useLikeSpace();

  // API 응답 데이터와 UI의 찜하기 상태를 함께 관리
  const [places, setPlaces] = useState<RecommendedPlace[]>([]);

  useEffect(() => {
    if (recommendedSpaces) {
      // API 응답에 isLike 필드를 추가하여 state를 초기화
      const initialPlaces = recommendedSpaces.map(p => ({ ...p, isLike: false }));
      setPlaces(initialPlaces);
    }
  }, [recommendedSpaces]);

  const handleLike = (placeId: number) => {
    // UI를 먼저 업데이트 (낙관적 업데이트)
    setPlaces(currentPlaces =>
      currentPlaces.map(p =>
        p.place_id === placeId ? { ...p, isLike: !p.isLike } : p
      )
    );
    
    const currentPlace = places.find(p => p.place_id === placeId);
    if (currentPlace) {
      toggleLike({ placeId: String(placeId), isLiked: currentPlace.isLike || false });
    }
  };

  // 검색 및 필터 로직
  const filteredSpaces = places
    .filter(space => {
      if (filter === "") return true;
      if (filter === "무료") return space.is_free;
      if (filter === "유료") return !space.is_free;
      return true;
    })
    .filter(space =>
      search === "" ? true : space.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-white pb-16 flex flex-col">
      <TopHeader title="공간 추천" backButton={false} />
      <div className="bg-white sticky top-10 z-20 border-b border-[#CCCCCC]">
        <SpaceFilterTab
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {isLoading && <div className="text-center py-10">AI가 맞춤 공간을 추천하는 중...</div>}
        {isError && <div className="text-center py-10 text-red-500">추천 공간을 불러오는 데 실패했습니다.</div>}
        
        {!isLoading && !isError && (
          filteredSpaces.length === 0 ? (
            <div className="text-center py-10 text-gray-500">추천 공간이 없습니다.</div>
          ) : (
            filteredSpaces.map(space => (
              <SpaceListCard
                key={space.place_id}
                name={space.name}
                image={space.photo_url || "https://via.placeholder.com/150"}
                rating={space.average_rating}
                location={space.address} 
                tags={[space.type, ...space.purpose, ...space.mood, ...space.location]}
                isLiked={space.isLike || false}
                onLike={() => handleLike(space.place_id)}
                onDetail={() => navigate(`/space/${space.place_id}`)}
              />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default RecsPage;
