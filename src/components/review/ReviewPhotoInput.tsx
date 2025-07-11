import React, { useRef } from "react";

interface ReviewPhotoInputProps {
  files: File[];
  setFiles: (f: File[]) => void;
}

const MAX_FILES = 4;

const ReviewPhotoInput: React.FC<ReviewPhotoInputProps> = ({
  files,
  setFiles,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      const totalFiles = [...files, ...selected].slice(0, MAX_FILES);
      setFiles(totalFiles);
      e.target.value = "";
    }
  };

  const handleBoxClick = () => {
    if (files.length < MAX_FILES) inputRef.current?.click();
  };

  return (
    <div className="mb-4">
      <div className="font-semibold mb-1">사진이나 영상을 첨부해주세요.</div>
      <div className="flex gap-2">
        {/* 업로드 박스 */}
        {files.length < MAX_FILES && (
          <button
            type="button"
            className="w-[100px] h-[100px] rounded-lg border-2 border-gray-600 bg-white flex items-center justify-center text-2xl text-gray-400 font-thin transition"
            onClick={handleBoxClick}
            style={{ minWidth: 100, minHeight: 100 }}
          >
            +
            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </button>
        )}

        {/* 미리보기 */}
        {files.map((file, i) => {
          const url = URL.createObjectURL(file);
          const isImage = file.type.startsWith("image");
          return (
            <div
              key={i}
              className="w-[100px] h-[100px] rounded-lg border border-gray-200 bg-white flex items-center justify-center relative overflow-hidden"
              style={{ minWidth: 100, minHeight: 100 }}
            >
              {isImage ? (
                <img
                  src={url}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <video src={url} className="object-cover w-full h-full" />
              )}
              <button
                type="button"
                onClick={() => {
                  setFiles(files.filter((_, idx) => idx !== i));
                  URL.revokeObjectURL(url);
                }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white bg-opacity-80 flex items-center justify-center text-xs text-gray-500 shadow hover:bg-gray-100"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-1 text-xs text-gray-300">{`최대 ${MAX_FILES}장`}</div>
    </div>
  );
};

export default ReviewPhotoInput;
