// src/App.tsx
import { Routes, Route } from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import HomePage from "./pages/HomePage";
import RecsPage from "./pages/RecsPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import MyPage from "./pages/MyPage";
import SignupPage from "./pages/SignupPage";
import NoticePage from "./pages/NoticePage";
import NoticeDetailPage from "./pages/NoticeDetailPage";
import PointLayout from "./layouts/PointLayout";
import MainList from "./components/point/MainList";
import PointCharge from "./components/point/PointCharge";
import PointDetail from "./components/point/PointDetail";

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
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage/notice" element={<NoticePage />} />
          <Route path="/mypage/notice/:id" element={<NoticeDetailPage />} />
          <Route path="/mypage/point" element={<PointLayout />}>
            <Route index element={<MainList />} />
            <Route path="charge" element={<PointCharge />} />
            <Route path="detail" element={<PointDetail />} />
          </Route>
        </Routes>
      </main>
      
      <BottomNavBar />
    </div>
  );
}

export default App;