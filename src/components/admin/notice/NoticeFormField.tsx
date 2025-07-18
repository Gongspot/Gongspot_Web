interface NoticeFormFieldProps {
    title: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NoticeFormField = ({ title, placeholder, value, onChange }: NoticeFormFieldProps) => {
    return (
        <div>
            <p className="mb-[0.625rem] text-[1rem] text-black">{title}</p>
            <input
                type="text"
                className="w-full px-[0.75rem] py-[0.625rem] text-[0.75rem] text-black
                border border-[#E5E5E5] border-solid rounded-[0.5rem]"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default NoticeFormField;