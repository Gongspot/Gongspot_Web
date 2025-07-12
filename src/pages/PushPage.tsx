import ToggleSwitch from "../components/myPage/ToggleSwitch";
import TopHeader from "../components/TopHeader";
import { useEffect, useState } from "react";

const PushPage = () => {
  const [isPushOn, setIsPushOn] = useState(false);
  const [isEventOn, setIsEventOn] = useState(false);
  const [isCustomSpaceOn, setIsCustomSpaceOn] = useState(false);
  
  const handlePushChange = (checked: boolean) => {
    setIsPushOn(checked);
    setIsEventOn(checked);
    setIsCustomSpaceOn(checked);
  };

  useEffect(() => {
    if (isEventOn && isCustomSpaceOn) {
      setIsPushOn(true);
    } else if (!isEventOn && !isCustomSpaceOn) {
      setIsPushOn(false);
    }
  }, [isEventOn, isCustomSpaceOn]);

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <TopHeader title="알림 설정" backButton={true} />
      <div className="flex flex-col justify-center mt-[2.25rem] mx-[1.438rem]">
          <ToggleSwitch text="푸시알림" checked={isPushOn} onChange={handlePushChange} />
        <div className="w-full mt-[0.875rem] border-b-[0.063rem] border-[#CCCCCC]" />
        <div className="flex flex-col justify-center mt-[1rem] ml-[1.563rem] space-y-[1.25rem]">
          <ToggleSwitch text="앱 내 이벤트 및 혜택 알림" checked={isEventOn} onChange={setIsEventOn} />
          <ToggleSwitch text="맞춤형 공간 알림" checked={isCustomSpaceOn} onChange={setIsCustomSpaceOn} />
        </div>
      </div>
    </div>
  );
};

export default PushPage;
