// src/components/TopHeader.tsx
import { useNavigate } from 'react-router-dom';
import back from '../assets/back.svg';

interface TopHeaderProps {
  title: string;          
  backButton?: boolean;    
}

const TopHeader = ({ title, backButton = true }: TopHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white flex items-center px-4 h-10 z-30 sticky top-0"
      style={{ boxShadow: '0px 4px 10px 0px #0000000D' }}>
      {backButton && (
        <button onClick={() => navigate(-1)} className="z-10 font-bold text-lg absolute left-[1rem]">
          <img src={back} alt="이전" className="w-[10px] h-[16px]" />
        </button>
      )}
      <div className="mx-auto text-sm font-bold">{title}</div>
    </div>
  );
};

export default TopHeader;
