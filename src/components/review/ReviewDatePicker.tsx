// src/components/review/ReviewDatePicker.tsx
import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const ReviewDatePicker: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="w-full border rounded px-3 py-2 text-left flex justify-between items-center bg-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        {value ? value.toLocaleDateString("ko-KR") : "날짜 선택하기"}
        <span className="text-gray-400">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="absolute left-0 z-20 bg-white rounded-lg shadow border mt-2 p-4">
          <DayPicker
            mode="single"
            selected={value ?? undefined}
            onSelect={(date) => {
              onChange(date ?? null);
              setOpen(false);
            }}
            locale="ko"
            modifiersClassNames={{
              selected: "bg-sky-400 text-white rounded-full",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewDatePicker;
