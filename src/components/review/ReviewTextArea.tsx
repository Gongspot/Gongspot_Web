// src/components/review/ReviewTextArea.tsx

import React from "react";

interface ReviewTextAreaProps {
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
}

const ReviewTextArea: React.FC<ReviewTextAreaProps> = ({
  value,
  onChange,
  maxLength = 500,
}) => {
  return (
    <div>
      <textarea
        className="w-full border rounded px-3 py-2"
        rows={4}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="공간에 대한 솔직한 후기를 남겨주세요."
        maxLength={maxLength}
      />
      <div className="flex justify-between text-xs mt-1">
        <span className="text-gray-300">10자 이상</span>
        <span className="text-gray-400">{value.length}/{maxLength}</span>
      </div>
    </div>
  );
};

export default ReviewTextArea;
