// src/components/space/SpaceFilterTab.tsx
import React from "react";
import { Search } from "lucide-react";

interface Props {
  filter: string;
  setFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  enterSearchMode?: () => void; // 필요 없으면 삭제 가능
}

const tabs = ["무료", "유료"];

const SpaceFilterTab: React.FC<Props> = ({
  filter,
  setFilter,
  search,
  setSearch,
  enterSearchMode,
}) => (
  <div className="flex flex-col gap-2 bg-white pa px-4 py-3">
    {/* 검색창 */}
    <div className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm border border-gray-300">
      <Search className="w-4 h-4 text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="학습공간 검색"
        value={search}
        onChange={e => setSearch(e.target.value)}
        onFocus={enterSearchMode}
        className="flex-1 bg-transparent text-sm placeholder-gray-400 outline-none"
      />
    </div>
    {/* 필터 버튼 */}
    <div className="flex space-x-2 pt-1 pb-1">
      {tabs.map(tab => {
        const isActive = filter === tab;
        const base =
          "px-4 py-1 rounded-full text-sm font-semibold border transition-colors duration-200 select-none";
        const selected = "bg-[#EFF7FB] text-[#4CB1F1] font-bold border-[#4CB1F1]";
        const normal = "bg-white text-gray-400 border-gray-300";
        return (
          <button
            key={tab}
            onClick={() => setFilter(isActive ? "" : tab)}
            className={`${base} ${isActive ? selected : normal}`}
            style={{ minWidth: 62 }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  </div>
);

export default SpaceFilterTab;
