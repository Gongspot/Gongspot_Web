// src/components/review/ReviewTimeWheelPicker.tsx
import React from "react";
import { TimePicker } from "react-ios-time-picker";

interface Props {
  value: string; // "01:00" 혹은 "01:00 AM" 등
  onChange: (val: string) => void;
}

const ReviewTimeWheelPicker: React.FC<Props> = ({ value, onChange }) => (
  <div className="flex justify-center items-center w-full min-h-[180px] bg-white py-4">
    <TimePicker
      value={value}
      onChange={onChange}
      use12Hours={true} // AM/PM (false면 24시간제)
      cellHeight={36}
      saveButtonText="입력"
      cancelButtonText="취소"
      popupClassName="z-40" // 필요에 따라 z-index 조절
    />
  </div>
);

export default ReviewTimeWheelPicker;
