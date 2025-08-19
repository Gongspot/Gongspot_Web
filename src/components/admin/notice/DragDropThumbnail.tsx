import Cloud from '../../../assets/cloud.svg?react';
import Delete from '../../../assets/delete.svg?react';
import type { Thumbnail } from '../../../types/mypage';

interface DragDropProps {
    existingThumbnail?: Thumbnail | null;
    file: File | null;
    onFileChange: (file: File | null) => void;
    onDelete?: () => void;
}

const DragDropThumbnail = ({ existingThumbnail, file, onFileChange, onDelete }: DragDropProps) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? e.target.files[0] : null;
        onFileChange(selectedFiles);
    };

    const handleDelete = () => {
        if (!file) return;
        onFileChange(null);
    };

    return (
        <>
            <div className="flex flex-col space-y-[0.5rem] items-center justify-center
                border border-dashed border-[#E5E5E5] rounded-[0.5rem] py-[1.125rem]">
                <Cloud />
                <p className="text-[0.75rem] text-[#ADAEBC]">파일을 드래그하거나 클릭하여 업로드</p>
                <label
                    htmlFor="thumbnail"
                    className="bg-[#F5F5F5] px-[0.625rem] py-[0.25rem] text-[0.75rem] rounded-[0.313rem]"
                >
                    파일 선택
                    <input
                        id="thumbnail"
                        type="file"
                        name="thumbnail"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
            </div>
            {(existingThumbnail || file) && (
            <div className="mt-[1rem]">
                <ul className="flex flex-wrap gap-x-[0.5rem] gap-y-[0.5rem]">
                    {existingThumbnail &&(
                        <li 
                            className="flex items-center py-[0.25rem] border border-[#E5E5E5] rounded-[1.25rem] 
                                text-[#8F9098] text-[0.75rem] text-center break-words"
                        >
                            <span className="ml-[1rem]">{existingThumbnail?.fileName}</span>
                            <button
                                type="button"
                                onClick={onDelete}
                                className="flex items-center mx-[0.625rem]"
                            >
                                <Delete />
                            </button>
                        </li>
                    )}
                    {file && (
                        <li 
                            className="flex items-center py-[0.25rem] border border-[#E5E5E5] rounded-[1.25rem] 
                                text-[#8F9098] text-[0.75rem] text-center break-words"
                        >
                            <span className="ml-[1rem]">{file.name}</span>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex items-center mx-[0.625rem]"
                            >
                                <Delete />
                            </button>
                        </li>
                    )}
                </ul>
            </div>
            )}
        </>
    );
};

export default DragDropThumbnail;