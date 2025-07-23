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
          className={`px-5 py-1 text-sm rounded-full border ${
            paidFilter === "무료"
              ? "bg-[#eff7fb] text-[#4cb1f1] border-[#4cb1f1]"
              : "bg-white text-gray-400 border-gray-300"
          }`}
        >
          무료
        </button>
        <button
          onClick={() => togglePaidFilter("유료")}
          style={{ borderStyle: 'solid' }}
          className={`px-5 py-1 text-sm rounded-full border ${
            paidFilter === "유료"
              ? "bg-[#eff7fb] text-[#4cb1f1] border-[#4cb1f1]"
              : "bg-white text-gray-400 border-gray-300"
          }`}
        >
          유료
        </button>
      </div>

      {/* 현재 위치 버튼 */}
      <button className="absolute bottom-36 left-4 w-[30px] h-[30px] flex items-center justify-center bg-white border border-[#E5E5E5] rounded-full shadow-sm z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-500"
        >
          <circle cx="12" cy="12" r="7" />
          <line x1="12" y1="5.2" x2="12" y2="4" />     {/* 위 */}
          <line x1="12" y1="18.8" x2="12" y2="20" />   {/* 아래 */}
          <line x1="5.2" y1="12" x2="4" y2="12" />     {/* 왼쪽 */}
          <line x1="18.8" y1="12" x2="20" y2="12" />   {/* 오른쪽 */}
        </svg>

      </button>

      {/* 재검색 버튼 */}
      <button className="absolute bottom-36 left-1/2 -translate-x-1/2 flex items-center px-3 py-1.5 bg-white border border-[#E5E5E5] rounded-full shadow-sm text-xs text-gray-400 z-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#8F9098] relative top-[1px] left-[-3px]"
      >
        {/* 더 긴 원호: 좌우반전 포함 */}
        <g transform="scale(-1,1) translate(-24,0)">
          <path d="M3 12a9 9 0 1 1 3 6" />
        </g>

        {/* 삼각형 화살촉: 꼭짓점이 아래로 (▽ 모양) */}
        <path
        d="M0 0 L6 0 L3 3 Z"
        fill="currentColor"
        transform="translate(20, 12) translate(-3, -1.5)"
      />
      </svg>
        이 지역에서 재검색
      </button>
    </>
  );
};

export default SearchControls;
