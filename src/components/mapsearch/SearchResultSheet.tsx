// src/components/mapsearch/SearchResultSheet.tsx
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpaceListCard from "../space/SpaceListCard";
import type { PlaceItem } from "../../apis/placeSearch";
import type { TabLabel } from "../../hooks/useSearchFilters";
import TabButtons from "./TabButtons";
import type { Space } from "../../types/space";
import { useLikeSpace } from "../../hooks/useLikeSpace";

const CACHE_KEY_RESULTS = "searchResultsCache:v1";
const CACHE_KEY_SCROLL = "searchResultsScrollTop:v1";
const CACHE_KEY_RESET = "searchResultsResetAt:v1";

interface SearchResultSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  height: string;
  setHeight: (height: string) => void;
  selectedFilters: Record<TabLabel, string[]>;
  setSelectedSpace: (space: Space) => void;
  setIsPlaceSelectSheetOpen: (open: boolean) => void;
  places: PlaceItem[];
}

const SearchResultSheet: React.FC<SearchResultSheetProps> = ({
  isOpen,
  setIsOpen,
  height,
  setHeight,
  selectedFilters,
  setSelectedSpace,
  setIsPlaceSelectSheetOpen,
  places,
}) => {
  const navigate = useNavigate();
  const { mutate: toggleLike } = useLikeSpace();

  const [placeList, setPlaceList] = useState<PlaceItem[]>(places);

  // 목록 스크롤 컨테이너 ref
  const listRef = useRef<HTMLDivElement | null>(null);

  // 안전한 세션스토리지 헬퍼
  type ResultsCacheShape = { savedAt: number; data: PlaceItem[] };

  const saveCache = (placesData: PlaceItem[]) => {
    try {
      const payload: ResultsCacheShape = { savedAt: Date.now(), data: placesData };
      sessionStorage.setItem(CACHE_KEY_RESULTS, JSON.stringify(payload));
    } catch {}
  };

  const loadCache = (): ResultsCacheShape | null => {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY_RESULTS);
      if (!raw) return null;
      const obj = JSON.parse(raw) as ResultsCacheShape | PlaceItem[];
      // 하위호환: 과거 구조(배열)도 허용
      if (Array.isArray(obj)) return { savedAt: 0, data: obj };
      return obj as ResultsCacheShape;
    } catch {
      return null;
    }
  };


  const saveScroll = () => {
    try {
      if (listRef.current) {
        sessionStorage.setItem(CACHE_KEY_SCROLL, String(listRef.current.scrollTop));
      }
    } catch {}
  };

  const restoreScroll = () => {
    try {
      const v = sessionStorage.getItem(CACHE_KEY_SCROLL);
      if (v && listRef.current) {
        listRef.current.scrollTop = Number(v) || 0;
      }
    } catch {}
  };

  // props 변경 시 동기화: "비어 있지 않을 때만" 덮어쓰기 + 캐시 갱신
  useEffect(() => {
    if (places && places.length > 0) {
      setPlaceList(places);
      saveCache(places);
      return;
    }

    if ((!places || places.length === 0) && placeList.length === 0) {
      // 리셋 마커 확인
      let resetAt = 0;
      try {
        const ra = sessionStorage.getItem(CACHE_KEY_RESET);
        // 파일 상단에 추가: const CACHE_KEY_RESET = "searchResultsResetAt:v1";
        resetAt = ra ? Number(ra) : 0;
      } catch {}

      const cached = loadCache();
      if (cached && cached.data.length > 0) {
        // ★ 리셋 이후 저장된 캐시만 복원 (savedAt > resetAt)
        if (cached.savedAt > resetAt) {
          setPlaceList(cached.data);
        } else {
          // 리셋 이전 캐시는 버린다
          setPlaceList([]); // 명시적으로 비워 UI 오동작 방지
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);


  // placeList가 바뀔 때마다 캐시 갱신 (좋아요 토글 등 반영)
  useEffect(() => {
    if (placeList && placeList.length > 0) {
      saveCache(placeList);
    }
  }, [placeList]);

  // 시트가 열릴 때 복원
  useEffect(() => {
    if (isOpen) restoreScroll();
    // 시트가 닫힐 때는 별도 동작 없음
  }, [isOpen]);

  const handleLike = (placeId: number) => {
    setPlaceList(currentPlaces => {
      const next = currentPlaces.map(p =>
        p.placeId === placeId ? { ...p, isLike: !p.isLike } : p
      );
      saveCache(next);
      return next;
    });

    const currentPlace = placeList.find(p => p.placeId === placeId);
    if (currentPlace) {
      toggleLike({ placeId: String(placeId), isLiked: currentPlace.isLike });
    }
  };

  const goDetail = (spaceId: number) => {
    // 현재 결과 & 스크롤 위치 저장
    saveCache(placeList);
    saveScroll();
    navigate(`/space/${spaceId}`);
  };


  // ▼▼▼ toCard 함수를 수정합니다 ▼▼▼
  const toCard = (p: PlaceItem) => ({
    id: p.placeId,
    name: p.name,
    image: p.imageUrl,
    rating: p.rating ?? 0,
    distance: null,
    location: p.locationInfo || null, // locationInfo 값을 location prop으로 전달
    tags: p.hashtag ? [p.hashtag] : [],
    isLiked: !!p.isLike,
  });
  
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startYRef.current = clientY;
    startHeightRef.current = parseInt(height);

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const moveY = "touches" in moveEvent ? moveEvent.touches[0].clientY : (moveEvent as MouseEvent).clientY;
      const diffY = moveY - startYRef.current;
      const newHeight = startHeightRef.current - diffY;
      const minHeight = window.innerHeight * 0.3;
      const maxHeight = 740;
      const clampedHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);
      setHeight(`${clampedHeight}px`);
    };

    const handleEnd = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-30 transform transition-transform duration-300"
          style={{ height }}
        >
          <div
            className="select-none touch-none pt-[8px]"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            <div className="w-[30px] h-[3px] bg-gray-400 rounded-full mx-auto cursor-pointer" />
            <div className="mt-[1px] pb-0 pr-0 overflow-x-hidden" style={{ paddingLeft: "7px" }}>
              <TabButtons selectedFilters={selectedFilters} onClick={() => setIsOpen(true)} />
            </div>
            <div className="h-px bg-gray-200" />
          </div>

          <div className="h-full overflow-y-auto pb-36">
              {placeList.map((p) => {
                const space = toCard(p);
                return (
                  <SpaceListCard
                    key={space.id}
                    name={space.name}
                    image={space.image}
                    rating={space.rating}
                    distance={space.distance}
                    location={space.location} 
                    tags={space.tags}
                    isLiked={space.isLiked}
                    onDetail={() => goDetail(space.id)}
                    onLike={() => handleLike(space.id)}
                  />
                );})}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResultSheet;