import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface Props {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const SKY = "#4CB1F1";

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
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        className="w-full text-left px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm flex justify-between items-center"
        style={{ minHeight: 40 }}
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* ▼▼▼ 날짜 선택 시 텍스트 색상 변경 ▼▼▼ */}
        <span className={value ? "text-[#4CB1F1] font-semibold" : "text-gray-400"}>
          {value ? value.toLocaleDateString("ko-KR") : "날짜 선택하기"}
        </span>
        <svg width="16" height="16" className="ml-2" fill="none" viewBox="0 0 24 24">
          <path
            d={open ? "M7 14l5-5 5 5" : "M7 10l5 5 5-5"}
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 z-40 bg-white rounded-xl border border-gray-200 shadow-xl mt-1 p-4">
          <DayPicker
            mode="single"
            selected={value ?? undefined}
            onSelect={(date) => {
              onChange(date ?? null);
              setOpen(false);
            }}
            locale={ko}
            modifiersClassNames={{
              selected: "custom-selected",
              today: "custom-today",
            }}
          />
          <style>{`
            .custom-selected, .custom-selected:focus, .custom-selected:hover,
            .rdp-day_selected, .rdp-day_selected:focus, .rdp-day_selected:hover {
              background: ${SKY} !important;
              color: #fff !important;
              border-radius: 9999px;
            }
            .custom-today:not(.custom-selected):not(.rdp-day_selected) {
              color: ${SKY} !important;
              background: #fff !important;
            }
            .rdp-nav_button {
              color: ${SKY} !important;
              stroke: ${SKY} !important;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default ReviewDatePicker;