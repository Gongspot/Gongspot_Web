import { useState } from "react";
import NoticeFormField from "./NoticeFormField";
import DropDown from "../../../assets/dropDown.svg?react";
import DropDownUp from "../../../assets/dropDownUp.svg?react";

interface NoticeFormProps {
    form: { title: string; category: string; content: string };
    onChange: (key: string, value: string) => void;
    isCategoryEditable?: boolean;
}

const NoticeForm = ({ form, onChange, isCategoryEditable = true }: NoticeFormProps) => {
    const [showCategory, setShowCategory] = useState(false);
    const categories = ["일반", "배너",];

    const toggleCategory = () => {
        if (!isCategoryEditable) return;
        setShowCategory(prev => !prev);
    };

    const handleCategorySelect = (category: string) => {
        if (!isCategoryEditable) return;
        onChange("category", category);
        setShowCategory(false);
    };

    return (
        <div className="flex flex-col justify-start h-full space-y-[2.25rem]" >
            <NoticeFormField
                title="제목"
                placeholder="제목을 작성해주세요."
                value={form.title}
                onChange={e => onChange("title", e.target.value)}
            />
            <div>
                <p className="mb-[0.625rem] text-[1rem] text-black">카테고리</p>
                <div className="flex relative items-center">
                    <input
                        type="text"
                        className={`w-full px-[0.75rem] py-[0.625rem] text-[0.75rem]
                        border border-[#E5E5E5] border-solid 
                        ${showCategory ? 'rounded-t-[0.5rem]' : 'rounded-[0.5rem]'}`}
                        placeholder="카테고리를 선택해주세요."
                        value={form.category}
                        readOnly
                    />
                    <div onClick={toggleCategory} className="absolute right-[1rem]">
                        {showCategory ? <DropDownUp /> : <DropDown />}
                    </div>
                </div>

                {showCategory && (
                    <ul className="border-x border-b border-[#E5E5E5] rounded-b-[0.5rem] bg-white z-10 w-full">
                    {categories.map((category, idx) => (
                        <li
                            key={idx}
                            className={`px-[0.75rem] py-2 text-[0.75rem] cursor-pointer ${
                                idx !== 0 ? 'border-t border-[#E5E5E5]' : ''
                            }`}
                            onClick={() => handleCategorySelect(category)}
                            >
                            {category}
                        </li>
                    ))}
                    </ul>
                )}
            </div>
            <div>
                <p className="mb-[0.625rem] text-[1rem] text-black">내용</p>
                <textarea
                    className="w-full px-[0.75rem] pt-[0.625rem] pb-[9.5rem] text-[0.75rem] text-black
                    border border-[#E5E5E5] rounded-[0.5rem]"
                    placeholder="공지사항 내용을 입력하세요."
                    value={form.content}
                    onChange={e => onChange("content", e.target.value)}
                />
            </div>
        </div>
    );
};

export default NoticeForm;