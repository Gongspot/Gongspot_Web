import TopHeader from "../../components/TopHeader";
import NoticeSection from "../../components/mypage/notice/NoticeSection";
import Search from "../../components/mypage/notice/Search";

const NoticePage = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <TopHeader title="공지사항" backButton={true} />
      <Search />
      <NoticeSection />
    </div>
  );
};

export default NoticePage;
