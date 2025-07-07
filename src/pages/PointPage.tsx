import TopHeader from "../components/TopHeader";
import MainList from "../components/point/MainList";
import MyPointSection from "../components/point/MyPointSection";

const point = 56;

const PointPage = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-[#EFF7FB]">
      <TopHeader title="나의 포인트" backButton={true} />
      <MyPointSection point={point} />
      <div className="flex-1 bg-white border border-[#B1B8C154] rounded-tl-[1.25rem] rounded-tr-[1.25rem]">
        <MainList />
      </div>
    </div>
  );
};

export default PointPage;