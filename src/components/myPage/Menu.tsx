interface MenuProps {
    text: string;
}

const Menu = ({ text }: MenuProps) => {
    return (
        <div className="mt-[1.25rem] mb-[0.75rem] flex flex-col justify-center px-[1.75rem] 
            text-[0.938rem] text-[#616161]">
            {text}
        </div>
    );
};

export default Menu;