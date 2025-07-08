// src/components/TopHeader.tsx
import { useNavigate } from 'react-router-dom';

interface TopHeaderProps {
  title: string;          
  backButton?: boolean;    
}

const TopHeader = ({ title, backButton = true }: TopHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white flex items-center px-4 h-10 shadow-md z-30 sticky top-0">
      {backButton && (
        <button onClick={() => navigate(-1)} className="z-10 font-bold text-lg px-2">
          ‹
        </button>
      )}
      <div className="mx-auto text-sm font-semibold">{title}</div>
    </div>
  );
};

export default TopHeader;
