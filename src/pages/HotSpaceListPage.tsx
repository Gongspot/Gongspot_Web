import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dummySpaces from "../constants/dummySpaces";
import TopHeader from "../components/TopHeader";
import HotSpaceListCard from "../components/space/HotSpaceListCard";

const HotSpaceListPage: React.FC = () => {
  const [spaces, setSpaces] = useState(
    dummySpaces
      .slice()
      .sort((a, b) => b.reviewStats.score - a.reviewStats.score)
      .slice(0, 10)
  );
  const navigate = useNavigate();

  const handleLike = (id: number) => {
    setSpaces(prev =>
      prev.map(space =>
        space.id === id ? { ...space, isLiked: !space.isLiked } : space
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#EFF7FB] pb-20">
      <TopHeader title="요즘 HOT한 학습 공간" />
      <div className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          {spaces.map((space, idx) => (
            <HotSpaceListCard
              key={space.id}
              rank={idx + 1}
              image={space.image}
              title={space.name}
              liked={space.isLiked}
              onLike={() => handleLike(space.id)}
              onClick={() => navigate(`/space/${space.id}`)}
              className="h-44"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotSpaceListPage;
