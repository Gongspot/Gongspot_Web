// src/constants/hotSpaces.ts

import dummySpaces from "./dummySpaces";

const hotSpaces = [...dummySpaces]
  .sort((a, b) => b.reviewStats.score - a.reviewStats.score)
  .slice(0, 6);

export default hotSpaces;
