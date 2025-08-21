import TopHeader from "../../components/TopHeader";
import FilterSection from "../../components/mapsearch/FilterSection";
import type { TabLabel } from "../../hooks/useSearchFilters";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { approveProposal } from "../../apis/approveProposal";
import { toServerLabel } from "../../utils/label";

const AdminInitSpaceInfoPage = () => {
  const location = useLocation() as {
    state?: { placeName?: string; spaceFromKakao?: any; googleMapsLink?: string; proposalId?: number }
  };
  const navigate = useNavigate();

  const placeName = location.state?.placeName ?? "공간명 없음";
  const spaceFromKakao = location.state?.spaceFromKakao;
  const proposalId = location.state?.proposalId;

  const [selectedFilters, setSelectedFilters] = useState<Record<TabLabel, string[]>>({
    "이용 목적": [],
    "공간 종류": [],
    분위기: [],
    부가시설: [],
    지역: [],
  });
  const [isFree, setIsFree] = useState(false);

  const toggleFilter = (category: TabLabel, label: string) => {
    setSelectedFilters((prev) => {
      const has = prev[category]?.includes(label);
      const updated = has ? prev[category].filter((x) => x !== label) : [...(prev[category] || []), label];
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

  // TabLabel 키가 "이용목적"/"이용 목적" 혼재할 수 있어 안전하게 꺼내기
  const pick = (a: TabLabel, b: TabLabel) =>
    (selectedFilters[a] && selectedFilters[a].length ? selectedFilters[a] : selectedFilters[b] || []);

  const handleComplete = async () => {
    if (!proposalId) {
      alert("proposalId가 없습니다. 요청 목록 → 생성 흐름에서 proposalId를 state로 넘겨주세요.");
      return;
    }
    if (!spaceFromKakao) {
      alert("카카오 장소 데이터가 없습니다. 이전 단계에서 다시 시도해주세요.");
      return;
    }

    const lat = spaceFromKakao?.lat;
    const lng = spaceFromKakao?.lng;

    const body = {
      googlePlace: {
        placeId: "", // 구글 placeId가 없으므로 빈 값(백엔드 허용 가정)
        name: placeName,
        formattedAddress: spaceFromKakao?.address ?? "",
        internationalPhoneNumber: spaceFromKakao?.phone ?? "",
        geometry: lat && lng ? `${lat},${lng}` : "",
        openingHours: "",            // 카카오 검색으로는 영업시간 수집 불가 → 빈 값
        secondaryOpeningHours: "",
        photoUrl: spaceFromKakao?.image ?? "",
      },
      purpose: pick("이용 목적" as TabLabel, "이용목적" as TabLabel).map(toServerLabel),
      type:
        pick("공간 종류" as TabLabel, "공간종류" as TabLabel)[0]
          ? toServerLabel(pick("공간 종류" as TabLabel, "공간종류" as TabLabel)[0])
          : "",
      mood: pick("분위기" as TabLabel, "분위기" as TabLabel).map(toServerLabel),
      facilities: pick("부가시설" as TabLabel, "부가시설" as TabLabel).map(toServerLabel),
      location: pick("지역" as TabLabel, "지역" as TabLabel).map(toServerLabel),
      isFree,
    };

    const ok = await approveProposal(proposalId, body);
    if (!ok) {
      alert("승인 API 호출에 실패했습니다.");
      return;
    }
    navigate("/admin/all-requests", { state: { defaultTab: "reviewed" } });
  };

  return (
    <div className="min-h-screen bg-white relative">
      <TopHeader title="새 공간 등록" />

      <p className="w-[224px] h-[28px] absolute top-[66px] left-1/2 -translate-x-1/2 text-md text-black text-center opacity-100">
        공간 초기 정보를 설정해주세요.
      </p>

      <h2 className="absolute w-[344px] h-[24px] top-[116px] left-[15px] text-xl font-bold">
        {placeName}
      </h2>

      {/* 무료 여부 */}
      <div className="absolute top-[150px] left-[15px] flex items-center gap-2">
        <input id="isFree" type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} />
        <label htmlFor="isFree" className="text-sm">무료 이용 가능</label>
      </div>

      {/* 필터 섹션 */}
      <div className="absolute w-[347px] h-[579px] top-[180px] left-[15px] flex flex-col gap-[16px]">
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

