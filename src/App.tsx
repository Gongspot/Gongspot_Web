import { Routes, Route } from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import HomePage from "./pages/HomePage";
import RecsPage from "./pages/RecsPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import MyPage from "./pages/MyPage";
import SpaceDetailPage from "./pages/SpaceDetailPage";
import ThemeAllPage from "./pages/ThemeAllPage";
import ThemeDetailPage from "./pages/ThemeDetailPage";
import SignupPage from "./pages/SignupPage";
import NoticePage from "./pages/NoticePage";
import NoticeDetailPage from "./pages/NoticeDetailPage";
import PointLayout from "./layouts/PointLayout";
import MainList from "./components/myPage/point/MainList";
import PointCharge from "./components/myPage/point/PointCharge";
import PointDetail from "./components/myPage/point/PointDetail";
import HotSpaceListPage from "./pages/HotSpaceListPage";  
import ProfilePage from "./pages/ProfilePage";
import WithdrawalPage from "./pages/WithdrawalPage";
import ProposalPage from "./pages/ProposalPage";
import SpaceReviewWritePage from "./pages/SpaceReviewWritePage";
import LoginPage from "./pages/LoginPage";
import OauthKakaoCallback from "./components/login/OauthKakaoCallback";
import PushPage from "./pages/PushPage";

function App() {
  return (
    <div className="font-sans bg-[#EFF7FB] h-[100dvh] flex flex-col">
      <div className="flex-1 min-h-0">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/recommendations" element={<RecsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/space/:id" element={<SpaceDetailPage />} />
          <Route path="/space/:id/review" element={<SpaceReviewWritePage />} />
          <Route path="/theme-all" element={<ThemeAllPage />} />
          <Route path="/theme/:themeTitle" element={<ThemeDetailPage />} />
          <Route path="/hot-all" element={<HotSpaceListPage />} />  
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage/notice" element={<NoticePage />} />
          <Route path="/mypage/notice/:id" element={<NoticeDetailPage />} />
          <Route path="/mypage/point" element={<PointLayout />}>
            <Route index element={<MainList />} />
            <Route path="charge" element={<PointCharge />} />
            <Route path="detail" element={<PointDetail />} />
          </Route>
          <Route path="/mypage/profile" element={<ProfilePage />} />
          <Route path="/mypage/withdrawal" element={<WithdrawalPage />} />
          <Route path="/mypage/spaces/proposal" element={<ProposalPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/oauth/kakao/callback" element={<OauthKakaoCallback />} />
          <Route path="/mypage/push" element={<PushPage />} />
        </Routes>
      </div>
      <BottomNavBar />
    </div>
  );
}

export default App;
