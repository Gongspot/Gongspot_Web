// components/BottomNavBar.tsx
import { Link, useLocation } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeSolid,
  FireIcon as FireSolid,
  UserIcon as UserSolid,
} from "@heroicons/react/24/solid";
import { useSearchMode } from "../contexts/SearchModeContext";

const BottomNavBar = () => {
  const location = useLocation();
  if (
    location.pathname === "/signup" ||
    location.pathname === "/" ||
    location.pathname.startsWith("/mypage/")
  ) {
    return null;
  }
  const navItems = [
    { path: "/home", label: "홈", icon: HomeSolid },
    { path: "/recommendations", label: "추천", icon: FireSolid },
    { path: "/search", label: "검색", icon: MagnifyingGlassIcon },
    { path: "/favorites", label: "찜", icon: BookmarkIcon },
    { path: "/mypage", label: "마이페이지", icon: UserSolid },
  ];
  const { isSearchMode, isSearchResultSheetOpen } = useSearchMode();
  return (
    <nav className={`fixed bottom-0 left-0 right-0 h-16 bg-white border-t z-40 rounded-t-2xl ${isSearchMode && !isSearchResultSheetOpen ? "hidden" : ""}`}>
      <div className="w-full h-full flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center gap-1 text-xs ${
              location.pathname === item.path
                ? "text-blue-500"
                : "text-gray-500"
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
