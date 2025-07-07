import { Routes, Route } from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import HomePage from "./pages/HomePage";
import RecsPage from "./pages/RecsPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import MyPage from "./pages/MyPage";
import SpaceDetailPage from "./pages/SpaceDetailPage";
import ThemeAllPage from "./pages/ThemeAllPage";
import SignupPage from "./pages/SignupPage";
import NoticePage from "./pages/NoticePage";
import NoticeDetailPage from "./pages/NoticeDetailPage";

function App() {
  return (
    <div className="font-sans min-h-[100dvh] bg-[#EFF7FB]">
      <main className="pb-16"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recommendations" element={<RecsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/space/:id" element={<SpaceDetailPage />} />
          <Route path="/theme-all" element={<ThemeAllPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage/notice" element={<NoticePage />} />
          <Route path="/mypage/notice/:id" element={<NoticeDetailPage />} />
        </Routes>
      </main>
      <BottomNavBar />
    </div>
  );
}
export default App;
