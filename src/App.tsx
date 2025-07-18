import { createBrowserRouter, type RouteObject, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecsPage from "./pages/RecsPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import MyPage from "./pages/myPage/MyPage";
import SpaceDetailPage from "./pages/SpaceDetailPage";
import ThemeAllPage from "./pages/ThemeAllPage";
import ThemeDetailPage from "./pages/ThemeDetailPage";
import SignupPage from "./pages/SignupPage";
import NoticePage from "./pages/myPage/NoticePage";
import NoticeDetailPage from "./pages/myPage/NoticeDetailPage";
import PointLayout from "./layouts/PointLayout";
import MainList from "./components/myPage/point/MainList";
import PointCharge from "./components/myPage/point/PointCharge";
import PointDetail from "./components/myPage/point/PointDetail";
import HotSpaceListPage from "./pages/HotSpaceListPage";  
import ProfilePage from "./pages/myPage/ProfilePage";
import WithdrawalPage from "./pages/myPage/WithdrawalPage";
import ProposalPage from "./pages/myPage/ProposalPage";
import SpaceReviewWritePage from "./pages/SpaceReviewWritePage";
import LoginPage from "./pages/LoginPage";
import OauthKakaoCallback from "./components/login/OauthKakaoCallback";
import PushPage from "./pages/myPage/PushPage";
import VisitPage from "./pages/myPage/VisitPage";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AdminHomePage from "./pages/admin/AdminHomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminNoticePage from "./pages/admin/AdminNoticePage";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout/>,
    children: [
      { index: true, element: <LoginPage/>, },
      { path: "home", element: <HomePage/>, },
      { path: "recommendations", element: <RecsPage />, },
      { path: "search", element: <SearchPage />, },
      { path: "favorites", element: <FavoritesPage />, },
      { path: "mypage", element: <MyPage />, },
      { path: "space/:id", element: <SpaceDetailPage />, },
      { path: "space/:id/review", element: <SpaceReviewWritePage />, },
      { path: "theme-all", element: <ThemeAllPage />, },
      { path: "theme/:themeTitle", element: <ThemeDetailPage />, },
      { path: "hot-all", element: <HotSpaceListPage />, },
      { path: "signup", element: <SignupPage />, },
      { path: "mypage/notice", element: <NoticePage />, },
      { path: "mypage/notice/:id", element: <NoticeDetailPage />, },
      {
        path: "mypage/point",
        element: <PointLayout />,
        children: [
          { index: true, element: <MainList />, },
          { path: "charge", element: <PointCharge />, },
          { path: "detail", element: <PointDetail />, },
        ],
      },
      { path: "mypage/profile", element: <ProfilePage />, },
      { path: "mypage/withdrawal", element: <WithdrawalPage />, },
      { path: "mypage/spaces/proposal", element: <ProposalPage />, },
      { path: "oauth/kakao/callback", element: <OauthKakaoCallback />, },
      { path: "mypage/push", element: <PushPage />, },
      { path: "mypage/spaces/visit", element: <VisitPage />, },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <ProtectedLayout/>,
    children: [
      { index: true, element: <AdminHomePage/>, },
      { path: "notice", element: <AdminNoticePage/>, },
    ],
  },
];

const router = createBrowserRouter([
  ...publicRoutes, ...protectedRoutes,
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
