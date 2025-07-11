// src/components/review/ReviewCongestionInput.tsx
import React from "react";

const icons = [
  // "높음"
  (selected: boolean) => (
    <svg width={32} height={32} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="15" fill={selected ? "#38BDF8" : "#E5E7EB"} />
      <circle cx="13" cy="15" r="2" fill={selected ? "#fff" : "#9CA3AF"} />
      <circle cx="23" cy="15" r="2" fill={selected ? "#fff" : "#9CA3AF"} />
      <path d="M24 24c-2-2-8-2-10 0" stroke={selected ? "#fff" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  // "보통"
  (selected: boolean) => (
    <svg width={32} height={32} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="15" fill={selected ? "#38BDF8" : "#E5E7EB"} />
      <circle cx="13" cy="15" r="2" fill={selected ? "#fff" : "#9CA3AF"} />
      <circle cx="23" cy="15" r="2" fill={selected ? "#fff" : "#9CA3AF"} />
      <rect x="12" y="24" width="12" height="2" rx="1" fill={selected ? "#fff" : "#9CA3AF"} />
    </svg>
  ),
  // "낮음"
  (selected: boolean) => (
    <svg width={32} height={32} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="15" fill={selected ? "#38BDF8" : "#E5E7EB"} />
      <circle cx="13" cy="15" r="2" fill={selected ? "#fff" : "#9CA3AF"} />
      <circle cx="23" cy="15" r="2" fill={selected ? "#fff" : "#9CA3AF"} />
      <path d="M14 24c2 2 6 2 8 0" stroke={selected ? "#fff" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
];

const labels = ["높음", "보통", "낮음"];

const ReviewCongestionInput = ({
  congestion,
  setCongestion,
}: {
  congestion: string;
  setCongestion: (s: string) => void;
}) => (
  <div className="mb-4">
    <div className="font-semibold mb-1">혼잡도는 어땠나요?</div>
    <div className="flex gap-2">
      {labels.map((label, i) => {
        const selected = congestion === label;
        return (
          <button
            key={label}
            type="button"
            className={`
              flex flex-col items-center px-5 py-3 rounded-xl border transition
              border-solid
              ${selected ? "border-sky-400" : "border-gray-200"}
            `}
            onClick={() => setCongestion(label)}
            style={{
              outline: selected ? "none" : undefined,
            }}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              {icons[i](selected)}
            </div>
            <span className={`text-base mt-1 ${selected ? "text-sky-500 font-bold" : "text-gray-400"}`}>{label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

export default ReviewCongestionInput;
