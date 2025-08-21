import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import SpaceListCard from "../../components/space/SpaceListCard";
import { searchPlaces } from "../../apis/placeSearch";

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
  const [draft, setDraft] = useState<Draft | null>(null);
  const navigate = useNavigate();

  const [apiSpaces, setApiSpaces] = useState<SpaceLite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("admin:newSpaceDraft");
    if (raw) {
      try {
        setDraft(JSON.parse(raw));
      } catch {}
    }
  }, []);

  const filteredSpaces = apiSpaces; // API 결과를 그대로 렌더

  const handleSearch = async () => {
    const keyword = searchInput.trim();
    if (!keyword) {
      setApiSpaces([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      // keyword만 전송 (page 필요시 유지)
      const result = await searchPlaces({ keyword, page: 0 });

      // API → SpaceLite 매핑
      const mapped: SpaceLite[] = result.map((p) => ({
        id: p.placeId,
        name: p.name,
        image: p.imageUrl,
        rating: p.rating ?? 0,
        distance: 0,
        tags: p.hashtag ? [p.hashtag] : [],
        isLiked: !!p.isLike,
      }));

      // 초안(draft) 항목을 맨 위로 노출하고 싶으면 head로 합치기
      const head = draft?.space ? [toLite(draft.space)] : [];
      setApiSpaces([...head, ...mapped]);
    } catch (e: any) {
      setError("검색 중 오류가 발생했습니다.");
      setApiSpaces([]);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (space: SpaceLite) => {
    navigate("/admin/edit-space", {
      state: {
        placeName: space.name,
        space,
        selectedFilters: draft?.filters ?? {},
      },
    });
  };

  const handleLike = (space: SpaceLite) => {
    alert(`${space.name} 좋아요 토글`);
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
      <div className="absolute top-[107px] left-[20px] w-[325px] space-y-[19px] opacity-100">
        {loading && <div className="px-4 text-sm text-gray-500">검색 중…</div>}
        {error && <div className="px-4 text-sm text-red-500">{error}</div>}

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

