import Nickname from "../components/signup/Nickname";
import BasicInfo from "../components/signup/BasicInfo";
import { useState } from "react";

const SignupPage = () => {
  const [step, setStep] = useState("nickname");
  const [nickname, setNickname] = useState("");

  const handleNext = () => {
    setStep("userinfo");
  };

  return (
    <div>
      {step === "nickname" && 
        <Nickname 
          onNext={handleNext} 
          nickname={nickname}
          setNickname={setNickname} 
        />}
      {step === "userinfo" && <BasicInfo nickname={nickname} />}
    </div>
  );
};
export default SignupPage;