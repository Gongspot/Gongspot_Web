const ReviewPhotoInput = ({ files, setFiles }: { files: File[]; setFiles: (f: File[]) => void }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  return (
    <div className="mb-4">
      <div className="font-semibold mb-1">사진이나 영상을 첨부해주세요.</div>
      <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} />
      {files.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {files.map((file, i) => (
            <div key={i} className="w-16 h-16 border rounded flex items-center justify-center text-xs bg-gray-50">
              {file.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewPhotoInput;
