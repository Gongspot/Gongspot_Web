import { useEffect, useState } from "react";
import TopHeader from "../components/TopHeader";
import FilterSelect from "../components/likes/FilterSelect";
import SpaceSection from "../components/likes/SpaceSection";
import { getLikes } from "../apis/likes";
import type { LikedPlace } from "../types/space";
import { useLikeSpace } from "../hooks/useLikeSpace";

const filters = ['전체', '무료', '유료'];
const filterMap: Record<string, "ALL" | "FREE" | "PAID"> = {
  "전체": "ALL",
  "무료": "FREE",
  "유료": "PAID",
};

const LikesPage = () => {
  const [selected, setSelected] = useState<string>('전체');
  const [likedPlaces, setLikedPlaces] = useState<LikedPlace[]>([]);

  const { mutate: toggleLike } = useLikeSpace();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getLikes(filterMap[selected]);
        if (data.isSuccess) {
          setLikedPlaces(data.result.likedPlace);
          console.log("좋아요 공간 데이터:", data.result.likedPlace);
        }
      } catch (e) {
        console.error("Error fetching liked places:", e);
      }
    };
    fetchLikes();
  }, [selected]);

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
          총 {likedPlaces.length}개
        </p>
        <SpaceSection spaces={likedPlaces} onLike={handleLikeClick} />
      </div>
    </div>
  );
};

export default LikesPage;