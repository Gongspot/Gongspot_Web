import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
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
        <span className={value ? "text-gray-800" : "text-gray-400"}>
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
            locale="ko"
            modifiersClassNames={{
              selected: "custom-selected",
              today: "custom-today",
            }}
            // 네비게이션 아이콘 커스텀
            components={{
              IconLeft: () => (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path d="M15 6l-6 6 6 6" stroke={SKY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              IconRight: () => (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path d="M9 6l6 6-6 6" stroke={SKY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            }}
          />
          <style>{`
            /* DayPicker 기본 네비 아이콘 완전 숨김 */
            .rdp-nav_icon > svg { display: none !important; }
            .rdp-nav_button > svg:not([stroke="#4CB1F1"]) { display: none !important; }
            /* 선택된 날짜(동그라미) */
            .custom-selected, .custom-selected:focus, .custom-selected:hover,
            .rdp-day_selected, .rdp-day_selected:focus, .rdp-day_selected:hover {
              background: ${SKY} !important;
              color: #fff !important;
              border-radius: 9999px;
            }
            /* 오늘 날짜(테두리) */
            .custom-today:not(.custom-selected):not(.rdp-day_selected) {
              color: ${SKY} !important;
              background: #fff !important;
            }
            /* 네비게이션(좌우) 버튼 색상 (혹시 모르니 한번 더) */
            .rdp-nav_button, .rdp-nav_button svg, .rdp-nav_button path {
              color: ${SKY} !important;
              stroke: ${SKY} !important;
              fill: none !important;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default ReviewDatePicker;
