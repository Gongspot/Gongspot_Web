import { Link } from "react-router-dom";
import Likes from '../../assets/likes.svg?react';
import Rating from '../../assets/rating.svg?react';

interface Space {
    id: number;
    name: string;
    image: string;
    tag: string;
    rating: number;
    isLiked: boolean;
    isFree: string;
}

interface SpaceSectionProps {
  spaces: Space[];
}

const SpaceSection = ({ spaces }: SpaceSectionProps) => {
    return (
        <div className="grid grid-cols-2 gap-x-[1.875rem] w-full">
            {spaces.map((item) => (
                <Link 
                    key={item.id}
                    to={`/space/${item.id}`}
                    className="flex flex-col mb-[1.625rem]"
                >
                    <div className="relative w-[10rem] h-[7.5rem]">
                        <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover bg-[#B1B8C180] rounded-[0.938rem] border-[0.063rem] border-[#B1B8C180]" />
                        <Likes className="absolute top-[0.625rem] right-[0.625rem] text-[#4CB1F1]" />
                    </div>
                    <p className="text-[0.938rem] font-medium mt-[0.5rem]">{item.name}</p>
                    <div className="flex items-center">
                        <span className="text-[0.75rem] mr-[0.375rem]">#{item.tag}</span>
                        <Rating className="mr-[0.188rem]"/>
                        <span className="text-[0.75rem]">{item.rating}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SpaceSection;