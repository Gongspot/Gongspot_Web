import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecsPage from "./pages/RecsPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import MyPage from "./pages/myPage/MyPage";
import SpaceDetailPage from "./pages/spacedetail/SpaceDetailPage";
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
import SpaceReviewWritePage from "./pages/spacedetail/SpaceReviewWritePage";
import LoginPage from "./pages/LoginPage";
import OauthKakaoCallback from "./components/login/OauthKakaoCallback";
import PushPage from "./pages/myPage/PushPage";
import VisitPage from "./pages/myPage/VisitPage";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AdminHomePage from "./pages/admin/AdminHomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminNoticePage from "./pages/admin/AdminNoticePage";
import NewNoticePage from "./pages/admin/NewNoticePage";
import SpaceCongestionDetailPage from "./pages/spacedetail/SpaceCongestionDetailPage";
import AllAdminRequestsPage from "./pages/admin/AllAdminRequestsPage";
import AdminRequestDetailPage from "./pages/admin/AdminRequestDetailPage";
import AdminCreateSpacePage from "./pages/admin/AdminCreateSpacePage";
import AdminConfirmSpacePage from "./pages/admin/AdminConfirmSpacePage";
import AdminInitSpaceInfoPage from "./pages/admin/AdminInitSpaceInfoPage";
import AdminSearchSpacePage from "./pages/admin/AdminSearchSpacePage";
import AdminEditSpacePage from "./pages/admin/AdminEditSpacePage";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "home", element: <HomePage /> },
      { path: "recommendations", element: <RecsPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "mypage", element: <MyPage /> },
      { path: "space/:id", element: <SpaceDetailPage /> },
      { path: "space/:id/review", element: <SpaceReviewWritePage /> },
      { path: "space/:id/congestion", element: <SpaceCongestionDetailPage /> },
      { path: "theme-all", element: <ThemeAllPage /> },
      { path: "theme/:themeTitle", element: <ThemeDetailPage /> },
      { path: "hot-all", element: <HotSpaceListPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "mypage/notices", element: <NoticePage /> },
      { path: "mypage/notices/:id", element: <NoticeDetailPage /> },
      {
        path: "mypage/point",
        element: <PointLayout />,
        children: [
          { index: true, element: <MainList /> },
          { path: "charge", element: <PointCharge /> },
          { path: "detail", element: <PointDetail /> },
        ],
      },
      { path: "mypage/profile", element: <ProfilePage /> },
      { path: "mypage/withdrawal", element: <WithdrawalPage /> },
      { path: "mypage/spaces/proposal", element: <ProposalPage /> },
      { path: "oauth/kakao/callback", element: <OauthKakaoCallback /> },
      { path: "mypage/push", element: <PushPage /> },
      { path: "mypage/spaces/visit", element: <VisitPage /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: "notices", element: <AdminNoticePage /> },
      { path: "notices/new", element: <NewNoticePage /> },
      { path: "all-requests", element: <AllAdminRequestsPage /> },
      { path: "request/:id", element: <AdminRequestDetailPage /> },
      { path: "create-space", element: <AdminCreateSpacePage /> },
      { path: "confirm-space", element: <AdminConfirmSpacePage /> },
      { path: "init-space-info", element: <AdminInitSpaceInfoPage /> },
      { path: "search-space", element: <AdminSearchSpacePage /> },
      { path: "edit-space", element: <AdminEditSpacePage /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
