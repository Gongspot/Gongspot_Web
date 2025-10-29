import React, { useRef, useState } from "react";
import heic2any from "heic2any";

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
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsConverting(true);
      const selected = Array.from(e.target.files);

      const convertedFiles = await Promise.all(
        selected.map(async (file) => {
          const fileType = file.type.toLowerCase();
          const isHeic = fileType === 'image/heic' || fileType === 'image/heif';

          if (isHeic) {
            try {
              const jpgBlob = (await heic2any({
                blob: file,
                toType: "image/jpeg",
                quality: 0.8,
              })) as Blob;

              const newFileName = file.name.replace(/\.[^/.]+$/, ".jpg");
              const jpgFile = new File([jpgBlob], newFileName, {
                type: "image/jpeg",
              });
              return jpgFile;
            } catch (error) {
              console.error("HEIC 파일 변환에 실패했습니다:", error);
              return null;
            }
          } else {
            return file;
          }
        })
      );

      const validFiles = convertedFiles.filter(file => file !== null) as File[];

      const totalFiles = [...files, ...validFiles].slice(0, MAX_FILES);
      setFiles(totalFiles);
      e.target.value = "";
      setIsConverting(false);
    }
  };

  const handleBoxClick = () => {
    if (files.length < MAX_FILES && !isConverting) {
      inputRef.current?.click();
    }
  };

  return (
    <div className="mb-4">
      <div className="font-semibold mb-1">사진이나 영상을 첨부해주세요.</div>
      <div
        className="
          flex gap-2
          overflow-x-auto
          flex-nowrap
          scrollbar-hide
          py-1
          "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {files.length < MAX_FILES && (
          <button
            type="button"
            className="min-w-[100px] w-[100px] h-[100px] rounded-lg border-2 border-gray-200 bg-white flex items-center justify-center text-xl text-gray-400 font-thin transition disabled:opacity-50 disabled:cursor-wait"
            onClick={handleBoxClick}
            disabled={isConverting}
            style={{ minWidth: 100, minHeight: 100 }}
          >
            {isConverting ? "변환 중..." : "+"}
            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={isConverting}
            />
          </button>
        )}

        {files.map((file, i) => {
          const url = URL.createObjectURL(file);
          const isImage = file.type.startsWith("image");
          return (
            <div
              key={i}
              className="min-w-[100px] w-[100px] h-[100px] rounded-lg border border-gray-200 bg-white flex items-center justify-center relative overflow-hidden"
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
      <style>
        {`
        /* 스크롤바 숨기기 (tailwind의 scrollbar-hide 역할, 크로스브라우저) */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </div>
  );
};

export default ReviewPhotoInput;