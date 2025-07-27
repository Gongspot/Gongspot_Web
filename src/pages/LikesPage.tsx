import { useMemo, useState } from "react";
import TopHeader from "../components/TopHeader";
import FilterSelect from "../components/likes/FilterSelect";
import SpaceSection from "../components/likes/SpaceSection";

const filters = ['전체', '무료', '유료'];
const image = "https://images.unsplash.com/photo-1650338031221-ba71d1178d43?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const spaceData = [
  { id: 1, name: "서울청년센터 희망점", image: image, tag: "공공학습공간", rating: 4.8, isLiked: true, isFree: "무료" },
  { id: 2, name: "비담 도서관", image: image, tag: "도서관", rating: 4.5, isLiked: false, isFree: "유료" },
  { id: 3, name: "서울청년센터 구로점", image: image, tag: "공공학습공간", rating: 4.7, isLiked: true, isFree: "무료" },
  { id: 4, name: "성북구립도서관", image: image, tag: "도서관", rating: 4.6, isLiked: false, isFree: "유료" },
  { id: 5, name: "마포 열린카페", image: image, tag: "카페", rating: 4.6, isLiked: false, isFree: "유료" },
];

const LikesPage = () => {
  const [selected, setSelected] = useState<string>('전체');

  const filteredSpaces = useMemo(() => {
      if (selected === "전체") return spaceData;
      return spaceData.filter((space) => space.isFree === selected);
    }, [selected]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#EFF7FB]">
      <TopHeader title="찜한 공간" backButton={false} />
      <div className="flex flex-col items-start mx-[1.25rem] mt-[1rem] mb-[0.625rem] gap-y-[0.625rem]">
        <div className="flex gap-x-[0.5rem]">
          {filters.map((filter) => (
            <FilterSelect
              key={filter}
              text={filter}
              selected={selected === filter}
              onClick={() => setSelected(filter)}
            />
          ))}
        </div>
        <p className="text-[0.813rem]">
          총 {filteredSpaces.length}개
        </p>
        <SpaceSection spaces={filteredSpaces} />
      </div>
    </div>
  );
};
export default LikesPage;