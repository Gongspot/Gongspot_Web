import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  FireIcon, 
  MagnifyingGlassIcon,
  BookmarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const BottomNavBar = () => {
  const location = useLocation();

  // "/signup" 경로에서는 렌더링 생략
  if (location.pathname === "/signup") {
    return null;
  }

  const navItems = [
    { path: "/", label: "홈", icon: HomeIcon },
    { path: "/recommendations", label: "추천", icon: FireIcon },
    { path: "/search", label: "검색", icon: MagnifyingGlassIcon },
    { path: "/favorites", label: "찜", icon: BookmarkIcon },
    { path: "/mypage", label: "마이페이지", icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t z-40"> 
    {/* z-40: BottonmNavBar가 모든 페이지 상에서 레이어 상단에 위치. */}
      <div className="w-full h-full flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center gap-1 text-xs ${
              location.pathname === item.path ? "text-blue-500" : "text-gray-500"
            } hover:text-blue-500`}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;