import { useNavigate } from 'react-router-dom';
import back from '../assets/topBack.svg';

interface TopHeaderProps {
  title: string;          
  backButton?: boolean;    
}

const TopHeader = ({ title, backButton = true }: TopHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full bg-white flex items-center px-[1rem] h-10 shadow-md z-30"
      style={{ boxShadow: '0px 4px 10px 0px #0000000D' }}>
      {backButton && (
        <button onClick={() => navigate(-1)} className="z-10 font-bold text-lg">
          <img src={back} alt="이전" />
        </button>
      )}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
        {title}
      </div>
    </div>
  );
};

export default TopHeader;