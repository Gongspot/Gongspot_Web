interface MenuProps {
    text: string;
}

const Menu = ({ text }: MenuProps) => {
    return (
        <div
            className="flex flex-col justify-center px-[1.75rem] mt-[1.25rem] mb-[0.75rem] 
            text-[0.938rem] text-[#616161] font-medium"
        >
            {text}
        </div>
    );
};

export default Menu;