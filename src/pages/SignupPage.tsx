import Nickname from "../components/signup/Nickname";
import UserInfo from "../components/signup/BasicInfo";
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