import { useEffect, useState, useRef } from "react";
import TopHeader from "../components/TopHeader";
import SearchControls from "../components/mapsearch/SearchControls";
import BottomSheet from "../components/mapsearch/BottomSheet";
import SearchMode from "../components/mapsearch/SearchMode";
import { useSearchFilters } from "../hooks/useSearchFilters";
import KakaoMap from "../components/mapsearch/KakaoMap";
import SearchResultSheet from "../components/mapsearch/SearchResultSheet";
import { useSearchMode } from "../contexts/SearchModeContext";
import type { Space } from "../types/space";
import PlaceSelectSheet from "../components/mapsearch/PlaceSelectSheet";
import { searchPlaces } from "../apis/placeSearch";

const SearchPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
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
    setPaidFilter(null); // 유료/무료 필터 초기화
  };

  const handleRecentClick = (keyword: string) => {
    setSearchInput(keyword);                 // 검색창에 키워드 반영
    setIsSearchResultSheetOpen(true);       // 검색 결과 시트 열기
  };

  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("현위치 정보를 가져오지 못했습니다:", error);
        }
      );
    } else {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  }, []);

  const mapRef = useRef<{ recenterToCurrentLocation: () => void }>(null);

  // 검색 결과 상태 정의
  const [searchResults, setSearchResults] = useState<Space[]>([]);

  // const fetchSearchResults = async () => {
  //   const raw = await searchPlaces({
  //     keyword: searchInput.trim(),
  //     purpose: selectedFilters["이용 목적"]?.[0],
  //     type: selectedFilters["공간 종류"]?.[0],
  //     mood: selectedFilters["분위기"]?.[0],
  //     facilities: selectedFilters["부가시설"]?.[0],
  //     location: selectedFilters["지역"]?.[0],
  //     page: 0,
  //   });

  //   console.log("📦 API 원본 응답값:", raw);

  //   const placeList = await searchPlaces({
  //     keyword: searchInput.trim(),
  //     purpose: selectedFilters["이용 목적"]?.[0],
  //     type: selectedFilters["공간 종류"]?.[0],
  //     mood: selectedFilters["분위기"]?.[0],
  //     facilities: selectedFilters["부가시설"]?.[0],
  //     location: selectedFilters["지역"]?.[0],
  //     page: 0,
  //   });

  //   const converted: Space[] = placeList.map((item) => ({
  //     id: item.placeId,
  //     name: item.name,
  //     rating: item.rating,
  //     image: item.imageUrl,
  //     tags: Array.isArray(item.hashtag) ? item.hashtag : [item.hashtag],
  //     isLiked: item.isLike,
  //     distance: 0,
  //   }));

  //   setSearchResults(converted);
  // };

  // 테스트
  const fetchSearchResults = async () => {
    const keywordOnly = searchInput.trim();

    console.log("🧪 keywordOnly 테스트:", keywordOnly);

    const placeList = await searchPlaces({
      keyword: keywordOnly,
      page: 0,
    });

    console.log("📦 API 응답 placeList:", placeList);

    const converted: Space[] = placeList.map((item) => ({
      id: item.placeId,
      name: item.name,
      rating: item.rating,
      image: item.imageUrl,
      tags: Array.isArray(item.hashtag) ? item.hashtag : [item.hashtag],
      isLiked: item.isLike,
      distance: 0, // 기본값
    }));

    console.log("🧩 변환된 데이터:", converted);

    setSearchResults(converted);
  };

  useEffect(() => {
    console.log("🔍 변환된 검색결과:", searchResults);
  }, [searchResults]);


  return (
    <div className="w-full h-screen bg-gray-200">
      {/* 상단 헤더 */}
      <TopHeader title="공간 검색" backButton={false} />

      {/* 지도 + 검색창 */}
      <div className="absolute top-10 left-0 right-0 bottom-0 bg-gray-200">
        <KakaoMap
          ref={mapRef}
          currentLocation={currentLocation}
          resetToInitialState={resetToInitialState}
        />

        {/* 검색창은 항상 렌더링 */}
        <SearchMode
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          openSearchResultSheet={() => {
            fetchSearchResults(); // 이미 SearchPage에 있는 함수
            setIsSearchResultSheetOpen(true);
          }}
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
              onClick={() => {
                setIsSheetOpen(false); // 필터 바텀시트 닫기
                setIsSearchResultSheetOpen(true); // 검색 결과 바텀시트 열기
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
        searchResults={searchResults}
      />

      {isPlaceSelectSheetOpen && selectedSpace && (
        <PlaceSelectSheet
          space={selectedSpace}
          isOpen={isPlaceSelectSheetOpen}
          setIsOpen={setIsPlaceSelectSheetOpen}
          onDetail={() => alert(`${selectedSpace.name} 상세 보기`)}
          onLike={() => alert(`${selectedSpace.name} 좋아요 토글`)}
        />
      )}
    </div>
  );
};

export default SearchPage;