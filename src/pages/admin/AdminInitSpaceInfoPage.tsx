import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../../apis/axios";
import TopHeader from "../../components/TopHeader";
import FilterSection from "../../components/mapsearch/FilterSection";
// import type { TabLabel } from "../../hooks/useSearchFilters"; // TabLabel 타입
import { approveProposal } from "../../apis/space";

// 공간 등록 응답 타입
export interface SpaceCreateApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;  // 성공시 반환되는 결과, 예: "등록 완료"
}

// TabLabel 타입 정의
type TabLabel = "이용 목적" | "공간 종류" | "분위기" | "부가시설" | "지역";

// 섹션 타입 수정
const sections: { title: TabLabel; labels: string[] }[] = [
  { title: "이용 목적", labels: ["개인공부", "그룹공부", "휴식", "노트북 작업", "집중공부"] },
  { title: "공간 종류", labels: ["도서관", "카페", "민간학습공간", "공공학습공간", "교내학습공간"] },
  { title: "분위기", labels: ["넓은", "아늑한", "깔끔한", "조용한", "음악이 나오는", "이야기를 나눌 수 있는"] },
  { title: "부가시설", labels: ["Wi-Fi", "콘센트", "넓은 좌석", "음료"] },
  { title: "지역", labels: ["강남권", "강북권", "도심권", "서남권", "서북권", "동남권", "성동·광진권"] },
];

