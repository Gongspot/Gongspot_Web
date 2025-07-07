import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchModeProps {
  exitSearchMode: () => void;
}

const SearchMode = ({ exitSearchMode }: SearchModeProps) => {
  const [searchInput, setSearchInput] = useState("");
  const recentSearches = ["스터디카페", "공공도서관", "조용한 공간"];

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
          autoFocus
        />
        <button
          onClick={() => {
            setSearchInput("");
            exitSearchMode();
          }}
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* 최근 검색어 */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-2">최근 검색어</p>
        <ul className="space-y-2 text-sm">
          {recentSearches.map((term, idx) => (
            <li key={idx} className="text-gray-700 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
              {term}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchMode;
