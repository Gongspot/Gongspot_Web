import React, { useRef, useState, useEffect } from "react";

interface Props {
  ampm: "오전" | "오후" | ""; // 빈 값 허용
  setAmpm: (v: "오전" | "오후") => void;
  hour: string;
  setHour: (v: string) => void;
  minute: string;
  setMinute: (v: string) => void;
}

const ampmList = ["오전", "오후"];
const hourList = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minuteList = Array.from({ length: 12 }, (_, i) =>
  (i * 5).toString().padStart(2, "0")
);

function getIndex<T>(list: T[], v: T) {
  const idx = list.indexOf(v);
  return idx === -1 ? 0 : idx;
}

const CELL_HEIGHT = 38; // 한 셀 높이(px)

const ReviewTimeWheel: React.FC<Props> = ({
  ampm,
  setAmpm,
  hour,
  setHour,
  minute,
  setMinute,
}) => {
  const [open, setOpen] = useState(false);

  // 각 컬럼의 ref
  const ampmRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  // 열릴 때, 현재 값으로 스크롤 위치 맞추기
  useEffect(() => {
    if (open) {
      if (ampm) {
        ampmRef.current?.scrollTo({
          top: getIndex(ampmList, ampm) * CELL_HEIGHT,
          behavior: "auto",
        });
      }
      if (hour) {
        hourRef.current?.scrollTo({
          top: getIndex(hourList, hour) * CELL_HEIGHT,
          behavior: "auto",
        });
      }
      if (minute) {
        minuteRef.current?.scrollTo({
          top: getIndex(minuteList, minute) * CELL_HEIGHT,
          behavior: "auto",
        });
      }
    }
  }, [open, ampm, hour, minute]);

  // 바깥 클릭 시 닫힘
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // 스크롤 이벤트로 중앙 값 자동 선택 (debounce)
  function handleScroll(
    ref: React.RefObject<HTMLDivElement>,
    list: string[],
    setter: (v: string) => void
  ) {
    if (!ref.current) return;
    const scrollTop = ref.current.scrollTop;
    const idx = Math.round(scrollTop / CELL_HEIGHT);
    setter(list[idx]);
  }

  // 표출값
  const valueText = ampm && hour && minute ? `${ampm} ${hour}시 ${minute}분` : "시간 선택하기";

  return (
    <div className="relative w-full" ref={rootRef}>
      {/* 닫힌 상태 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm flex justify-between items-center"
        style={{ minHeight: 40 }}
      >
        <span className={ampm && hour && minute ? "text-gray-800" : "text-gray-400"}>
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
            d="M7 10l5 5 5-5"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {/* 열림: 휠 피커 */}
      {open && (
        <div
          className="absolute left-0 right-0 bg-white rounded-xl border border-gray-200 shadow-xl z-40 py-2 animate-fade-in"
          style={{ marginTop: 8, minHeight: 240 }}
        >
          {/* 휠 구조 */}
          <div
            className="flex justify-center items-center px-3 pb-4 pt-2 relative"
            style={{ minHeight: 170 }}
          >
            {/* 오전/오후 */}
            <div className="flex flex-col items-center relative mb-5" style={{ width: 60 }}>
              <div
                ref={ampmRef}
                className="overflow-y-scroll no-scrollbar snap-y snap-mandatory"
                style={{
                  height: CELL_HEIGHT * 5,
                  scrollSnapType: "y mandatory",
                  paddingTop: CELL_HEIGHT * 2,
                  paddingBottom: CELL_HEIGHT * 2,
                  zIndex: 2,
                }}
                onScroll={() => handleScroll(ampmRef, ampmList, setAmpm)}
              >
                {ampmList.map((v) => (
                  <div
                    key={v}
                    className="snap-center flex items-center justify-center select-none"
                    style={{
                      height: CELL_HEIGHT,
                      fontWeight: ampm === v ? 700 : 400,
                      fontSize: ampm === v ? 18 : 16,
                      color: ampm === v ? "#31A8F7" : "#BBB",
                      opacity: ampm === v ? 1 : 0.5,
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>
            {/* 시 */}
            <div className="flex flex-col items-center relative" style={{ width: 44 }}>
              <div
                ref={hourRef}
                className="overflow-y-scroll no-scrollbar snap-y snap-mandatory"
                style={{
                  height: CELL_HEIGHT * 5,
                  scrollSnapType: "y mandatory",
                  paddingTop: CELL_HEIGHT * 2,
                  paddingBottom: CELL_HEIGHT * 2,
                  zIndex: 2,
                }}
                onScroll={() => handleScroll(hourRef, hourList, setHour)}
              >
                {hourList.map((v) => (
                  <div
                    key={v}
                    className="snap-center flex items-center justify-center select-none"
                    style={{
                      height: CELL_HEIGHT,
                      fontWeight: hour === v ? 700 : 400,
                      fontSize: hour === v ? 18 : 16,
                      color: hour === v ? "#31A8F7" : "#111",
                      opacity: hour === v ? 1 : 0.5,
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-400 mt-1">시</div>
            </div>
            {/* 분 */}
            <div className="flex flex-col items-center relative" style={{ width: 44 }}>
              <div
                ref={minuteRef}
                className="overflow-y-scroll no-scrollbar snap-y snap-mandatory"
                style={{
                  height: CELL_HEIGHT * 5,
                  scrollSnapType: "y mandatory",
                  paddingTop: CELL_HEIGHT * 2,
                  paddingBottom: CELL_HEIGHT * 2,
                  zIndex: 2,
                }}
                onScroll={() => handleScroll(minuteRef, minuteList, setMinute)}
              >
                {minuteList.map((v) => (
                  <div
                    key={v}
                    className="snap-center flex items-center justify-center select-none"
                    style={{
                      height: CELL_HEIGHT,
                      fontWeight: minute === v ? 700 : 400,
                      fontSize: minute === v ? 18 : 16,
                      color: minute === v ? "#31A8F7" : "#111",
                      opacity: minute === v ? 1 : 0.5,
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-400 mt-1">분</div>
            </div>
          </div>
          {/* 입력 버튼 */}
          <div className="flex justify-end pr-5">
            <button
              type="button"
              className="text-[#4CB1F1] rounded-lg px-6 py-2 font-semibold text-base mt-2 mb-3"
              onClick={() => setOpen(false)}
            >
              입력
            </button>
          </div>
        </div>
      )}
      <style>
        {`
        .animate-fade-in { animation: fadeInTop .22s cubic-bezier(.4,0,.2,1) both }
        @keyframes fadeInTop { from { opacity:0; transform: translateY(-10px)} to { opacity:1; transform: none} }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        `}
      </style>
    </div>
  );
};

export default ReviewTimeWheel;
