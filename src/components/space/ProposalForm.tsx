import { useState } from "react";
import ProposalFormField from "./ProposalFormField";
import { useNavigate } from "react-router-dom";

const ProposalForm = () => {
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        name: "",
        link: "",
        reason: "",
    });

    const handleChange = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("장소 등록 신청이 완료되었습니다.");
        navigate("/mypage");
    };

    return (
        <form 
            className="flex flex-col justify-start h-full"
            onSubmit={handleSubmit}
        >
            <div className="pt-[1.5rem] px-[1.5rem] space-y-[2.25rem] flex-1">
                <ProposalFormField
                    title="장소명"
                    placeholder="공간 이름을 작성해주세요"
                    value={form.name}
                    onChange={e => handleChange("name", e.target.value)}
                />
                <ProposalFormField
                    title="구글 맵스 링크"
                    placeholder="공간 관련 정보를 입력해주세요"
                    value={form.link}
                    onChange={e => handleChange("link", e.target.value)}
                />
                <div>
                    <p className="mb-[0.625rem] text-[1rem] text-black">신청 이유</p>
                    <textarea
                        className="w-full px-[0.875rem] pt-[0.625rem] pb-[9.5rem] text-[0.75rem] text-black
                        border border-[#E5E5E5] rounded-[0.5rem]"
                        placeholder="공간을 신청하는 이유를 작성해주세요."
                        value={form.reason}
                        onChange={e => handleChange("reason", e.target.value)}
                    />
                </div>
            </div>
            <button 
            type="submit"
            className="mb-[1.5rem] mx-[5.875rem] py-[0.5rem] rounded-[1.25rem] 
            bg-[#4CB1F1] text-white text-[0.813rem] font-medium"
            >
            장소 등록 신청
            </button>
        </form>
    );
};

export default ProposalForm;