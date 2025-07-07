import TopHeader from "../components/homepage/TopHeader";
import ContentSection from "../components/notice/ContentSection";
import TitleSection from "../components/notice/TitleSection";

const NoticePage = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <TopHeader title="공지사항" backButton={true} />
      <TitleSection />
      <div className="h-[0.063rem] w-full border-b border-[#CCCCCC]" />
      <ContentSection />
    </div>
  );
};

export default NoticePage;
