import { Search, Crosshair } from "lucide-react";

interface SearchControlsProps {
  paidFilter: "무료" | "유료" | null;
  togglePaidFilter: (label: "무료" | "유료") => void;
  enterSearchMode: () => void;
}

const SearchControls = ({ paidFilter, togglePaidFilter }: SearchControlsProps) => {
  return (
    <>

      {/* 필터 버튼 */}
      <div className="absolute top-[65px] left-4 right-4 z-20 flex space-x-2">
        <button
          onClick={() => togglePaidFilter("무료")}
          style={{ borderStyle: 'solid' }}
          className={`px-4 py-1 text-sm rounded-full border ${
            paidFilter === "무료"
              ? "bg-[#4cb1f1] text-white border-[#4cb1f1]"
              : "bg-white text-gray-400 border-gray-300"
          }`}
        >
          무료
        </button>
        <button
          onClick={() => togglePaidFilter("유료")}
          style={{ borderStyle: 'solid' }}
          className={`px-4 py-1 text-sm rounded-full border ${
            paidFilter === "유료"
              ? "bg-[#4cb1f1] text-white border-[#4cb1f1]"
              : "bg-white text-gray-400 border-gray-300"
          }`}
        >
          유료
        </button>
      </div>

      {/* 현재 위치 버튼 */}
      <button className="absolute bottom-36 left-4 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm z-20">
        <Crosshair className="w-4 h-4 text-gray-400" />
      </button>

      {/* 재검색 버튼 */}
      <button className="absolute bottom-36 left-1/2 -translate-x-1/2 flex items-center px-4 py-1.5 bg-white border border-gray-300 rounded-full shadow-sm text-sm text-gray-400 z-20">
        <Search className="w-4 h-4 mr-1 text-gray-400" />이 지역에서 재검색
      </button>
    </>
  );
};

export default SearchControls;
