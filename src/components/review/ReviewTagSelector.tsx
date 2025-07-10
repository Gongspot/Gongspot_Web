const tags = ["넓은", "아늑한", "깔끔한", "조용한", "음악이 나오는", "이야기를 나눌 수 있는"];
const facilities = ["Wi-Fi", "콘센트", "넓은 좌석", "음료"];

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
  // 중복선택 토글
  const toggle = (v: string, arr: string[], setArr: (v: string[]) => void) =>
    setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  return (
    <div className="mb-4">
      <div className="font-semibold mb-1">방문하신 목적을 알려주세요!</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {["개인공부","그룹공부","노트북 작업","휴식","집중 공부"].map(label => (
          <button
            key={label}
            type="button"
            className={`px-3 py-1 rounded-full border ${
              selectedTags.includes(label) ? "bg-blue-100 border-blue-300" : "bg-white border-gray-200"
            }`}
            onClick={() => toggle(label, selectedTags, setSelectedTags)}
          >{label}</button>
        ))}
      </div>
      <div className="font-bold text-xs mt-1 mb-1">분위기</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <button
            key={tag}
            type="button"
            className={`px-3 py-1 rounded-full border ${
              selectedTags.includes(tag) ? "bg-blue-100 border-blue-300" : "bg-white border-gray-200"
            }`}
            onClick={() => toggle(tag, selectedTags, setSelectedTags)}
          >{tag}</button>
        ))}
      </div>
      <div className="font-bold text-xs mb-1">부가시설</div>
      <div className="flex flex-wrap gap-2">
        {facilities.map(facility => (
          <button
            key={facility}
            type="button"
            className={`px-3 py-1 rounded-full border ${
              selectedFacilities.includes(facility) ? "bg-blue-100 border-blue-300" : "bg-white border-gray-200"
            }`}
            onClick={() => toggle(facility, selectedFacilities, setSelectedFacilities)}
          >{facility}</button>
        ))}
      </div>
    </div>
  );
};

export default ReviewTagSelector;
