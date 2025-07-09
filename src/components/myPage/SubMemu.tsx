import next from '../../assets/next.svg';

interface SubMenuProps {
    text: string;
}

const SubMenu = ({ text }: SubMenuProps) => {
    return (
        <div className="flex items-center justify-between px-[1.75rem] 
            text-[0.938rem] text-black font-medium">
            {text}
            <img src={next} alt="다음" />
        </div>
    );
};

export default SubMenu;