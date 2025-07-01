import React from "react";

interface Props {
  filter: string;
  setFilter: (value: string) => void;
  isSticky?: boolean;
}

const tabs = ["전체", "무료", "유료"];

const SpaceFilterTab: React.FC<Props> = ({ filter, setFilter, isSticky }) => (
  <div className="flex space-x-3 px-4 pt-2 pb-2 bg-transparent">
    {tabs.map(tab => {
      const isActive = filter === tab;
      // 스크롤 시 연하게, 평소는 진하게 (선택된 것만 파랑)
      const base =
        "px-4 py-1 rounded-full text-sm font-semibold border transition-colors duration-200 select-none";
      const selected =
        isSticky
          ? "border-blue-500 text-blue-500 bg-transparent font-bold"
          : "bg-blue-500 text-white border-blue-500 font-bold";
      const normal =
        isSticky
          ? "border-gray-300 text-gray-300 bg-transparent"
          : "bg-gray-200 text-gray-700 border-gray-200";
      return (
        <button
          key={tab}
          onClick={() => setFilter(tab)}
          className={`${base} ${isActive ? selected : normal}`}
          style={{ minWidth: 62 }}
        >
          {tab}
        </button>
      );
    })}
  </div>
);

export default SpaceFilterTab;
