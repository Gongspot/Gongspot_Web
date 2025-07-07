import React from "react";
import { useNavigate } from "react-router-dom";
import { themeSpaces } from "../constants/spaceThemes";
import TopHeader from "../components/TopHeader";
import ThemeSpaceCard from "../components/theme/ThemeSpaceCard";

const ThemeAllPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50">
      <TopHeader title="테마별 학습 공간" />
      <div className="pt-10">
        <div className="grid grid-cols-2 gap-4 px-4 py-4">
          {themeSpaces.map((item) => (
            <ThemeSpaceCard
              key={item.id}
              image={item.image}
              title={item.title}
              className="h-48"
              onClick={() => navigate(`/theme/${item.title}`)} // 👈 이동!
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeAllPage;
