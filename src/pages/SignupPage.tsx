import Nickname from "../components/SIgnup/Nickname";
import UserInfo from "../components/SIgnup/BasicInfo";
import { useState } from "react";

const SignupPage = () => {
  const [step, setStep] = useState("nickname");

  const handleNext = () => {
    setStep("userinfo");
  };

  return (
    <div>
      {step === "nickname" && <Nickname onNext={handleNext} />}
      {step === "userinfo" && <UserInfo />}
    </div>
  );
};
export default SignupPage;