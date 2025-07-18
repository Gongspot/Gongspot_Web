import { Link, useLocation } from "react-router-dom";
import Space from '../assets/spaceNav.svg?react';
import Notice from '../assets/noticeNav.svg?react';

const BottomNavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/admin", label: "공간관리", icon: Space },
    { path: "/admin/notices", label: "공지사항", icon: Notice },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white z-40 rounded-t-[1.25rem]"
      style={{ boxShadow: '0px -1px 8px 0px #0000000F' }}>
      <div className="w-full flex items-center justify-evenly pt-[0.75rem] pb-[1.375rem]">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center gap-1 ${
              location.pathname === item.path
                ? "text-[#4CB1F1]"
                : "text-[#737373]"
            }`}
          >
            <item.icon />
            <span className="text-[0.625rem]">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;
