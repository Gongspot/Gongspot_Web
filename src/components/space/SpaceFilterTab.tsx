import React from "react";

interface Props {
  filter: string;
  setFilter: (value: string) => void;
}

const tabs = ["무료", "유료"];

const SpaceFilterTab: React.FC<Props> = ({ filter, setFilter }) => (
  <div className="flex space-x-3 px-4 pt-2 pb-2 bg-white">
    {tabs.map(tab => {
      const isActive = filter === tab;
      const base =
        "px-4 py-1 rounded-full text-sm font-semibold border transition-colors duration-200 select-none";
      const selected = "bg-[#4CB1F1] text-white font-bold";
      const normal = "text-gray-500 border-gray-200";
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
);

export default SpaceFilterTab;
