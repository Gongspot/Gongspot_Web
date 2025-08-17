import Cloud from '../../../assets/cloud.svg?react';
import Delete from '../../../assets/delete.svg?react';
import type { Attachments } from '../../../types/mypage';

interface DragDropProps {
    existingAttachments?: Attachments[];
    files: File[] | null;
    onFileChange: (files: File[] | null) => void;
    onDeleteExistingAttachment?: (attachmentId: number) => void;
}

const DragDrop = ({ existingAttachments = [], files, onFileChange, onDeleteExistingAttachment }: DragDropProps) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : null;
        onFileChange(selectedFiles);
    };

    const handleDelete = (idx: number) => {
        if (!files) return;
        const updatedFiles = files.filter((_, i) => i !== idx);
        onFileChange(updatedFiles.length > 0 ? updatedFiles : null);
    };

    return (
        <>
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
                        multiple
                        onChange={handleFileChange}
                    />
                </label>
            </div>
            {(existingAttachments.length > 0 || (files && files.length > 0)) && (
            <div className="mt-[1rem]">
                <ul className="flex flex-wrap gap-x-[0.5rem] gap-y-[1rem]">
                    {existingAttachments.map((file) => (
                        <li 
                            key={file.attachmentId}
                            className="flex items-center py-[0.25rem] border border-[#E5E5E5] rounded-[1.25rem] 
                                text-[#8F9098] text-[0.75rem] text-center break-words"
                        >
                            <span className="ml-[1rem]">{file.fileName}</span>
                            <button
                                type="button"
                                onClick={() => onDeleteExistingAttachment?.(file.attachmentId)}
                                className="flex items-center mx-[0.625rem]"
                            >
                                <Delete />
                            </button>
                        </li>
                    ))}
                    {files?.map((file, idx) => (
                        <li 
                            key={idx}
                            className="flex items-center py-[0.25rem] border border-[#E5E5E5] rounded-[1.25rem] 
                                text-[#8F9098] text-[0.75rem] text-center break-words"
                        >
                            <span className="ml-[1rem]">{file.name}</span>
                            <button
                                type="button"
                                onClick={() => handleDelete(idx)}
                                className="flex items-center mx-[0.625rem]"
                            >
                                <Delete />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            )}
        </>
    );
};

export default DragDrop;