import { useMemo, useState } from "react";
import TopHeader from "../../components/TopHeader";
import CategorySelect from "../../components/admin/notice/CategorySelect";
import Search from "../../components/mypage/notice/Search";
import AdminNoticeSection from "../../components/admin/notice/AdminNoticeSection";

const categories = ['전체', '배너', '일반'];

const noticeData = [
  { id: 1, title: "[안내] 공스팟 이용 관련 안내사항", date: "25.05.04", category: "배너" },
  { id: 2, title: "공지사항 A", date: "25.05.04", category: "일반" },
  { id: 3, title: "공지사항 B", date: "25.05.04", category: "배너" },
  { id: 4, title: "공지사항 C", date: "25.05.04", category: "일반" },
];

const AdminNoticeAllPage = () => {
  const [selected, setSelected] = useState<string>('전체');

  const filteredNotices = useMemo(() => {
    if (selected === "전체") return noticeData;
    return noticeData.filter((notice) => notice.category === selected);
  }, [selected]);

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <TopHeader title="공지사항" backButton={true} />
      <div className="flex flex-col items-start mx-[0.75rem] mt-[0.875rem] mb-[0.625rem] gap-y-[0.375rem]">
        <Search />
        <div className="flex gap-x-[0.5rem]">
          {categories.map((category) => (
            <CategorySelect
              key={category}
              text={category}
              selected={selected === category}
              onClick={() => setSelected(category)}
            />
          ))}
        </div>
      </div>
      <AdminNoticeSection notices={filteredNotices} />
    </div>
  );
};

export default AdminNoticeAllPage;
