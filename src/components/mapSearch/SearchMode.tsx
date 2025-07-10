import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

interface SearchModeProps {
  exitSearchMode: () => void;
  openSearchResultSheet: () => void; // 검색 결과 시트 열기
}

const LOCAL_STORAGE_KEY = "recentSearches";

const SearchMode = ({ exitSearchMode, openSearchResultSheet }: SearchModeProps) => {
  const [searchInput, setSearchInput] = useState("");
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

  // 검색어 추가 (중복 제거, 최신순 유지)
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      const term = searchInput.trim();
      const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 10); // 최대 10개
      setRecentSearches(updated);
      saveToLocalStorage(updated);
      setSearchInput("");
      exitSearchMode();        // 검색 모드 종료
      openSearchResultSheet(); // 바텀시트 열기
    }
  };

  // 검색어 삭제
  const removeSearch = (term: string) => {
    const updated = recentSearches.filter((t) => t !== term);
    setRecentSearches(updated);
    saveToLocalStorage(updated);
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white z-30 p-4">
      {/* 검색창 */}
      <div className="flex items-center px-3 py-2 rounded-md shadow-sm border border-gray-500 bg-white">
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="학습공간 검색"
          className="flex-1 text-sm outline-none bg-transparent"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearchSubmit}
          autoFocus
        />
        <button
          onClick={() => {
            setSearchInput("");
            exitSearchMode();
          }}
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* 최근 검색어 */}
      <div className="mt-4">
        <p className="text-sm text-black mb-2">최근 검색어</p>
        <div className="flex gap-2 flex-wrap">
          {recentSearches.map((term, idx) => (
            <div
              key={idx}
              className="flex items-center px-3 py-1 rounded-full border border-gray-300 bg-white text-xs text-gray-400"
            >
              <span>{term}</span>
              <button onClick={() => removeSearch(term)} className="ml-1">
                <X className="w-3 h-3 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchMode;
