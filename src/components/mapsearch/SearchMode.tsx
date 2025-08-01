import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { getRecentSearches, deleteRecentSearchByKeyword } from "../../apis/recentSearch";
import { searchPlaces } from "../../apis/placeSearch";

interface SearchModeProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  exitSearchMode: () => void;
  openSearchResultSheet: () => void;
  isSearchMode: boolean;
  isSearchResultSheetOpen: boolean;
  enterSearchMode: () => void;
  resetToInitialState: () => void;
  onRecentClick: (keyword: string) => void;
}

const SearchMode = ({
  searchInput,
  setSearchInput,
  openSearchResultSheet,
  isSearchMode,
  isSearchResultSheetOpen,
  enterSearchMode,
  resetToInitialState,
  onRecentClick,
}: SearchModeProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchMode && !isSearchResultSheetOpen) {
      inputRef.current?.focus(); // 검색 모드에서 검색창에 커서 표시
    } else {
      inputRef.current?.blur(); // 그렇지 않으면 커서 제거
    }
  }, [isSearchMode, isSearchResultSheetOpen]);

  const handleSearchSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      try {
        const result = await searchPlaces({
          keyword: searchInput.trim(),
          purpose: "",     // 필터 정보가 필요하면 props로 넘기도록 변경 필요
          type: "",
          mood: "",
          facilities: "",
          location: "",
          page: 0,
        });

        console.log("🔍 검색 결과:", result); // 추후에 상태로 set 가능
        openSearchResultSheet(); // 🔸 검색 결과 시트 열기
      } catch (err) {
        console.error("검색 API 호출 실패:", err);
      }
    }
  };

  // 최근 검색어 조회
  useEffect(() => {
    const fetchRecentSearches = async () => {
      const keywordItems = await getRecentSearches(); // [{ id, keyword }, ...]
      const keywords = keywordItems.map(item => item.keyword); // keyword만 추출
      console.log("📦 프론트에서 받은 검색어:", keywords);
      setRecentSearches(keywords); // ✅ string[]에 맞게 저장
    };

    fetchRecentSearches();
  }, []);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 최근 검색어 삭제
  const removeSearch = async (keyword: string) => {
    const updated = recentSearches.filter((t) => t !== keyword);
    setRecentSearches(updated);

    const success = await deleteRecentSearchByKeyword(keyword);
    if (!success) console.warn("서버에서 검색어 삭제 실패");
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-30 pointer-events-none">
      {/* 검색창 (항상 보임) */}
      <div className="absolute h-[38px] top-4 left-4 right-4 z-30 pointer-events-auto">
        <div
          className={`flex items-center px-3 py-2 shadow-sm bg-white
            ${isSearchMode && !isSearchResultSheetOpen
              ? "border border-gray-500"
              : "border border-gray-300"}
            rounded-lg
          `}
        >
          {/* 아이콘: 원 작게, 막대기 길게 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="19"
            height="19"
            fill="none"
            stroke="gray"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.65" y1="16.65" x2="21" y2="21" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            placeholder="학습공간 검색"
            className="flex-1 text-sm outline-none bg-transparent"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchSubmit}
            onFocus={enterSearchMode}
          />
          <button onClick={resetToInitialState}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

      </div>

      {/* 하얀 배경 + 최근 검색어는 검색모드이고 검색 결과 시트가 닫혀있을 때만 */}
      {isSearchMode && !isSearchResultSheetOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white z-20 p-4 pt-20 pointer-events-auto">
          <p className="text-sm text-black mb-2 font-semibold">최근 검색어</p>
          <div className="flex gap-2 flex-wrap">
            {recentSearches.map((term, idx) => (
              <div
                key={idx}
                className="flex items-center px-3 py-1 rounded-full border border-gray-300 bg-white text-xs text-gray-400 cursor-pointer"
                onClick={() => {
                  onRecentClick(term);
                  enterSearchMode();
                }}
              >
                <span>{term}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSearch(term);
                  }}
                  className="ml-1"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );


};

export default SearchMode;
