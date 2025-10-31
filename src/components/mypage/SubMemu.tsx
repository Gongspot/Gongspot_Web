import { Link } from 'react-router-dom';
import next from '../../assets/next.svg';

interface SubMenuProps {
    text: string;
    link?: string;
}

const SubMenu = ({ text, link }: SubMenuProps) => {
    if (link) {
        return (
            <Link
                to={link}
                className="flex items-center justify-between px-[1.75rem] 
            text-[0.938rem] text-black font-medium"
            >
                {text}
                <img src={next} alt="다음" />
            </Link>
        );
    }

    return (
        <div className="flex items-center justify-between px-[1.75rem] 
            text-[0.938rem] text-black font-medium">
            {text}
            <img src={next} alt="다음" />
        </div>
    );
};

export default SubMenu;