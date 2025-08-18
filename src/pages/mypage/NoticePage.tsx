import { useState } from "react";
import TopHeader from "../../components/TopHeader";
import NoticeSection from "../../components/mypage/notice/NoticeSection";
import Search from "../../components/mypage/notice/Search";

const NoticePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <TopHeader title="공지사항" backButton={true} />
      <div className="flex flex-col items-center mx-[0.75rem] mt-[0.875rem] mb-[0.625rem]">
        <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <NoticeSection searchTerm={searchTerm} />
    </div>
  );
};

export default NoticePage;
