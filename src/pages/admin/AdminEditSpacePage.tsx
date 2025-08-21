import TopHeader from "../../components/TopHeader";
import SpaceInfoSimple from "../../components/detail/SpaceInfoSimple";
import { useNavigate, useLocation } from "react-router-dom";
import FilterSection from "../../components/mapsearch/FilterSection";
import type { TabLabel } from "../../hooks/useSearchFilters";
import { useEffect, useMemo, useState } from "react";
import { getPlaceDetails, updatePlace, type PlaceDetails } from "../../apis/PlaceDetails";

const emptyFilters: Record<TabLabel, string[]> = {
  "이용 목적": [],
  "공간 종류": [],
  분위기: [],
  부가시설: [],
  지역: [],
};

const normalizeHours = (raw?: string) => {
  if (!raw) return { text: "", list: [] as string[] };
  // "..., ..." -> 줄바꿈
  const text = raw.replace(/,\s*/g, "\n");
  const list = text.split("\n").map(s => s.trim()).filter(Boolean);
  return { text, list };
};

// 카카오 키 + 타입 선언
const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;
declare global {
  interface Window { kakao: any; }
}

// 라벨 정규화 (UI → 서버)
const toServerLabel = (s: string) => {
  if (s === "Wi-Fi") return "WiFi";
  if (s === "노트북 작업") return "노트북작업";
  return s;
};

// 라벨 정규화 (서버 → UI)
const toUiLabel = (s: string) => {
  if (s === "WiFi") return "Wi-Fi";
  if (s === "노트북작업") return "노트북 작업";
  return s;
};


