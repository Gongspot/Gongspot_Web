// src/pages/AdminInitSpaceInfoPage.tsx
import TopHeader from "../../components/TopHeader";
import FilterSection from "../../components/mapsearch/FilterSection";
import type { TabLabel } from "../../hooks/useSearchFilters";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminInitSpaceInfoPage = () => {
  const location = useLocation() as { state?: { placeName?: string; spaceFromKakao?: any } };
  const spaceFromKakao = location.state?.spaceFromKakao;
  const navigate = useNavigate();
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

  // 등록완료 핸들러에서 localStorage에 저장
  const handleComplete = () => {
    if (spaceFromKakao) {
      localStorage.setItem(
        "admin:newSpaceDraft",
        JSON.stringify({
          space: spaceFromKakao,         // 카카오에서 받은 공간
          filters: selectedFilters,      // 이 페이지에서 고른 필터들
        })
      );
    }
    navigate("/admin/all-requests", { state: { defaultTab: "reviewed" } });
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* 상단 헤더 */}
      <TopHeader title="새 공간 등록" />

      {/* 안내 문구 */}
      <p className="w-[224px] h-[28px] absolute top-[66px] left-1/2 -translate-x-1/2 text-md text-black text-center opacity-100">
        공간 초기 정보를 설정해주세요.
      </p>

      {/* 장소명 */}
      <h2 className="absolute w-[344px] h-[24px] top-[116px] left-[15px] text-xl font-bold">
        {placeName}
      </h2>

      {/* 필터 섹션 */}
      <div className="absolute w-[347px] h-[579px] top-[159px] left-[15px] flex flex-col gap-[16px]">
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

      {/* 하단 등록 버튼 */}
      <div className="absolute w-[320px] h-[46px] top-[780px] left-[27px]">
        <button
          onClick={handleComplete}
          className="w-full h-full bg-[#4cb1f1] text-white rounded-[5px] text-sm font-semibold"
        >
          등록완료
        </button>
      </div>
    </div>
  );

};

export default AdminInitSpaceInfoPage;
