import { useEffect, useMemo, useState } from "react";
import TopHeader from "../components/TopHeader";
import FilterSelect from "../components/likes/FilterSelect";
import SpaceSection from "../components/likes/SpaceSection";
import { getLikes } from "../apis/likes";
import type { LikedPlace } from "../types/space";
import { useLikeSpace } from "../hooks/useLikeSpace";

const filters = ['전체', '무료', '유료'];

const LikesPage = () => {
  const [selected, setSelected] = useState<string>('전체');
  const [likedPlaces, setLikedPlaces] = useState<LikedPlace[]>([]);

  const { mutate: toggleLike } = useLikeSpace();
  
  const filteredSpaces = useMemo(() => {
    if (selected === "전체") return likedPlaces;
    return likedPlaces.filter((space) => space.isFree === (selected === "무료"));
  }, [selected, likedPlaces]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getLikes();
        if (data.isSuccess) {
          setLikedPlaces(data.result.likedPlace);
          console.log("좋아요 공간 데이터:", data.result.likedPlace);
        }
      } catch (e) {
        console.error("Error fetching liked places:", e);
      }
    };
    fetchLikes();
  }, []);

  const handleLikeClick = (placeId: number, currentLiked: boolean) => {
    toggleLike(
      { placeId: String(placeId), isLiked: currentLiked },
      {
        onSuccess: () => {
          setLikedPlaces(prev =>
            prev.map(place =>
              place.placeId === placeId ? { ...place, isLiked: !currentLiked } : place
            )
          );
        }
      }
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#EFF7FB]">
      <TopHeader title="찜한 공간" backButton={false} />
      <div className="flex flex-col items-start mx-[1.25rem] mt-[1rem] mb-[0.625rem] gap-y-[0.625rem]">
        <div className="flex gap-x-[0.5rem]">
          {filters.map((filter) => (
            <FilterSelect
              key={filter}
              text={filter}
              selected={selected === filter}
              onClick={() => setSelected(filter)}
            />
          ))}
        </div>
        <p className="text-[0.813rem]">
          총 {filteredSpaces.length}개
        </p>
        <SpaceSection spaces={filteredSpaces} onLike={handleLikeClick} />
      </div>
    </div>
  );
};

export default LikesPage;