const AdminEditSpacePage = () => {
  const navigate = useNavigate();
  const location = useLocation() as {
    state?: {
      placeName?: string;
      space?: any; // AdminSearchSpacePage에서 넘겨준 SpaceLite
      selectedFilters?: Record<TabLabel, string[]>;
    };
  };

  // 라우터에서 받은 값
  const placeId: number | undefined = location.state?.space?.id; // SpaceLite.id == placeId
  const placeNameFromState = location.state?.placeName ?? "공간명 없음";

  useEffect(() => {
    console.log("[edit] placeId:", placeId, "location.state:", location.state);
  }, [placeId, location.state]);

  // 상세 정보 상태
  const [details, setDetails] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 주소 → 좌표
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  // 필터 선택 상태
  const [selectedFilters, setSelectedFilters] = useState<Record<TabLabel, string[]>>(emptyFilters);

  // 최초 로드: 상세 조회
  useEffect(() => {
    if (!placeId) return;
    (async () => {
      setLoading(true);
      setError(null);
      console.log("[edit] fetch details for placeId:", placeId);
      const res = await getPlaceDetails(placeId);
      console.log("[edit] details result:", res);
      if (!res) {
        setError("공간 상세 정보를 불러오지 못했습니다.");
        setLoading(false);
        return;
      }

      setDetails(res);

      // (변경) 라우터 state가 '실제로 선택값이 있을 때만' 사용
      const fromState = location.state?.selectedFilters;
      const hasAny =
        !!fromState &&
        Object.values(fromState).some((arr) => Array.isArray(arr) && arr.length > 0);

      if (hasAny) {
        setSelectedFilters(fromState as Record<TabLabel, string[]>);
      } else {
        // 서버 응답을 UI 라벨로 변환해 초기 선택 세팅
        setSelectedFilters({
          "이용 목적": (res.purpose || []).map(toUiLabel),
          "공간 종류": res.type ? [toUiLabel(res.type)] : [],
          분위기: (res.mood || []).map(toUiLabel),
          부가시설: (res.facilities || []).map(toUiLabel),
          지역: (res.location || []).map(toUiLabel),
        });
      }

      setLoading(false);
    })();
  }, [placeId]);

  // 카카오 services 로드 + 주소 지오코딩 → 좌표 계산
  useEffect(() => {
    const loadKakao = () =>
      new Promise<void>((resolve) => {
        if (window.kakao?.maps) return resolve();
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
        script.async = true;
        script.onload = () => window.kakao.maps.load(() => resolve());
        document.head.appendChild(script);
      });

    let cancelled = false;

    (async () => {
      const address =
        details?.locationInfo ||
        location.state?.space?.locationInfo ||
        location.state?.space?.address ||
        "";

      if (!address) {
        setCoords(null);
        return;
      }

      await loadKakao();
      if (cancelled) return;

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (results: any[], status: any) => {
        if (cancelled) return;
        if (status === window.kakao.maps.services.Status.OK && results[0]) {
          const { x, y } = results[0];
          setCoords({ lat: parseFloat(y), lng: parseFloat(x) });
        } else {
          setCoords(null);
        }
      });
    })();

    return () => { cancelled = true; };
  }, [details?.locationInfo, location.state?.space]);

  const toggleFilter = (category: TabLabel, label: string) => {
    setSelectedFilters((prev) => {
      const has = prev[category]?.includes(label);
      const next = has
        ? prev[category].filter((v) => v !== label)
        : [...(prev[category] || []), label];
      return { ...prev, [category]: next };
    });
  };

  const sections = [
    { title: "이용 목적" as TabLabel, labels: ["개인공부", "그룹공부", "휴식", "노트북 작업", "집중공부"] },
    { title: "공간 종류" as TabLabel, labels: ["도서관", "카페", "민간학습공간", "공공학습공간", "교내학습공간"] },
    { title: "분위기" as TabLabel, labels: ["넓은", "아늑한", "깔끔한", "조용한", "음악이 나오는", "이야기를 나눌 수 있는"] },
    { title: "부가시설" as TabLabel, labels: ["Wi-Fi", "콘센트", "넓은 좌석", "음료"] },
    { title: "지역" as TabLabel, labels: ["강남권", "강북권", "도심권", "서남권", "서북권", "동남권", "성동·광진권"] },
  ];

  // (변경) spaceInfo: 서버 키 + 호환 키 + 좌표/별칭까지 모두 제공
  const spaceInfo = useMemo(() => {
    const base = location.state?.space || {};

    const name    = details?.name ?? location.state?.placeName ?? base.name ?? "공간명";
    const address = details?.locationInfo ?? base.locationInfo ?? base.address ?? "";
    const tel     = details?.phoneNumber ?? base.phoneNumber ?? base.tel ?? "";

    // ★ 영업시간은 줄바꿈 포함 텍스트 + 리스트 둘 다 제공
    const { text: hoursText, list: hoursList } =
      normalizeHours(details?.openingHours ?? base.openingHours ?? base.hours);

    // ★ 지도를 정확히 찍기 위해 좌표도 함께 전달
    const lat = coords?.lat;
    const lng = coords?.lng;

    return {
      ...base,
      name,

      // 서버 원본 키
      locationInfo: address,
      openingHours: hoursText,
      phoneNumber: tel,

      // ★ SpaceInfoSimple이 볼 수 있는 호환 키
      address,            // 주소
      hours: hoursText,   // 영업시간(문자열)
      hoursList,          // 영업시간(배열)
      tel,                // 전화번호

      // ★ 지도 정확도 향상용 좌표
      lat,
      lng,
      kakaoPosition: lat && lng ? { lat, lng } : undefined,

      // ★ 혹시 내부 구현이 다른 키를 볼 수도 있으니 별칭까지 넉넉히
      businessHours: hoursText,
      openHours: hoursText,
      roadAddressName: address,
      roadAddress: address,
      jibunAddress: address,
      placeAddress: address,
    } as any;
  }, [details, coords, location.state?.space, location.state?.placeName]);

  const handleConfirm = async () => {
    if (!placeId) return;
    if (!details) {
      setError("상세 정보를 불러오지 못해 수정할 수 없습니다.");
      return;
    }

    setSubmitting(true);
    setError(null);

    // 선택값 → 서버 DTO로 매핑 (라벨 정규화)
    const dto = {
      locationInfo: details.locationInfo ?? "",
      openingHours: details.openingHours ?? "",
      phoneNumber: details.phoneNumber ?? "",
      purposeList: (selectedFilters["이용 목적"] || []).map(toServerLabel),
      type: (selectedFilters["공간 종류"]?.[0] ? toServerLabel(selectedFilters["공간 종류"][0]) : (details.type || "")),
      moodList: (selectedFilters["분위기"] || []).map(toServerLabel),
      facilityList: (selectedFilters["부가시설"] || []).map(toServerLabel),
      locationList: (selectedFilters["지역"] || []).map(toServerLabel),
    };

    const ok = await updatePlace(placeId, dto);
    setSubmitting(false);

    if (!ok) {
      setError("수정에 실패했습니다. 다시 시도해 주세요.");
      return;
    }

    // 성공 시 목록 페이지로 복귀 (또는 토스트 후 머물기)
    navigate("/admin/search-space", {
      state: { placeName: spaceInfo.name },
    });

  };

  return (
    <div className="relative min-h-screen bg-white">
      <TopHeader title="등록 공간 수정" />

      {/* 안내 문구 */}
      <p className="absolute w-[165px] h-[28px] top-[66px] left-[105px] opacity-100 text-md text-black">
        공간 정보를 수정해주세요.
      </p>

      {/* 로딩/에러 */}
      {loading && (
        <div className="px-4 pt-20 text-sm text-gray-500">상세 정보 불러오는 중…</div>
      )}
      {error && (
        <div className="px-4 pt-20 text-sm text-red-500">{error}</div>
      )}

      {!loading && (
        <div className="w-full px-[15px] pt-[64px] flex flex-col gap-[34px]">
          {/* 정보 영역 */}
          <div className="w-[344px] flex flex-col gap-[10px]">
            <h2 className="text-xl font-bold">{spaceInfo.name ?? placeNameFromState}</h2>
            <div className="border border-gray-300 bg-white rounded-lg p-4">
              <SpaceInfoSimple
                key={`${spaceInfo.name}|${spaceInfo.address}|${spaceInfo.hours}|${spaceInfo.tel}|${spaceInfo.lat}|${spaceInfo.lng}`}
                space={spaceInfo}
              />
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
      )}

      {/* 하단 등록 버튼 */}
      <div className="w-full px-4 mt-[14px] mb-[20px]">
        <button
          onClick={handleConfirm}
          disabled={submitting || loading}
          className={`w-[320px] h-[46px] rounded-[5px] text-sm mx-auto block ${
            submitting || loading ? "bg-gray-300 text-white" : "bg-[#4cb1f1] text-white"
          }`}
        >
          {submitting ? "수정 중…" : "수정하기"}
        </button>
      </div>
    </div>
  );
};

export default AdminEditSpacePage;
