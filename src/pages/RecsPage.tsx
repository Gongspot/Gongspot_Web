import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import SpaceFilterTab from "../components/SpaceFilterTab";
import SpaceListCard from "../components/SpaceListCard";
import dummySpaces from "../constants/dummySpaces";

const RecsPage: React.FC = () => {
  const [filter, setFilter] = useState("전체");
  const [spaces, setSpaces] = useState(dummySpaces);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 pb-16 flex flex-col">
      <TopNavBar title="공간 추천" />
      <div className="sticky top-[56px] z-20 bg-transparent">
        <SpaceFilterTab filter={filter} setFilter={setFilter} isSticky={isSticky} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 mt-4">
          {spaces
            .filter(space =>
              filter === "전체" ? true :
                filter === "무료" ? space.isFree : !space.isFree
            )
            .map(space => (
              <SpaceListCard
                key={space.id}
                name={space.name}
                image={space.image}
                rating={space.rating}
                distance={space.distance}
                tags={space.tags}
                isLiked={space.isLiked}
                onLike={() =>
                  setSpaces(prev =>
                    prev.map(s =>
                      s.id === space.id ? { ...s, isLiked: !s.isLiked } : s
                    )
                  )
                }
                onDetail={() => navigate(`/space/${space.id}`)} 
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecsPage;
