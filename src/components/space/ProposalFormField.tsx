interface ProposalFormFieldProps {
    title: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProposalFormField = ({ title, placeholder, value, onChange }: ProposalFormFieldProps) => {
    return (
        <div>
            <p className="mb-[0.625rem] text-[1rem] text-black">{title}</p>
            <input
                type="text"
                className="w-full px-[0.875rem] py-[0.625rem] text-[0.75rem] text-black
                border border-[#E5E5E5] rounded-[0.5rem]"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default ProposalFormField;