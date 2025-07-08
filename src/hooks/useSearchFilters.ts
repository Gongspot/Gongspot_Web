import { useRef, useState } from "react";

export type TabLabel = "이용 목적" | "공간 종류" | "분위기" | "부가시설" | "지역";

export const useSearchFilters = () => {
  // 바텀시트 열림 상태
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const dragYRef = useRef<number | null>(null);

  // 필터 선택 상태
  const initialSelectedFilters: Record<TabLabel, string[]> = {
    "이용 목적": [],
    "공간 종류": [],
    분위기: [],
    부가시설: [],
    지역: [],
  };

  const [selectedFilters, setSelectedFilters] = useState<Record<TabLabel, string[]>>(initialSelectedFilters);

  const toggleFilter = (category: TabLabel, label: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category];
      const isSelected = current.includes(label);

      return {
        ...prev,
        [category]: isSelected
          ? current.filter((item) => item !== label)
          : [...current, label],
      };
    });
  };

  // 드래그 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    dragYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragYRef.current === null || !sheetRef.current) return;

    const deltaY = e.touches[0].clientY - dragYRef.current;

    if (isSheetOpen && deltaY > 0) {
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }

    if (!isSheetOpen && deltaY < 0) {
      sheetRef.current.style.transform = `translateY(calc(83% + ${deltaY}px))`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragYRef.current === null || !sheetRef.current) return;

    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - dragYRef.current;

    if (isSheetOpen && deltaY > 100) {
      setIsSheetOpen(false);
    }

    if (!isSheetOpen && deltaY < -100) {
      setIsSheetOpen(true);
    }

    sheetRef.current.style.transform = "";
    dragYRef.current = null;
  };

  // 각 필터 섹션 ref
  const refs = {
    purposeRef: useRef<HTMLDivElement>(null),
    typeRef: useRef<HTMLDivElement>(null),
    moodRef: useRef<HTMLDivElement>(null),
    facilityRef: useRef<HTMLDivElement>(null),
    areaRef: useRef<HTMLDivElement>(null),
  };

  return {
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
    ...refs,
  };
};
