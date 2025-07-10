// src/components/review/ReviewTimeWheelPicker.tsx
import React from "react";
import Picker from "react-mobile-picker";

interface Props {
  ampm: "오전" | "오후";
  setAmpm: (ampm: "오전" | "오후") => void;
  hour: string;
  setHour: (hour: string) => void;
  minute: string;
  setMinute: (minute: string) => void;
}

const hourList = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minuteList = [
  "00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"
];

const ReviewTimeWheelPicker: React.FC<Props> = ({
  ampm, setAmpm, hour, setHour, minute, setMinute
}) => {
  // Picker에서 요구하는 props: optionGroups, valueGroups
  const optionGroups = {
    ampm: ["오전", "오후"],
    hour: hourList,
    minute: minuteList
  };

  const valueGroups = {
    ampm,
    hour,
    minute
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={(name, value) => {
          if (name === "ampm" && (value === "오전" || value === "오후")) setAmpm(value);
          if (name === "hour") setHour(value);
          if (name === "minute") setMinute(value);
        }}
        height={150}
        itemHeight={36}
      />
    </div>
  );
};

export default ReviewTimeWheelPicker;
