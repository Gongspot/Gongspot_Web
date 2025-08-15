import type { Attachments } from "../../../types/mypage";

interface AttachmentSectionProps {
    attachments?: Attachments[];
}

const AttachmentSection = ({ attachments }: AttachmentSectionProps) => {
    if (!attachments || attachments.length === 0) return null;

    return (
        <div className="flex flex-col mt-[1.125rem] mb-[1rem] mx-[1.75rem] 
        px-[1.25rem] py-[1.5rem] bg-white border border-[#E5E7EB] rounded-[0.313rem]">
            <p className="mb-[0.625rem] text-[1rem]">첨부파일</p>
            <ul className="space-y-1">
                {attachments.map((file) => (
                <li key={file.attachmentId} className="text-[0.75rem] text-blue-600">
                    <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-[0.5rem] py-[0.5rem] text-[#8F9098] border border-[#E5E5E5] rounded-[1.25rem] text-center"
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