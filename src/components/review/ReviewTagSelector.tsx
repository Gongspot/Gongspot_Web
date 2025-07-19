const SELECTED_COLOR = "#4CB1F1";
const UNSELECTED_BORDER_COLOR = "#E5E5E5";

const ReviewTagSelector = ({
  selectedTags,
  setSelectedTags,
  selectedFacilities,
  setSelectedFacilities,
}: {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedFacilities: string[];
  setSelectedFacilities: (tags: string[]) => void;
}) => {
  const toggle = (v: string, arr: string[], setArr: (v: string[]) => void) =>
    setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  const categories = ["개인공부", "그룹공부", "노트북 작업", "휴식", "집중 공부"];
  const tags = ["넓은", "아늑한", "깔끔한", "조용한", "음악이 나오는", "이야기를 나눌 수 있는"];
  const facilities = ["Wi-Fi", "콘센트", "넓은 좌석", "음료"];

  const getBtnClass = (isSelected: boolean) =>
    `px-4 py-1 rounded-full border-[0.3px] text-sm font-medium transition-all duration-150 bg-white`;

  return (
    <div className="mb-4">
      <div className="font-semibold mb-1">방문하신 목적을 알려주세요!</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {categories.map(label => {
          const isSelected = selectedTags.includes(label);
          return (
            <button
              key={label}
              type="button"
              className={getBtnClass(isSelected)}
              style={{
                color: isSelected ? SELECTED_COLOR : "#868686",
                borderStyle: "solid",
                borderColor: isSelected ? SELECTED_COLOR : UNSELECTED_BORDER_COLOR,
                boxShadow: isSelected ? "0 0 0 2px #eaf6fd" : undefined,
                fontWeight: isSelected ? 600 : 400,
              }}
              onClick={() => toggle(label, selectedTags, setSelectedTags)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="font-bold text-xs mt-1 mb-1">분위기</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              className={getBtnClass(isSelected)}
              style={{
                color: isSelected ? SELECTED_COLOR : "#868686",
                borderStyle: "solid",
                borderColor: isSelected ? SELECTED_COLOR : UNSELECTED_BORDER_COLOR,
                boxShadow: isSelected ? "0 0 0 2px #eaf6fd" : undefined,
                fontWeight: isSelected ? 600 : 400,
              }}
              onClick={() => toggle(tag, selectedTags, setSelectedTags)}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <div className="font-bold text-xs mb-1">부가시설</div>
      <div className="flex flex-wrap gap-2">
        {facilities.map(facility => {
          const isSelected = selectedFacilities.includes(facility);
          return (
            <button
              key={facility}
              type="button"
              className={getBtnClass(isSelected)}
              style={{
                color: isSelected ? SELECTED_COLOR : "#868686",
                borderStyle: "solid",
                borderColor: isSelected ? SELECTED_COLOR : UNSELECTED_BORDER_COLOR,
                boxShadow: isSelected ? "0 0 0 2px #eaf6fd" : undefined,
                fontWeight: isSelected ? 600 : 400,
              }}
              onClick={() => toggle(facility, selectedFacilities, setSelectedFacilities)}
            >
              {facility}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewTagSelector;
