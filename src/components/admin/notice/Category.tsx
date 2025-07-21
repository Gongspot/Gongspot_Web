interface CategoryProps {
  text: string;
}

const Category = ({ text }: CategoryProps) => {

  return (
    <span
      className="inline-flex items-center px-[0.75rem] text-[0.813rem] leading-[1.5rem]
      rounded-[1.25rem] border border-solid border-[#E5E5E5] text-[#8F9098]"
    >
      {text}
    </span>
  );
};

export default Category;