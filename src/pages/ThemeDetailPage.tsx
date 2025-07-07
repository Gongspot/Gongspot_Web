import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { themeSpaces } from "../constants/spaceThemes";
import dummySpaces from "../constants/dummySpaces";
import SpaceListCard from "../components/space/SpaceListCard";
import TopHeader from "../components/TopHeader";

const ThemeDetailPage: React.FC = () => {
  const { themeTitle } = useParams<{ themeTitle: string }>();
  const navigate = useNavigate();

  // themeSpaces에서 해당 테마 정보 찾기
  const theme = themeSpaces.find(t => t.title === themeTitle) || themeSpaces[0];

  const [spaces, setSpaces] = useState(dummySpaces);

  // 테마별 태그로 공간 필터
  const filterTag = `#${theme.title}`;
  const filteredSpaces = spaces.filter(space =>
    space.tags.includes(filterTag)
  );

  // 좋아요 토글 핸들러
  const handleLike = (id: number) => {
    setSpaces(prev =>
      prev.map(space =>
        space.id === id ? { ...space, isLiked: !space.isLiked } : space
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col">
      <TopHeader title={theme.title} />

      {/* 상단 - 대표 이미지/오버레이 */}
      <div className="px-4 pt-14 pb-4 bg-white h-96">
        {/* 테마 이미지 */}
        <div className="rounded-2xl overflow-hidden mb-3 relative" style={{ height: 180 }}>
          <img
            src={theme.image}
            alt={theme.title}
            className="w-full h-full object-cover"
          />
          {/* 그라데이션 */}
          <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
          {/* 타이틀/설명 */}
          <div className="absolute left-4 bottom-5 z-10 text-white">
            <div className="font-bold text-xl mb-1">{theme.title}</div>
            <div className="text-[14px] font-medium opacity-90">{theme.subtitle}</div>
          </div>
        </div>
        <div className="text-[14px] mb-2 mt-8">
          정부와 지자체에서 지원해주는 다양한 공공학습공간<br />
          스터디카페 형태, 카페·학원식 관리제<br />
          비용 부담 없이 즐겨보자!
        </div>
      </div>
      

      {/* 하단 리스트 (고정, 스크롤) */}
      <div className="flex-1 bg-[#F7F9FB] rounded-t-2xl -mt-4 pt-4 px-4 flex flex-col">
        <div className="font-semibold text-gray-700 mb-2 ">
          {theme.title} 공간 살펴보기
        </div>
        <div className="overflow-y-auto flex-1" style={{ maxHeight: "370px" }}>
          {filteredSpaces.length === 0 ? (
            <div className="text-gray-400 text-sm py-10 text-center">
              해당 테마의 공간이 없습니다.
            </div>
          ) : (
            filteredSpaces.map(space => (
              <SpaceListCard
                key={space.id}
                name={space.name}
                image={space.image}
                rating={space.rating}
                distance={space.distance}
                tags={space.tags}
                isLiked={space.isLiked}
                onDetail={() => navigate(`/space/${space.id}`)}
                onLike={() => handleLike(space.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeDetailPage;
