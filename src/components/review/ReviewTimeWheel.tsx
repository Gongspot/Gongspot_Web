import React, { useRef, useState, useEffect } from "react";

type AmpmType = "오전" | "오후" | "";

interface Props {
  ampm: AmpmType;
  setAmpm: (v: AmpmType) => void;
  hour: string;
  setHour: (v: string) => void;
  minute: string;
  setMinute: (v: string) => void;
}

const ampmList: AmpmType[] = ["", "오전", "오후"];
const hourList = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minuteList = Array.from({ length: 12 }, (_, i) =>
  (i * 5).toString().padStart(2, "0")
);

function getIndex<T>(list: T[], v: T) {
  const idx = list.indexOf(v);
  return idx === -1 ? 0 : idx;
}

const CELL_HEIGHT = 38;

const ReviewTimeWheel: React.FC<Props> = ({
  ampm,
  setAmpm,
  hour,
  setHour,
  minute,
  setMinute,
}) => {
  const [open, setOpen] = useState(false);

  const ampmRef = useRef<HTMLDivElement | null>(null);
  const hourRef = useRef<HTMLDivElement | null>(null);
  const minuteRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      ampmRef.current?.scrollTo({ top: getIndex(ampmList, ampm) * CELL_HEIGHT });
      hourRef.current?.scrollTo({ top: getIndex(hourList, hour) * CELL_HEIGHT });
      minuteRef.current?.scrollTo({ top: getIndex(minuteList, minute) * CELL_HEIGHT });
    }
  }, [open, ampm, hour, minute]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function handleScroll<T>(
    ref: React.RefObject<HTMLDivElement | null>,
    list: T[],
    setter: (v: T) => void
  ) {
    if (!ref.current) return;
    const scrollTop = ref.current.scrollTop;
    const idx = Math.round(scrollTop / CELL_HEIGHT);
    setter(list[idx]);
  }

  const valueText =
    ampm && hour && minute
      ? `${ampm} ${hour}시 ${minute}분`
      : "시간 선택하기";

  return (
    <div className="relative w-full" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm flex justify-between items-center"
        style={{ minHeight: 40 }}
      >
        <span className={ampm && hour && minute ? "text-[#4CB1F1] font-semibold" : "text-gray-400"}>
          {valueText}
        </span>
        <svg
          width="16"
          height="16"
          className="ml-2"
          fill="none"
          viewBox="0 0 24 24"
        >
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
        <div
          className="absolute left-0 right-0 bg-white rounded-xl border border-gray-200 shadow-xl z-40 py-2 animate-fade-in"
          style={{ marginTop: 8, minHeight: 240 }}
        >
          <div
            className="flex justify-center items-center px-3 pb-4 pt-2 relative"
            style={{ minHeight: 170 }}
          >
            <div
              ref={ampmRef}
              className="overflow-y-scroll snap-y snap-mandatory no-scrollbar"
              style={{
                height: CELL_HEIGHT * 5,
                scrollSnapType: "y mandatory",
                paddingTop: CELL_HEIGHT * 2,
                paddingBottom: CELL_HEIGHT * 2,
                width: 60,
              }}
              onScroll={() => handleScroll(ampmRef, ampmList, setAmpm)}
            >
              {ampmList.map((v) => (
                <div key={v} className="snap-center flex items-center justify-center select-none" style={{ height: CELL_HEIGHT, fontWeight: ampm === v ? 700 : 400, /* ▼▼▼ 글자 크기 수정 ▼▼▼ */ fontSize: ampm === v ? 16 : 14, color: ampm === v ? "#31A8F7" : "#BBB", opacity: ampm === v ? 1 : 0.5 }}>
                  {v || ""}
                </div>
              ))}
            </div>

            <div
              ref={hourRef}
              className="overflow-y-scroll snap-y snap-mandatory no-scrollbar"
              style={{ height: CELL_HEIGHT * 5, scrollSnapType: "y mandatory", paddingTop: CELL_HEIGHT * 2, paddingBottom: CELL_HEIGHT * 2, width: 44 }}
              onScroll={() => handleScroll(hourRef, hourList, setHour)}
            >
              {hourList.map((v) => (
                <div key={v} className="snap-center flex items-center justify-center select-none" style={{ height: CELL_HEIGHT, fontWeight: hour === v ? 700 : 400, /* ▼▼▼ 글자 크기 수정 ▼▼▼ */ fontSize: hour === v ? 16 : 14, color: hour === v ? "#31A8F7" : "#111", opacity: hour === v ? 1 : 0.5 }}>
                  {v}
                </div>
              ))}
            </div>

            <div
              ref={minuteRef}
              className="overflow-y-scroll snap-y snap-mandatory no-scrollbar"
              style={{ height: CELL_HEIGHT * 5, scrollSnapType: "y mandatory", paddingTop: CELL_HEIGHT * 2, paddingBottom: CELL_HEIGHT * 2, width: 44 }}
              onScroll={() => handleScroll(minuteRef, minuteList, setMinute)}
            >
              {minuteList.map((v) => (
                <div key={v} className="snap-center flex items-center justify-center select-none" style={{ height: CELL_HEIGHT, fontWeight: minute === v ? 700 : 400, /* ▼▼▼ 글자 크기 수정 ▼▼▼ */ fontSize: minute === v ? 16 : 14, color: minute === v ? "#31A8F7" : "#111", opacity: minute === v ? 1 : 0.5 }}>
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>
        {`.no-scrollbar::-webkit-scrollbar { display: none; }`}
      </style>
    </div>
  );
};

export default ReviewTimeWheel;