// src/pages/RecsPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpaceFilterTab from "../components/space/SpaceFilterTab";
import SpaceListCard from "../components/space/SpaceListCard";
import dummySpaces from "../constants/dummySpaces";
import TopHeader from "../components/TopHeader";

const RecsPage: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [spaces, setSpaces] = useState(dummySpaces);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredSpaces = spaces
    .filter(space =>
      filter === ""
        ? true
        : filter === "무료"
        ? space.isFree
        : !space.isFree
    )
    .filter(space =>
      search === "" ? true : space.name.includes(search)
    );

  return (
    <div className="min-h-screen bg-white pb-16 flex flex-col">
      {/* 헤더  */}
      <TopHeader title="공간 추천" backButton={false} />
      {/* 필터 */}
      <div className="bg-white sticky top-10 z-20 border-b border-[#CCCCCC]">
        <SpaceFilterTab
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
      </div>
      {/* 리스트 */}
      <div className="flex-1 overflow-y-auto">
          {filteredSpaces.map(space => (
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
  );
};

export default RecsPage;
