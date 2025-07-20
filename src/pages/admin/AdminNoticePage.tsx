import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminBottomNavBar from "../../components/AdminBottomNavBar";
import TopNavBar from "../../components/TopNavBar";
import { FaPen } from "react-icons/fa";

// 더미 데이터
const NOTICE_TABS = [
  { key: "all", label: "전체" },
  { key: "banner", label: "배너" },
  { key: "normal", label: "일반" },
] as const;

type NoticeType = "banner" | "normal";
type TabType = "all" | NoticeType;

interface Notice {
  id: number;
  type: NoticeType;
  title: string;
  content: string;
  date: string;
  views: number;
}

const dummyNotices: Notice[] = [
  {
    id: 1,
    type: "normal",
    title: "시스템 점검 안내 - 2025년 7월 15일",
    content: "안녕하세요. 서비스 개선을 위한 정기 점검이 예정되어 있습니다",
    date: "2025.07.08",
    views: 856,
  },
  {
    id: 2,
    type: "normal",
    title: "공스팟 이용 관련 안내 사항",
    content: "2025년 7월부터 고객센터 운영시간이 변경됩니다.",
    date: "2025.07.08",
    views: 856,
  },
  {
    id: 3,
    type: "banner",
    title: "공스팟 사용 설명서",
    content: "공스팟, 어떻게 쓸지 모르겠다면 이걸따라 해보자.",
    date: "2025.07.08",
    views: 856,
  },
  {
    id: 4,
    type: "banner",
    title: "공스팟 사용 설명서",
    content: "공스팟, 어떻게 쓸지 모르겠다면 이걸따라 해보자.",
    date: "2025.07.08",
    views: 856,
  },
];

const AdminNoticePage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabType>("all");

  // 탭별 필터
  const filtered =
    tab === "all" ? dummyNotices : dummyNotices.filter(n => n.type === tab);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] pb-32">
      <TopNavBar />

      <div className="flex-1 px-4 py-4">
        {/* 공지 작성 버튼 */}
        <button
          className="w-full flex items-center gap-2 border border-[#D1E2FC] bg-white py-2 px-3 rounded-xl text-[#4CB1F1] font-semibold mb-4"
          onClick={() => navigate("/admin/notices/new")}
        >
          <FaPen className="text-[#4CB1F1]" />
          새 공지 작성하기
        </button>

        {/* 탭 버튼 */}
        <div className="flex gap-2 mb-4">
          {NOTICE_TABS.map((t) => (
            <button
              key={t.key}
              className={`rounded-full px-4 py-1 text-sm font-semibold border transition ${
                tab === t.key
                  ? "bg-[#EFF7FB] text-[#4CB1F1] border-[#4CB1F1]"
                  : "bg-white text-[#8F9098] border-[#D1E2FC]"
              }`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 공지 카드 리스트 (최대 3개만) */}
        <div className="space-y-4">
          {filtered.slice(0, 3).map((n) => (
            <div key={n.id} className="bg-white rounded-xl px-5 py-4 shadow-sm border border-[#E8E8E8] relative">
              <div className="flex gap-2 mb-1">
                <span className="text-xs px-2 py-[2px] rounded-full font-bold border  text-[#8F9098] border-[#8F9098]">
                  {n.type === "banner" ? "배너" : "일반"}
                </span>
                <span className="flex-1 text-xs text-gray-400" />
                <button className="text-xs text-[#A3A3A3] px-2">⋮ 수정</button>
              </div>
              <div className="font-bold text-base mb-1">{n.title}</div>
              <div className="text-xs text-gray-600 mb-2 truncate">{n.content}</div>
              <div className="flex items-center text-xs text-gray-400 gap-3">
                <span>{n.date}</span>
                <span>👁 {n.views}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <button
          className="w-full bg-white border border-[#E7EDF3] rounded-xl py-2 mt-6 font-semibold text-gray-600 hover:bg-[#F3F7FA]"
          onClick={() => navigate("/admin/notices/all")}
        >
          더보기
        </button>
      </div>
      <AdminBottomNavBar />
    </div>
  );
};

export default AdminNoticePage;
