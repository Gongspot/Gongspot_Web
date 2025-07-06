import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpaceFilterTab from "../components/SpaceFilterTab";
import SpaceListCard from "../components/SpaceListCard";
import dummySpaces from "../constants/dummySpaces";

const RecsPage: React.FC = () => {
  const [filter, setFilter] = useState(""); // "" == 전체
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
    <div className="min-h-screen bg-blue-50 pb-16 flex flex-col">
      <div className="bg-white sticky top-0 z-20 flex flex-col gap-2 pt-2 pb-2 border-b border-[CCCCCC]">
        {/* 검색창 */}
        <div className="px-4">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            placeholder="학습공간 검색"
            className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-400 transition"
          />
        </div>
        <SpaceFilterTab filter={filter} setFilter={setFilter} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 mt-4">
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
    </div>
  );
};

export default RecsPage;
