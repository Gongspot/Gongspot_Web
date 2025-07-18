import Cloud from '../../../assets/cloud.svg?react';

interface DragDropProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const DragDrop = ({ file, onFileChange }: DragDropProps) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        onFileChange(selectedFile);
    };

    return (
        <div className="flex flex-col space-y-[0.5rem] items-center justify-center
            border border-dashed border-[#E5E5E5] rounded-[0.5rem] py-[1.125rem]">
            <Cloud />
            <p className="text-[0.75rem] text-[#ADAEBC]">파일을 드래그하거나 클릭하여 업로드</p>
            <label
                htmlFor="noticeFile"
                className="bg-[#F5F5F5] px-[0.625rem] py-[0.25rem] text-[0.75rem] rounded-[0.313rem]"
            >
                파일 선택
                <input
                    id="noticeFile"
                    type="file"
                    name="noticeFile"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
            {file && (
                <div className="text-[0.75rem] text-black">
                    <p>선택된 파일: {file.name}</p>
                </div>
            )}
        </div>
    );
};

export default DragDrop;