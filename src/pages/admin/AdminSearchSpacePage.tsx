import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import SpaceListCard from "../../components/space/SpaceListCard";
import dummySpaces from "../../constants/dummySpaces";

// SpaceLite 타입 직접 선언
interface SpaceLite {
  id: number;
  name: string;
  image: string;
  rating: number;
  distance: number;
  tags: string[];
  isLiked: boolean;
}

const AdminSearchSpacePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [_, setSelectedSpace] = useState<SpaceLite | null>(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const result = dummySpaces.find((space) =>
      space.name.includes(searchInput)
    );
    if (result) {
      setSelectedSpace(result);
    } else {
      setSelectedSpace(null);
    }
  };

  const handleDetail = (space: SpaceLite) => {
    navigate("/admin/edit-space", {
      state: { placeName: space.name, space }, // 공간 정보 함께 전달
    });
  };

  const handleLike = (space: SpaceLite) => {
    alert(`${space.name} 좋아요 토글`);
    // 좋아요 토글 로직 추가 예정
  };

  const filteredSpaces = searchInput
    ? dummySpaces.filter((space) => space.name.includes(searchInput))
    : [];

  return (
    <div className="min-h-screen bg-white px-4 pt-4 pb-24">
      <TopHeader title="등록 공간 수정" />

      {/* 검색창 */}
      <div className="mt-4 mb-4">
        <div className="relative">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="수정할 공간을 검색하세요."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300  focus:ring-0 focus:outline-none"
          />
        </div>
      </div>

      {/* 검색 결과 리스트 */}
      {searchInput !== "" && filteredSpaces.length > 0 && (
        <div className="px-4 pt-2">
          {filteredSpaces.map((space) => (
            <SpaceListCard
              key={space.id}
              name={space.name}
              image={space.image}
              rating={space.rating}
              distance={space.distance}
              tags={space.tags}
              isLiked={space.isLiked}
              onDetail={() => handleDetail(space)}
              onLike={() => handleLike(space)}
              enableWholeCardClick={false}
              buttonText="수정하기"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSearchSpacePage;
