import Nickname from "../components/sIgnup/Nickname";
import UserInfo from "../components/sIgnup/BasicInfo";
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