const ReviewCongestionInput = ({ congestion, setCongestion }: { congestion: string; setCongestion: (s: string) => void }) => (
  <div className="mb-4">
    <div className="font-semibold mb-1">혼잡도는 어땠나요?</div>
    <div className="flex gap-2">
      {["높음", "보통", "낮음"].map((label, i) => (
        <button
          key={label}
          type="button"
          className={`flex flex-col items-center px-3 py-2 rounded-lg border ${
            congestion === label ? "bg-sky-100 border-sky-400" : "bg-gray-100 border-gray-200"
          }`}
          onClick={() => setCongestion(label)}
        >
          <span className="text-xl">{["😵","🙂","😌"][i]}</span>
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default ReviewCongestionInput;
