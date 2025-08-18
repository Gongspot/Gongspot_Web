import { useEffect, useState } from "react";
import TopHeader from "../../components/TopHeader";
import CategorySelect from "../../components/admin/notice/CategorySelect";
import Search from "../../components/mypage/notice/Search";
import AdminNoticeSection from "../../components/admin/notice/AdminNoticeSection";
import { getNoticeAdmin } from "../../apis/admin";
import type { NoticeAdmin } from "../../types/admin";

const types = ['전체', '배너', '일반'];
const typeMap: Record<string, "ALL" | "B" | "N"> = {
  "전체": "ALL",
  "배너": "B",
  "일반": "N",
};

const AdminNoticeAllPage = () => {
  const [selected, setSelected] = useState<string>('전체');
  const [notices, setNotices] = useState<NoticeAdmin[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNoticeAdmin(typeMap[selected]);
        if (data.isSuccess) {
          setNotices(data.result.notificationBannerList);
        }
      } catch (e) {
        console.error("Error fetching notice data:", e);
      }
    };
    fetchNotices();
  }, [selected]);

  const filteredNotices = notices.filter((item) =>
    (item.title ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <TopHeader title="공지사항" backButton={true} />
      <div className="flex flex-col items-start mx-[0.75rem] mt-[0.875rem] mb-[0.625rem] gap-y-[0.375rem]">
        <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="flex gap-x-[0.5rem]">
          {types.map((type) => (
            <CategorySelect
              key={type}
              text={type}
              selected={selected === type}
              onClick={() => setSelected(type)}
            />
          ))}
        </div>
      </div>
      <AdminNoticeSection notices={filteredNotices} />
    </div>
  );
};

export default AdminNoticeAllPage;
