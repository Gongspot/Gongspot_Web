import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

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

const LOCAL_STORAGE_KEY = "recentSearches";

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

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 로컬스토리지에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // 로컬스토리지에 저장하기
  const saveToLocalStorage = (items: string[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  };

  // 검색어 추가
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      const term = searchInput.trim();
      const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 10);
      setRecentSearches(updated);
      saveToLocalStorage(updated);
      openSearchResultSheet(); // 바텀시트 열기
    }
  };

  const removeSearch = (term: string) => {
    const updated = recentSearches.filter((t) => t !== term);
    setRecentSearches(updated);
    saveToLocalStorage(updated);
  };

  useEffect(() => {
    if (isSearchMode && !isSearchResultSheetOpen) {
      inputRef.current?.focus(); // 검색 모드에서 검색창에 커서 표시
    } else {
      inputRef.current?.blur(); // 그렇지 않으면 커서 제거
    }
  }, [isSearchMode, isSearchResultSheetOpen]);


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
                  onRecentClick(term);           // 검색어 반영
                  enterSearchMode();             // 검색 모드 유지
                }}
              >
                <span>{term}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();         // X버튼 클릭 시 부모 클릭 방지
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
