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
        </Routes>
      </main>
      
      <BottomNavBar />
    </div>
  );
}

export default App;