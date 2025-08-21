import { useEffect, useState } from "react";
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

type TabLabel = "이용 목적" | "공간 종류" | "분위기" | "부가시설" | "지역";

interface Draft {
  space: any;
  filters: Record<TabLabel, string[]>;
}

const toLite = (s: any): SpaceLite => ({
  id: s.id ?? Date.now(),
  name: s.name ?? "",
  image: s.image ?? "",
  rating: s.rating ?? 0,
  distance: s.distance ?? 0,
  tags: Array.isArray(s.tags) ? s.tags : [],
  isLiked: !!s.isLiked,
});

const AdminSearchSpacePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [_, setSelectedSpace] = useState<SpaceLite | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("admin:newSpaceDraft");
    if (raw) {
      try { setDraft(JSON.parse(raw)); } catch {}
    }
  }, []);

  const source = [
    ...(draft?.space ? [toLite(draft.space)] : []), // ✅ 새로 등록한 공간을 맨 위에
    ...dummySpaces,
  ];

  const filteredSpaces = searchInput
    ? source.filter((s) => s.name.includes(searchInput))
    : [];

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
      state: {
        placeName: space.name,
        space,
        selectedFilters: draft?.filters ?? {}, // 초기 필터도 같이 전달
      },
    });
  };

  const handleLike = (space: SpaceLite) => {
    alert(`${space.name} 좋아요 토글`);
    // 좋아요 토글 로직 추가 예정
  };

  return (
    <div className="relative min-h-screen bg-white">
      <TopHeader title="등록 공간 수정" />

      {/* 검색창: TopHeader 기준 여백 조정 */}
      <div className="mt-[13px] px-4">
        <div className="relative w-full h-[38px] px-4 border border-gray-300 rounded-md">
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="수정할 공간을 검색하세요."
            className="w-full h-full pl-8 pr-4 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* 검색 결과 리스트 */}
      <div className="absolute w-[325px] h-[119px] top-[107px] left-[20px] space-y-[19px] opacity-100">
        {searchInput !== "" && filteredSpaces.length > 0 && (
          <div className="w-[325px]">
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
                // enableWholeCardClick={false}
                buttonText="수정하기"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSearchSpacePage;