const AdminInitSpaceInfoPage = () => {
  const location = useLocation();
  const spaceFromKakao = location.state?.spaceFromKakao; // AdminConfirmSpacePage에서 전달받은 데이터
  const navigate = useNavigate();
  const { placeName } = location.state || { placeName: "공간명 없음" };
  // const [isLoading, setIsLoading] = useState(true);

  const [selectedFilters, setSelectedFilters] = useState<Record<TabLabel, string[]>>({
    "이용 목적": [],
    "공간 종류": [],
    "분위기": [],
    "부가시설": [],
    "지역": [],
  });

  const [proposalId, setProposalId] = useState<number | null>(null);

  const fetchProposalId = async () => {
    // setIsLoading(true); // 로딩 시작
    console.log("--- fetching proposal ID initiated ---");
    try {
      const response = await axiosInstance.get('/request/proposal', {
        params: { approve: false, page: 0, size: 20 },
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
      });

      const proposals = response.data.result.result as Array<any>;
      console.log("Proposals fetched:", proposals);

      // 🚨 1단계 수정: 이름 정규화 (공백 제거)
      // 타겟 이름 (예: 플랜에이스터디카페당산센터)
      const normalizedTargetName = spaceFromKakao.name.replace(/\s/g, '');
      console.log("Normalized Target Name:", normalizedTargetName);

      if (proposals.length > 0) {
        console.log("Target space name:", spaceFromKakao.name);

        // 🚨 2단계 수정: startsWith를 사용하여 단어 불일치(센터 유무) 커버
        const matched = proposals.find(p => {
          // 목록 이름 (예: 플랜에이스터디카페당산)
          const normalizedProposalName = p.name.replace(/\s/g, '');

          // 타겟 이름이 목록 이름으로 "시작"하는지 확인 (이름이 더 상세한 경우 커버)
          return normalizedTargetName.startsWith(normalizedProposalName);
        });

        console.log("Matched proposal:", matched);
        // matched가 null이 아니면 proposalId 설정
        setProposalId(matched?.proposalId ?? null);
        console.log("Final proposalId set to:", matched?.proposalId ?? null);
      } else {
        console.log("No proposals found in the list.");
      }
    } catch (error) {
      console.error("Error fetching proposal ID:", error);
    } finally {
      // setIsLoading(false); // 로딩 종료
      console.log("--- fetching proposal ID finished ---");
    }
  };

  useEffect(() => {
    fetchProposalId();
  }, [spaceFromKakao]);

  const toggleFilter = (category: TabLabel, label: string) => {
    setSelectedFilters((prev) => {
      const hasLabel = prev[category]?.includes(label);
      const updated = hasLabel
        ? prev[category].filter((item) => item !== label)
        : [...(prev[category] || []), label];
      return { ...prev, [category]: updated };
    });
  };

  const handleComplete = async () => {
    if (!proposalId) {
      console.error("proposalId is missing");
      return;
    }

    const ensureNonEmpty = (arr: string[], fallback: string[]) =>
      (Array.isArray(arr) && arr.length > 0) ? arr : fallback;

    const defaultRegion = ["서북권"];

    const rawBody = {
      googlePlace: {
        // placeId는 필수 문자열로 전송 (null일 경우 서버에서 400 에러 유발)
        placeId: String(spaceFromKakao?.placeId ?? spaceFromKakao?.id ?? ""), // null 대신 "" 사용
        name: spaceFromKakao?.name ?? spaceFromKakao?.place_name ?? "미등록 공간", // null 대신 유효값 사용
        formattedAddress:
          spaceFromKakao?.formattedAddress ?? spaceFromKakao?.road_address_name ?? spaceFromKakao?.address ?? spaceFromKakao?.address_name ?? "미등록 주소", // null 대신 유효값 사용
        internationalPhoneNumber:
          spaceFromKakao?.internationalPhoneNumber ?? spaceFromKakao?.phone ?? "000-0000-0000", // null 대신 유효값 사용

        // geometry, photoUrl 등 유효성 검사 대비 코드는 유지
        geometry:
          spaceFromKakao?.geometry ??
          (spaceFromKakao?.y != null && spaceFromKakao?.x != null
            ? `${spaceFromKakao.y},${spaceFromKakao.x}` : "0,0"),

        openingHours: spaceFromKakao?.openingHours ?? spaceFromKakao?.opening ?? "미등록", // null 대신 유효값 사용
        secondaryOpeningHours: spaceFromKakao?.secondaryOpeningHours ?? null,
        photoUrl:
          spaceFromKakao?.photoUrl && !spaceFromKakao.photoUrl.startsWith('/')
            ? spaceFromKakao.photoUrl
            : "https://example.com/default-image.jpg",
      },

      purpose: ensureNonEmpty(
        selectedFilters["이용 목적"].map(v => v.replace(/[_\s]/g, '')),
        ["개인공부"]
      ),

      type: selectedFilters["공간 종류"][0] ?? "카페",

      mood: ensureNonEmpty(
        selectedFilters["분위기"].map(v => v.replace(/[_\s]/g, '_')),
        ["깔끔한"]
      ),

      facilities: ensureNonEmpty(selectedFilters["부가시설"].map(v => v.replace("Wi-Fi", "WiFi")), ["WiFi"]),
      location: ensureNonEmpty(selectedFilters["지역"], defaultRegion),
      isFree: true,
    };

    const body = rawBody;

    // 디버깅 로그 (서버에 보내는 최종 데이터 확인)
    console.log("Request Body sent to Server:", JSON.stringify(body, null, 2));

    // placeId나 name이 null이거나 빈 문자열인지 확인
    if (!body.googlePlace.placeId || body.googlePlace.name === null || body.googlePlace.name === "") {
      alert("장소 정보(placeId, name)가 비어 있습니다. 콘솔을 확인하세요.");
      return;
    }

    try {
      const result = await approveProposal(proposalId, body);
      if (result.isSuccess) {
        localStorage.setItem(
          "admin:newSpaceDraft",
          JSON.stringify({ space: spaceFromKakao, filters: selectedFilters })
        );
        navigate("/admin/all-requests", { state: { defaultTab: "reviewed" } });
      } else {
        alert("승인 실패: " + result.message);
      }
    } catch (e) {
      console.error("승인 중 오류:", e);
      alert("승인 중 오류가 발생했습니다.");
    }
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
      <div className="absolute w-[347px] h-[579px] top-[159px] left-[15px] flex flex-col gap-[16px]">
        {sections.map((section) => (
          <FilterSection
            key={section.title}
            title={section.title}
            labels={section.labels}
            selectedFilters={selectedFilters} // 필터 상태를 전달
            toggleFilter={toggleFilter} // 필터 토글 함수 전달
          />
        ))}
      </div>
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
