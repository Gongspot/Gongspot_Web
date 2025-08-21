import BasicInfoItem from "./BasicInfoItem";
import SelectButton from "./SelectButton";

interface BasicInfoSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (option: string) => void;
  maxSelect: number;
}

const BasicInfoSection = ({ title, options, selected, onChange, maxSelect }: BasicInfoSectionProps) => {

  return (
    <div className="flex flex-col items-center text-center bg-[#EFF7FB]">
      <div className="mt-[1.25rem] rounded-[15px] border border-[#B1B8C180] bg-white">
        <div className="my-[1.5rem] ml-[1.125rem] mr-[3rem]">
          <BasicInfoItem text={title} />
          <div className="mt-[1rem]">
            <span className="flex flex-wrap justify-start gap-[0.5rem]">
              {options.map((option) => (
                <SelectButton 
                  key={option}
                  text={option}
                  selected={selected.includes(option)}
                  onClick={() => onChange(option)}
                  disabled={
                    !selected.includes(option) && selected.length >= maxSelect
                  }
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BasicInfoSection;