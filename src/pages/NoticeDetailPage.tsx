import TopHeader from "../components/TopHeader";
import ContentSection from "../components/notice/ContentSection";
import TitleSection from "../components/notice/TitleSection";

const NoticePage = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <TopHeader title="공지사항" backButton={true} />
      <TitleSection />
      <div className="w-full border-b-[0.063rem] border-[#CCCCCC]" />
      <ContentSection />
    </div>
  );
};

export default NoticePage;
