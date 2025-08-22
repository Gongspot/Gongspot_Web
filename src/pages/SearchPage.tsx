import { useEffect, useState, useRef, useMemo } from "react";
import TopHeader from "../components/TopHeader";
import SearchControls from "../components/mapsearch/SearchControls";
import BottomSheet from "../components/mapsearch/BottomSheet";
import SearchMode from "../components/mapsearch/SearchMode";
import { useSearchFilters } from "../hooks/useSearchFilters";
import KakaoMap from "../components/mapsearch/KakaoMap";
import SearchResultSheet from "../components/mapsearch/SearchResultSheet";
import { useSearchMode } from "../contexts/SearchModeContext";
import PlaceSelectSheet from "../components/mapsearch/PlaceSelectSheet";
import { searchPlaces } from "../apis/placeSearch";
import type { PlaceItem } from "../apis/placeSearch";
import { useNavigate } from "react-router-dom";

const CACHE_KEY_RESULTS = "searchResultsCache:v1";
const CACHE_KEY_SCROLL = "searchResultsScrollTop:v1";
const CACHE_KEY_RESET_AT = "searchResultsResetAt:v1"; // 리셋 마커
const LAST_GEO_KEY = "lastGeo:v1";   
const PLACES_CACHE_KEY = CACHE_KEY_RESULTS;        // "searchResultsCache:v1" 재사용
const FREE_TYPES = ["도서관", "공공학습공간"];
const PAID_TYPES = ["카페", "민간학습공간", "교내학습공간"];


type ResultsCacheShape = { savedAt: number; data: PlaceItem[] };

export type SpaceLite = {
  id: number;
  name: string;
  image: string;
  rating: number;
  distance: number;
  tags: string[];
  isLiked: boolean;
};

const SearchPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const dedupeByPlaceId = (list: PlaceItem[]) => {
    const seen = new Set<number>();
    const out: PlaceItem[] = [];
    for (const p of list) {
      if (!seen.has(p.placeId)) {
        seen.add(p.placeId);
        out.push(p);
      }
    }
    return out;
  };

  const navigate = useNavigate();

  // 리셋 마커 제거 헬퍼
  const clearResetMarker = () => {
    try { sessionStorage.removeItem(CACHE_KEY_RESET_AT); } catch {}
  };

  const {
    isSearchMode,
    setIsSearchMode,
    isSearchResultSheetOpen,
    setIsSearchResultSheetOpen,
  } = useSearchMode();

  useEffect(() => {
    // 페이지 처음 진입 시 검색 모드가 false가 되도록
    setIsSearchMode(false);
  }, []);


  const {
    isSheetOpen,
    setIsSheetOpen,
    sheetRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    selectedFilters,
    setSelectedFilters,
    toggleFilter,
    initialSelectedFilters,
    purposeRef,
    typeRef,
    moodRef,
    facilityRef,
    areaRef,
  } = useSearchFilters();

  const [paidFilter, setPaidFilter] = useState<"무료" | "유료" | null>(null);

  const togglePaidFilter = (label: "무료" | "유료") => {
    setPaidFilter((prev) => (prev === label ? null : label));
  };

  const [sheetHeight, setSheetHeight] = useState("50vh");

  const enterSearchMode = () => {
    setIsSearchMode(true);
  };

  const exitSearchMode = () => {
    setIsSearchMode(false);
  };

  // 검색어 유지
  const [searchInput, setSearchInput] = useState(""); 

  // 선택된 공간 및 시트 열림 여부
  const [selectedSpace, setSelectedSpace] = useState<SpaceLite | null>(null);
  const [isPlaceSelectSheetOpen, setIsPlaceSelectSheetOpen] = useState(false);

  useEffect(() => {
    if (isPlaceSelectSheetOpen) {
      setSearchInput(""); // 시트가 열릴 때 검색어 초기화
    }
  }, [isPlaceSelectSheetOpen]);

  // 초기 상태로 리셋하는 함수: 지도 클릭 시 실행됨
  const resetToInitialState = () => {
    setIsSearchMode(false);
    setIsSearchResultSheetOpen(false);
    setSelectedFilters(initialSelectedFilters);
    setSearchInput(""); // 검색어도 초기화
    setIsPlaceSelectSheetOpen(false);     // 장소 선택 시트 닫기
    setSelectedSpace(null);               // 선택된 공간 초기화
    setPaidFilter(null);                  // 유료/무료 필터 초기화

    // ★★ 중요: 검색 결과/스크롤 캐시 삭제 + 실제 결과 상태도 비우기
    try {
      sessionStorage.removeItem(CACHE_KEY_RESULTS);
      sessionStorage.removeItem(CACHE_KEY_SCROLL);
      sessionStorage.setItem(CACHE_KEY_RESET_AT, String(Date.now())); // ★ 리셋 시각 기록
    } catch {}
    setPlaces([]);                        // 리스트 상태도 비워서 UI 즉시 리셋
  };

  const handleRecentClick = (keyword: string) => {
    setSearchInput(keyword);
    void runSearch(keyword);
  };

  // 최근 위치를 초기값으로 사용 (새로고침 직후에도 곧바로 센터 맞춤)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(() => {
    try {
      const raw = sessionStorage.getItem(LAST_GEO_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.lat === "number" && typeof parsed?.lng === "number") {
          return parsed;
        }
      }
    } catch {}
    return null;
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
      return;
    }
    let cancelled = false;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (cancelled) return;
        const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
        setCurrentLocation(loc);
        try { sessionStorage.setItem(LAST_GEO_KEY, JSON.stringify(loc)); } catch {}
      },
      (error) => {
        console.error("현위치 정보를 가져오지 못했습니다:", error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
    return () => { cancelled = true; };
  }, []);
  
  const mapRef = useRef<{ recenterToCurrentLocation: () => void }>(null);

  const [places, setPlaces] = useState<PlaceItem[]>([]);

  // 최초 1회만 현재 위치로 센터 이동
  const didCenterRef = useRef(false);
  useEffect(() => {
    if (!didCenterRef.current && currentLocation) {
      // KakaoMap이 렌더/마운트된 뒤에 호출되도록 살짝 늦춥니다.
      setTimeout(() => mapRef.current?.recenterToCurrentLocation(), 0);
      didCenterRef.current = true;
    }
  }, [currentLocation]);

  useEffect(() => {
    const onPopState = () => {
      // PlaceSelectSheet가 열려있는 상태에서 뒤로가기를 누르면,
      // PlaceSelectSheet 닫고 SearchResultSheet를 연다.
      if (isPlaceSelectSheetOpen) {
        setIsPlaceSelectSheetOpen(false);
        setIsSearchResultSheetOpen(true);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [isPlaceSelectSheetOpen, setIsPlaceSelectSheetOpen, setIsSearchResultSheetOpen]);

  const savePlacesCache = (list: PlaceItem[]) => {
    try {
      const payload: ResultsCacheShape = { savedAt: Date.now(), data: list };
      sessionStorage.setItem(PLACES_CACHE_KEY, JSON.stringify(payload));
    } catch {}
  };

  const loadPlacesCache = (): PlaceItem[] => {
    try {
      const raw = sessionStorage.getItem(PLACES_CACHE_KEY);
      if (!raw) return [];
      const obj = JSON.parse(raw);
      // 호환: {data:[]} 또는 {list:[]} 또는 [] 셋 다 허용
      if (Array.isArray(obj)) return obj;
      if (Array.isArray(obj?.data)) return obj.data;
      if (Array.isArray(obj?.list)) return obj.list;
      return [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    if (places.length) savePlacesCache(places);
  }, [places]);

  useEffect(() => {
    // 사용자가 지도 탭으로 리셋했다면 복원하지 않음
    //let resetAt = 0;
    //try { resetAt = Number(sessionStorage.getItem(CACHE_KEY_RESET_AT) || "0"); } catch {}

    const cached = loadPlacesCache();
    if (cached.length > 0) {
      setPlaces(cached);                    // 지도 마커에 필요한 부모 places 복원
      setIsSearchResultSheetOpen(true);     // 결과 시트도 같이 열어 UX 유지
    }
  }, []);

  // 무료 판정(타입 정규화 + 이름/태그 보조 판정)
  const normalize = (v?: string) =>
    String(v ?? "").replace(/\s+/g, "").toLowerCase();

  const FREE_KEYS = ["도서관", "공공학습공간", "library", "publicstudyspace"].map(normalize);

  const getPlaceTypeRaw = (p: PlaceItem): string =>
    (p as any).type ??
    (p as any).spaceType ??
    (p as any).category ??
    (p as any).placeType ??
    "";

  const isFreePlace = (p: PlaceItem) => {
    const t = normalize(getPlaceTypeRaw(p));
    if (t) return FREE_KEYS.includes(t);

    // 타입이 없으면 이름/태그로 보조 판정
    const nameBlob = normalize((p as any).name);
    const tagBlob = normalize(
      ((p as any).hashtag ?? "") + " " + ((p as any).tags ?? []).join(" ")
    );
    return FREE_KEYS.some((k) => nameBlob.includes(k) || tagBlob.includes(k));
  };

  // paidFilter(무료/유료/null)에 따라 화면에 보일 목록
  const visiblePlaces = useMemo(() => {
    if (!paidFilter) return places;
    return places.filter((p) => (paidFilter === "무료" ? isFreePlace(p) : !isFreePlace(p)));
  }, [places, paidFilter]);

  useEffect(() => {
    if (selectedSpace && !visiblePlaces.some(p => p.placeId === selectedSpace.id)) {
      setSelectedSpace(null);
      setIsPlaceSelectSheetOpen(false);
    }
  }, [visiblePlaces, selectedSpace]);

  // 마지막으로 사용한 검색어와 필터를 기억 → paidFilter가 바뀔 때 재검색
  const lastKeywordRef = useRef<string>("");
  const hasSearchedRef = useRef(false);

  // 현재 selectedFilters에서 서버로 보낼 기본 파라미터 구성
  const buildBaseParams = (keyword: string) => ({
    keyword,
    purpose:    selectedFilters["이용 목적"]?.[0],
    type:       undefined as string | undefined, // 여긴 비워두고 아래에서 타입을 넣어줌
    mood:       selectedFilters["분위기"]?.[0],
    facilities: selectedFilters["부가시설"]?.[0],
    location:   selectedFilters["지역"]?.[0],
    page: 0,
  });

  // 사용자가 "공간 종류" 탭에서 이미 특정 타입을 골랐다면 유료/무료 타입들과 교집합만 검색
  const intersectTypes = (types: string[]) => {
    const picked = selectedFilters["공간 종류"] || [];
    if (!picked.length) return types;
    return types.filter(t => picked.includes(t));
  };

  const fetchByPaidFilter = async (keyword: string) => {
    const base = buildBaseParams(keyword);

    // 버튼 상태에 따라 검색할 타입 묶음을 정함
    let targetTypes: string[] | null = null;
    if (paidFilter === "무료") targetTypes = intersectTypes(FREE_TYPES);
    else if (paidFilter === "유료") targetTypes = intersectTypes(PAID_TYPES);

    // 타입 제한이 없으면(버튼 미선택) 1회 호출
    if (!targetTypes) {
      const one = await searchPlaces(base);
      return one;
    }

    // 교집합이 비었으면 결과 없음
    if (targetTypes.length === 0) return [];

    // 서버가 type을 하나만 받는다고 가정 → 타입별로 호출 후 합치기
    const pages = await Promise.all(
      targetTypes.map(type => searchPlaces({ ...base, type }))
    );
    return dedupeByPlaceId(pages.flat());
  };

  const runSearch = async (keyword: string) => {
    lastKeywordRef.current = keyword;
    const result = await fetchByPaidFilter(keyword);
    setPlaces(result);
    savePlacesCache(result);
    clearResetMarker();
    setIsSearchResultSheetOpen(true);
    hasSearchedRef.current = true;
  };

  useEffect(() => {
    // 최초 진입 후 아직 검색 안 했으면 건너뛰기
    if (!hasSearchedRef.current) return;
    void runSearch(lastKeywordRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paidFilter]);


  return (
    <div className="w-full h-screen bg-gray-200">
      {/* 상단 헤더 */}
      <TopHeader title="공간 검색" backButton={false} />

      {/* 지도 + 검색창 */}
      <div className="absolute top-10 left-0 right-0 bottom-0 bg-gray-200">
        <KakaoMap
          key={`${currentLocation?.lat ?? "na"}:${currentLocation?.lng ?? "na"}`}
          ref={mapRef}
          currentLocation={currentLocation}
          resetToInitialState={resetToInitialState}
          /* 지도 마커 표시용 데이터와 상태 */
          places={visiblePlaces}
          selectedPlaceId={selectedSpace?.id ?? null}
          onMarkerClick={(place /* PlaceItem */) => {
            // 카드 클릭과 동일한 동작: PlaceSelectSheet 열기 + SearchResultSheet 닫기 + 히스토리 push
            const lite = {
              id: place.placeId,
              name: place.name,
              image: place.imageUrl,
              rating: place.rating ?? 0,
              distance: 0,
              tags: place.hashtag ? [place.hashtag] : [],
              isLiked: !!place.isLike,
            };
            setSelectedSpace(lite);
            setIsSearchResultSheetOpen(false);
            setIsPlaceSelectSheetOpen(true);
            try { window.history.pushState({ placeSheet: true }, "", ""); } catch {}
          }}

          // 배경 탭 동작: 시트 열렸으면 시트 닫기, 아니면 기존 reset
          onQuickTap={() => {
            if (isPlaceSelectSheetOpen) {
              try { window.history.back(); } catch {
                setIsPlaceSelectSheetOpen(false);
                setIsSearchResultSheetOpen(true);
              }
            } else {
              resetToInitialState();
            }
          }}
        />

        {/* 검색창은 항상 렌더링 */}
        <SearchMode
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          openSearchResultSheet={() => {
            setIsSearchResultSheetOpen(true);
          }}
          performSearch={runSearch}
          isSearchMode={isSearchMode}
          isSearchResultSheetOpen={isSearchResultSheetOpen}
          enterSearchMode={enterSearchMode}
          exitSearchMode={exitSearchMode}
          resetToInitialState={resetToInitialState}
          onRecentClick={handleRecentClick}
        />

        {/* 유료/무료 버튼은 검색모드 아닐 때만 렌더링 */}
        {(!isSearchMode || isSearchResultSheetOpen) && (
          <SearchControls
            paidFilter={paidFilter}
            togglePaidFilter={togglePaidFilter}
            enterSearchMode={enterSearchMode}
            onClickCurrentLocation={() => {
              mapRef.current?.recenterToCurrentLocation();
            }}
          />
        )}

      </div>


      {/* 바텀 시트 하단 버튼 (검색 모드일 때 숨김) */}
      {isSheetOpen && !isSearchMode && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <div className="bg-white w-full px-4 py-4 border-t shadow-md flex gap-2">
            <button
              onClick={() => {
                setSelectedFilters(initialSelectedFilters);
                setIsSheetOpen(false);
              }}
              className="w-24 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 bg-white"
              style={{ borderStyle: "solid" }}
            >
              닫기
            </button>

            <button
              onClick={async () => {
                setIsSheetOpen(false); // 필터 바텀시트 닫기
                try {
                  const kw = searchInput.trim() || "";
                  await runSearch(kw);
                } catch (e) {
                  console.error("필터 검색 실패:", e);
                  // 실패 시 시트를 열지 않는 편이 안전합니다.
                }
              }}
              className="flex-1 py-2 text-sm text-white bg-[#4cb1f1] rounded-lg"
            >
              학습 공간 보기
            </button>
          </div>
        </div>
      )}

      {/* 바텀 시트 자체도 검색 모드일 땐 숨김 */}
      {!isSearchMode && (
        <BottomSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          sheetRef={sheetRef}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleTouchEnd={handleTouchEnd}
          purposeRef={purposeRef}
          typeRef={typeRef}
          moodRef={moodRef}
          facilityRef={facilityRef}
          areaRef={areaRef}
          initialSelectedFilters={initialSelectedFilters}
        />
      )}

      {/* 검색 결과 바텀 시트 */}
      <SearchResultSheet
        isOpen={isSearchResultSheetOpen}
        setIsOpen={(open) => {
          setIsSearchResultSheetOpen(open);
          if (!open) {
            exitSearchMode(); // ← 닫힐 때만 검색모드 종료
          }
        }}
        height={sheetHeight}
        setHeight={setSheetHeight}
        selectedFilters={selectedFilters}
        setSelectedSpace={setSelectedSpace}
        setIsPlaceSelectSheetOpen={setIsPlaceSelectSheetOpen}
        places={visiblePlaces}  
      />

      {isPlaceSelectSheetOpen && selectedSpace && (
        <PlaceSelectSheet
          space={selectedSpace}
          isOpen={isPlaceSelectSheetOpen}
          setIsOpen={setIsPlaceSelectSheetOpen}
          onDetail={() => {
            if (!selectedSpace) return;

            // 상세로 이동하기 직전, 검색결과 시트를 보이는 상태로 전환
            // → 상세에서 '뒤로가기' 시 곧바로 검색결과 시트가 복원됨
            setIsPlaceSelectSheetOpen(false);
            setIsSearchResultSheetOpen(true);

            // 상세 페이지로 이동
            navigate(`/space/${selectedSpace.id}`);
          }}
          onLike={() => alert(`${selectedSpace.name} 좋아요 토글`)}
          onRequestClose={() => {
            // 히스토리에 쌓은 한 단계를 되돌린다 → popstate에서 시트 상태 복구
            try { window.history.back(); } catch {
              // 백이 불가능한 환경이면 안전하게 수동 복구
              setIsPlaceSelectSheetOpen(false);
              setIsSearchResultSheetOpen(true);
            }
          }}
        />
      )}

    </div>
  );
};

export default SearchPage;