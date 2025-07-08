// src/constants/hotSpaces.ts

import dummySpaces from "./dummySpaces";

// 평점 높은 순 6개 (필요하면 갯수나 정렬 기준 바꿔도 됨)
const hotSpaces = [...dummySpaces]
  .sort((a, b) => b.reviewStats.score - a.reviewStats.score)
  .slice(0, 6);

export default hotSpaces;
