import TopHeader from "../../components/TopHeader";
import SpaceInfoSimple from "../../components/detail/SpaceInfoSimple";
import dummySpaces from "../../constants/dummySpaces";
import { useNavigate, useLocation } from "react-router-dom";
import FilterSection from "../../components/mapsearch/FilterSection";
import type { TabLabel } from "../../hooks/useSearchFilters";
import { useState } from "react";

const AdminEditSpacePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { placeName, space } = location.state || {
    placeName: "공간명 없음",
    space: dummySpaces[0], // fallback
  };

  const [selectedFilters, setSelectedFilters] = useState<Record<TabLabel, string[]>>({
    "이용 목적": [],
    "공간 종류": [],
    분위기: [],
    부가시설: [],
    지역: [],
  });

  const toggleFilter = (category: TabLabel, label: string) => {
    setSelectedFilters((prev) => {
      const hasLabel = prev[category]?.includes(label);
      const updated = hasLabel
        ? prev[category].filter((item) => item !== label)
        : [...(prev[category] || []), label];
      return { ...prev, [category]: updated };
    });
  };

  const sections = [
    { title: "이용목적" as TabLabel, labels: ["개인공부", "그룹공부", "휴식", "노트북 작업", "집중공부"] },
    { title: "공간종류" as TabLabel, labels: ["도서관", "카페", "민간학습공간", "공공학습공간", "교내학습공간"] },
    { title: "분위기" as TabLabel, labels: ["넓은", "아늑한", "깔끔한", "조용한", "음악이 나오는", "이야기를 나눌 수 있는"] },
    { title: "부가시설" as TabLabel, labels: ["Wi-Fi", "콘센트", "넓은 좌석", "음료"] },
    { title: "지역" as TabLabel, labels: ["강남권", "강북권", "도심권", "서남권", "서북권", "동남권", "성동·광진권"] },
  ];

  const handleConfirm = () => {
    navigate("/admin/search-space", {  // AdminSearchSpacePage로 이동
      state: {
        placeName: space.name,
      },
    });
  };

  return (
    <div className="relative min-h-screen bg-white">
      <TopHeader title="등록 공간 수정" />

      {/* 안내 문구 */}
      <p className="absolute w-[165px] h-[28px] top-[66px] left-[105px] opacity-100 text-md text-black">
        공간 정보를 수정해주세요.
      </p>

      <div className="w-full px-[15px] pt-[64px] flex flex-col gap-[34px]">
        {/* 정보 영역 */}
        <div className="w-[344px] flex flex-col gap-[10px]">
          <h2 className="text-xl font-bold">{placeName}</h2>
          <div className="border border-gray-300 bg-white rounded-lg p-4">
            <SpaceInfoSimple space={space} />
          </div>
        </div>

        {/* 필터 섹션 */}
        <div className="w-[347px] flex flex-col gap-[20px]">
          {sections.map((section) => (
            <FilterSection
              key={section.title}
              title={section.title}
              labels={section.labels}
              selectedFilters={selectedFilters}
              toggleFilter={toggleFilter}
            />
          ))}
        </div>
      </div>


      {/* 하단 등록 버튼 */}
      <div className="w-full px-4 mt-[14px] mb-[20px]">
        <button
          onClick={handleConfirm}
          className="w-[320px] h-[46px] bg-[#4cb1f1] text-white rounded-[5px] text-sm mx-auto block"
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default AdminEditSpacePage;
