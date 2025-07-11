import React, { useState } from "react";
import { TimePicker } from "react-ios-time-picker";


interface Props {
  value: string;
  setValue: (v: string) => void;
}

const ReviewTimeDropdown: React.FC<Props> = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* 트리거 버튼 */}
      <button
        type="button"
        className="w-full border rounded px-3 py-2 text-left flex justify-between items-center bg-white"
        onClick={() => setOpen(true)}
      >
        {value ? value : "시간 선택하기"}
        <span className="text-gray-400">{open ? "▲" : "▼"}</span>
      </button>
      {/* 팝업 휠 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-50 flex items-end justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl w-[90vw] max-w-xs mx-auto my-8 shadow-lg p-0"
            onClick={e => e.stopPropagation()} // 팝업 내부 클릭시 닫히지 않도록
          >
            <TimePicker
              value={value || "10:00"}
              onChange={setValue}
              isOpen={true}
              use12Hours
              onSave={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              saveButtonText="입력"
              cancelButtonText="취소"
              inputClassName="hidden" // input 필드 숨김!
              popupClassName="z-[100]" // z-index 높임
              cellHeight={44}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewTimeDropdown;
