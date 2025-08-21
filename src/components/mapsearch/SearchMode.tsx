import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { getRecentSearches, deleteRecentSearchById } from "../../apis/recentSearch";
import type { RecentSearchItem } from "../../apis/recentSearch";
import { searchPlaces } from "../../apis/placeSearch";

interface SearchModeProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  exitSearchMode: () => void; // (안 쓰더라도 타입은 유지)
  openSearchResultSheet: () => void;
  isSearchMode: boolean;
  isSearchResultSheetOpen: boolean;
  enterSearchMode: () => void;
  resetToInitialState: () => void;
  onRecentClick: (keyword: string) => void;

  // ✅ 새 콜백: 부모에서 runSearch를 넘겨주면 유/무료 로직을 부모가 통제
  performSearch?: (keyword: string) => Promise<void> | void;

  // ⛓️‍♂️ 백워드 호환: 안 넘겨주면 내부에서 직접 검색 후 이걸로 결과 세팅
  setPlaceResults?: (items: import("../../apis/placeSearch").PlaceItem[]) => void;
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
  performSearch,
  setPlaceResults, // optional (fallback)
}: SearchModeProps) => {
  const cap3 = <T,>(arr: T[]) => arr.slice(0, 3);

  const inputRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false); // 중복 호출 방지

  useEffect(() => {
    if (isSearchMode && !isSearchResultSheetOpen) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [isSearchMode, isSearchResultSheetOpen]);

  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);
  const loadedRef = useRef(false);

  // 최초 로딩(최근 검색어 조회)
  useEffect(() => {
    const fetchRecent = async () => {
      if (loadedRef.current) return;
      loadedRef.current = true;

      const items = await getRecentSearches();
      console.log("[recent] normalized:", items);
      setRecentSearches(cap3(items));
    };
    fetchRecent();
  }, []);

  const handleSearchSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || e.repeat || submittingRef.current) return;
    const keyword = searchInput.trim();
    if (!keyword) return;

    submittingRef.current = true;
    try {
      if (performSearch) {
        // ✅ 부모(runSearch)에게 위임 → 유/무료/필터 로직 일관 적용
        await performSearch(keyword);
      } else {
        // 🔙 백워드 호환: 옛 방식 그대로 내부에서 검색
        const result = await searchPlaces({
          keyword,
          purpose: "",
          type: "",
          mood: "",
          facilities: "",
          location: "",
          page: 0,
        });
        setPlaceResults?.(result);
        try { sessionStorage.removeItem("searchResultsResetAt:v1"); } catch {}
      }

      // 최근 검색어 최신화
      const server = await getRecentSearches();
      setRecentSearches((prev) => {
        const norm = (s: string) => s.trim().toLowerCase();
        const k = norm(keyword);
        const newEntry = server.find((it) => norm(it.keyword) === k);
        const keep = prev.filter((it) => norm(it.keyword) !== k);
        const next = newEntry ? [newEntry, ...keep] : keep;
        return cap3(next);
      });

      // 시트 열기 (부모에서 이미 열어도 중복 호출 무해)
      openSearchResultSheet();
    } catch (err) {
      console.error("검색 실행 실패:", err);
    } finally {
      submittingRef.current = false;
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
      setRecentSearches(prev);
    }
  };

  const stopAll = (e: React.SyntheticEvent) => { e.preventDefault(); e.stopPropagation(); };
  const stopTouch = (e: React.TouchEvent) => { e.stopPropagation(); };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-30 pointer-events-none">
      {/* 검색창 */}
      <div className="absolute h-[38px] top-4 left-4 right-4 z-30 pointer-events-auto">
        <div
          className={`flex items-center px-3 py-2 shadow-sm bg-white
            ${isSearchMode && !isSearchResultSheetOpen ? "border border-gray-500" : "border border-gray-300"}
            rounded-lg
          `}
        >
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

      {/* 최근 검색어 */}
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
