import React from "react";
import { themeSpaces } from "../constants/spaceThemes";
import SpaceCard from "../components/SpaceCard";

const ThemeAllPage: React.FC = () => (
  <div className="min-h-screen bg-blue-50">
    <h2 className="text-lg font-semibold px-4 pt-4">테마별 학습 공간</h2>
    <div className="grid grid-cols-2 gap-4 px-4 py-4">
      {themeSpaces.map(item => (
        <SpaceCard
          key={item.id}
          image={item.image}
          title={item.title}
          className="h-36"
        />
      ))}
    </div>
  </div>
);

export default ThemeAllPage;
