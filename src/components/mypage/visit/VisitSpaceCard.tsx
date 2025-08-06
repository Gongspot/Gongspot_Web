import { useNavigate } from 'react-router-dom';
import Likes from '../../../assets/likes.svg?react';

interface VisitSpaceCardProps {
  placeId: number;
  name: string;
  image: string;
  rate: number | null;
  visitedDate: string;
  type: string;
  isLiked: boolean;
  onLike: (placeId: number, currentLiked: boolean) => void;
}

const VisitSpaceCard = ({ placeId, name, image, rate, visitedDate, type, isLiked, onLike }: VisitSpaceCardProps) => {
  const navigate = useNavigate();
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${year.slice(2)}.${month}.${day}`;
  };
  const formattedDate = formatDate(visitedDate);

  const handleLike = () => {
    onLike(placeId, isLiked);
  }

  return (
    <div className="flex flex-col pl-[1.25rem] mb-[0.375rem] py-[0.875rem] bg-white">
        <p className="text-[1rem] font-medium">{formattedDate}</p>
        <div className="flex items-center justify-start mt-[0.625rem]">
          <div className="flex relative">
            <img
              src={image}
              alt={name}
              className="w-[10rem] h-[7.5rem] bg-[#B1B8C180] rounded-[0.938rem] border-[0.063rem] border-[#B1B8C180]" />
            <Likes 
              className={`absolute top-[0.625rem] right-[0.625rem] ${isLiked ? 'text-[#4CB1F1]' : 'text-white'}`}
              onClick={handleLike} />
          </div>
          <div className="flex flex-col pl-[1.125rem] text-[0.813rem]">
            <p className="text-[0.938rem] font-semibold">{name}</p>
            <p>☆ {rate}</p>
            <p>0.2km</p>
            <p>#{type}</p>
            <button
              className="mt-[0.5rem] px-[3.125rem] py-[0.5rem] bg-[#4CB1F1] text-white text-[0.813rem] font-medium rounded-[1.25rem]"
              onClick={() => navigate(`/space/${placeId}`)}
            >
              상세보기
            </button>
          </div>
        </div>
      </div>
  );
};

export default VisitSpaceCard;