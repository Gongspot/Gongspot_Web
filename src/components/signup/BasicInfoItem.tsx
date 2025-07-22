interface BasicInfoItemProps {
  text: string;
}

const BasicInfoItem = ({ text }: BasicInfoItemProps) => {
  return (
    <div className="flex items-center space-x-[0.25rem]">
      <h3 className="text-[0.875rem] text-left">
        {text}
      </h3>
      <span className="text-[0.625rem] text-[#C7C7C7]">
        최대 3개
      </span>
    </div>
  );
};

export default BasicInfoItem;