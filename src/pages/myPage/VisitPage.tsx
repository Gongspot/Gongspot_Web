import TopHeader from "../../components/TopHeader";
import Likes from '../../assets/likes.svg?react';

const VisitPage = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-[#EFF7FB]">
      <TopHeader title="방문 공간" backButton={true} />
      <div className="flex flex-col pl-[1.25rem] py-[0.875rem] bg-white">
        <p className="text-[1rem] font-medium">25.06.16</p>
        <div className="flex items-center justify-start mt-[0.625rem]">
          <div className="flex relative">
            <img 
              src="https://images.unsplash.com/photo-1650338031221-ba71d1178d43?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Space"
              className="w-[10rem] h-[7.5rem] bg-[#B1B8C180] rounded-[0.938rem] border-[0.063rem] border-[#B1B8C180]" />
            <Likes className="absolute top-[0.625rem] right-[0.625rem] text-[#4CB1F1]" />
          </div>
          <div className="flex flex-col pl-[1.125rem] text-[0.813rem]">
            <p className="text-[0.938rem] font-semibold">비담 도서관</p>
            <p>☆ 4.8</p>
            <p>0.2km</p>
            <p>#공공도서관</p>
            <button
                className="mt-[0.5rem] px-[3.125rem] py-[0.5rem] bg-[#4CB1F1] text-white text-[0.813rem] font-medium rounded-[1.25rem]"
            >
              상세보기
            </button>
          </div>
        </div>
      </div>
      <span className="mt-[0.375rem]" />
            <div className="flex flex-col pl-[1.25rem] py-[0.875rem] bg-white">
        <p className="text-[1rem] font-medium">25.06.16</p>
        <div className="flex items-center justify-start mt-[0.625rem]">
          <div className="flex relative">
            <img 
              src="https://images.unsplash.com/photo-1650338031221-ba71d1178d43?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Space"
              className="w-[10rem] h-[7.5rem] bg-[#B1B8C180] rounded-[0.938rem] border-[0.063rem] border-[#B1B8C180]" />
            <Likes className="absolute top-[0.625rem] right-[0.625rem] text-white" />        
          </div>
          <div className="flex flex-col pl-[1.125rem] text-[0.813rem]">
            <p className="text-[0.938rem] font-semibold">비담 도서관</p>
            <p>☆ 4.8</p>
            <p>0.2km</p>
            <p>#공공도서관</p>
            <button
                className="mt-[0.5rem] px-[3.125rem] py-[0.5rem] bg-[#4CB1F1] text-white text-[0.813rem] font-medium rounded-[1.25rem]"
            >
              상세보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitPage;