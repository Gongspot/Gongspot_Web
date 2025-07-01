import { Routes, Route } from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import HomePage from "./pages/HomePage";
import RecsPage from "./pages/RecsPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import MyPage from "./pages/MyPage";
import SpaceDetailPage from "./pages/SpaceDetailPage";

function App() {
  return (
    <div className="font-sans">
      <main className="pb-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recommendations" element={<RecsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/space/:id" element={<SpaceDetailPage />} /> {/* 상세페이지 라우트 추가 */}
        </Routes>
      </main>
      <BottomNavBar />
    </div>
  );
}

export default App;
