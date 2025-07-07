import TopHeader from "../components/homepage/TopHeader";
import NoticeSection from "../components/notice/NoticeSection";
import Search from "../components/notice/Search";

const NoticePage = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <TopHeader title="공지사항" backButton={true} />
      <Search />
      <NoticeSection />
    </div>
  );
};

export default NoticePage;
