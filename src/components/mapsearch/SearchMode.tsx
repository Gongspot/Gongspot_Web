import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { getRecentSearches, deleteRecentSearchById } from "../../apis/recentSearch";
import type { RecentSearchItem } from "../../apis/recentSearch";
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
  setPlaceResults: (items: import("../../apis/placeSearch").PlaceItem[]) => void;
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
  setPlaceResults,
}: SearchModeProps) => {
  const cap3 = <T,>(arr: T[]) => arr.slice(0, 3);

  const inputRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false); // 중복 호출 방지

  useEffect(() => {
    if (isSearchMode && !isSearchResultSheetOpen) {
      inputRef.current?.focus(); // 검색 모드에서 검색창에 커서 표시
    } else {
      inputRef.current?.blur(); // 그렇지 않으면 커서 제거
    }
  }, [isSearchMode, isSearchResultSheetOpen]);

  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);
  const loadedRef = useRef(false);

  // 최초 로딩(최근 검색어 조회)
  useEffect(() => {
    const fetchRecent = async () => {
      if (loadedRef.current) return; // 중복 초기로딩 방지
      loadedRef.current = true;
      
      const items = await getRecentSearches();
      console.log("[recent] normalized:", items);
      setRecentSearches(cap3(items));
    };
    fetchRecent();
  }, []);

  const handleSearchSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 키보드 자동 반복이나 진행 중 재진입 방지
    if (e.key !== "Enter" || e.repeat || submittingRef.current) return;

    if (searchInput.trim() !== "") {
      submittingRef.current = true; // 락 걸기
      const keyword = searchInput.trim();

      try {
        const result = await searchPlaces({
          keyword,
          purpose: "",     // 필터 정보가 필요하면 props로 넘기도록 변경 필요
          type: "",
          mood: "",
          facilities: "",
          location: "",
          page: 0,
        });

        console.log("🔍 검색 결과:", result); // 추후에 상태로 set 가능
        setPlaceResults(result);      // 검색 결과 상태 전달

        // 검색 직후 재조회하되, 새 키워드만 반영하고 기존 화면 항목만 유지(백필 차단)
        const server = await getRecentSearches();
        setRecentSearches((prev) => {
          const norm = (s: string) => s.trim().toLowerCase();
          const k = norm(keyword);
          // 서버에서 "이번에 검색한 키워드"만 뽑음
          const newEntry = server.find((it) => norm(it.keyword) === k);
          // 기존 화면에서 같은 키워드는 제거(최신 한 개만 위에 두기)
          const keep = prev.filter((it) => norm(it.keyword) !== k);
          const next = newEntry ? [newEntry, ...keep] : keep;
          return cap3(next);
        });

        openSearchResultSheet(); // 검색 결과 시트 열기
      } catch (err) {
        console.error("검색 API 호출 실패:", err);
      } finally {
        submittingRef.current = false; // 성공/실패와 무관하게 락 해제
      }
    }
  };

  // 최근 검색어 삭제
  const removeSearch = async (item: RecentSearchItem) => {
    const prev = recentSearches;
    const next = prev.filter((t) => t.id !== item.id);
    setRecentSearches(next); // 낙관적 업데이트

    const ok = await deleteRecentSearchById(item.id);
    if (!ok) {
      console.warn("서버에서 검색어 삭제 실패 → 롤백");
      setRecentSearches(prev); // 실패 시 롤백
    }
  };

  const stopAll = (e: React.SyntheticEvent) => { e.preventDefault(); e.stopPropagation(); };
  const stopTouch = (e: React.TouchEvent) => { e.stopPropagation(); };

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
            {recentSearches.map((term) => (
              <div
                key={`${term.id}-${term.keyword}`}
                className="flex items-center px-3 py-1 rounded-full border border-gray-300 bg-white text-xs text-gray-400 cursor-pointer"
                onClick={() => {
                  onRecentClick(term.keyword);
                  enterSearchMode();
                }}
              >
                <span>{term.keyword}</span>
                <button
                  type="button"
                  onMouseDown={stopAll}
                  onClick={(e) => { stopAll(e); removeSearch(term); }}
                  onTouchStart={stopTouch}
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
