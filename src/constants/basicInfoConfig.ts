export const PLACE_OPTIONS = ["도서관", "카페", "민간 학습 공간", "교내 학습 공간", "공공 학습 공간"];
export const PURPOSE_OPTIONS = ["개인 공부", "그룹 공부", "집중 공부", "휴식", "노트북 작업"];
export const REGION_OPTIONS = ["강남권", "강북권", "도심권", "성동·광진권", "서남권", "서북권", "동남권"];

export const MAX_SELECT = 3;

export interface IState {
  places: string[];
  purposes: string[];
  regions: string[];
}

export interface IAction {
  type: "TOGGLE_SELECT";
  group: "places" | "purposes" | "regions";
  payload: string;
}

export function reducer(state: IState, action: IAction): IState {
  const { group, payload } = action;
  const selectedArr = state[group];

  if (selectedArr.includes(payload)) {
    return {
      ...state,
      [group]: selectedArr.filter((item) => item !== payload),
    };
  } else if (selectedArr.length < MAX_SELECT) {
    return {
      ...state,
      [group]: [...selectedArr, payload],
    };
  } else {
    return state;
  }
}