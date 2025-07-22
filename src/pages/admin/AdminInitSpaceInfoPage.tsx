// src/pages/AdminInitSpaceInfoPage.tsx
import TopHeader from "../../components/TopHeader";
import FilterSection from "../../components/mapsearch/FilterSection";
import type { TabLabel } from "../../hooks/useSearchFilters";
import { useState } from "react";

import { useLocation } from "react-router-dom";

const AdminInitSpaceInfoPage = () => {
  const location = useLocation();
  const { placeName } = location.state || { placeName: "공간명 없음" };


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

  return (
    <div className="min-h-screen bg-white px-4 pt-4 pb-24">
      <TopHeader title="새 공간 등록" />

      {/* 안내 문구 */}
      <p className="text-sm text-gray-700 text-center mt-6 mb-4">
        공간 초기 정보를 설정해주세요.
      </p>

      {/* 장소명 */}
      <h2 className="text-xl font-bold mb-4">{placeName}</h2>

      {/* 필터 섹션 */}
      {sections.map((section) => (
        <FilterSection
          key={section.title}
          title={section.title}
          labels={section.labels}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
        />
      ))}

      {/* 하단 등록 버튼 */}
      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 bg-white">
        <button className="w-full bg-[#4cb1f1] text-white py-3 rounded-lg text-sm font-semibold">
          등록완료
        </button>
      </div>
    </div>
  );
};

export default AdminInitSpaceInfoPage;
