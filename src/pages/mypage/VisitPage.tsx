import TopHeader from "../../components/TopHeader";
import { useEffect, useState } from "react";
import { getVisit } from "../../apis/mypage/mypage";
import type { VisitedPlaces } from "../../types/mypage";
import VisitSpaceCard from "../../components/mypage/visit/VisitSpaceCard";
import { useLikeSpace } from "../../hooks/useLikeSpace";

const VisitPage = () => {
  const [visitedPlaces, setVisitedPlaces] = useState<VisitedPlaces[]>([]);
  const { mutate: toggleLike } = useLikeSpace();

  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const data = await getVisit();
        if (data.isSuccess) {
          setVisitedPlaces(data.result.visitedPlaces);
          console.log("방문 공간 데이터:", data.result.visitedPlaces);
        }
      } catch (e) {
        console.error("Error fetching visited places:", e);
      }
    };
    fetchVisit();
  }, []);

  const handleLikeClick = (placeId: number, currentLiked: boolean) => {
    toggleLike(
      { placeId: String(placeId), isLiked: currentLiked },
      {
        onSuccess: () => {
          setVisitedPlaces(prev =>
            prev.map(place =>
              place.placeId === placeId ? { ...place, isLiked: !currentLiked } : place
            )
          );
        }
      }
    );
  };
  
  return (
    <div className="flex flex-col h-screen w-full bg-[#EFF7FB]">
      <TopHeader title="방문 공간" backButton={true} />
      <div>
        {visitedPlaces.map((item, idx) => (
          <VisitSpaceCard
            key={idx}
            placeId={item.placeId}
            name={item.name}
            image="https://images.unsplash.com/photo-1650338031221-ba71d1178d43?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            rate={item.rate}
            visitedDate={item.visitedDate}
            type={item.type}
            isLiked={item.isLiked}
            onLike={handleLikeClick}
          />
        ))}
      </div>
    </div>
  );
};

export default VisitPage;