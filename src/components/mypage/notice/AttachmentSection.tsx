import type { Attachments } from "../../../types/mypage";

interface AttachmentSectionProps {
    attachments?: Attachments[];
}

const AttachmentSection = ({ attachments }: AttachmentSectionProps) => {
    if (!attachments || attachments.length === 0) return null;

    return (
        <div className="flex flex-col mt-[1.125rem] mb-[1rem] mx-[1.75rem] 
        px-[1.25rem] py-[1.5rem] bg-white border border-[#E5E7EB] rounded-[0.313rem]">
            <p className="mb-[0.75rem] text-[1rem]">첨부파일</p>
            <ul className="flex flex-wrap gap-x-[0.5rem] gap-y-[0.5rem]">
                {attachments.map((file) => (
                <li 
                    key={file.attachmentId}
                    className="flex items-center py-[0.25rem] border border-[#E5E5E5] rounded-[1.25rem] 
                        text-[#8F9098] text-[0.75rem] text-center break-words">
                    <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-[1rem]"
                    >
                    {file.fileName}
                    </a>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default AttachmentSection;