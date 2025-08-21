import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../apis/axios";
import { useAuth } from "../../contexts/AuthContext";
import Symbol from "../../assets/symbol.svg?react";

const OauthKakaoCallback = () => {
  const navigate = useNavigate();
  const { setIsAdmin } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (!code) {
      navigate("/");
      return;
    }

    const fetchLogin = async () => {
      try {
        console.log("state 값:", state);
        const { data } = await axiosInstance.get(
          `/auth/oauth/kakao/callback?code=${code}`
        );

        if (data.isSuccess) {
          const { accessToken, refreshToken, isAdmin, isNewUser } = data.result;
          setIsAdmin(isAdmin);

          if (state === "local") {
            const baseUrl = isNewUser
              ? "http://localhost:5182/signup"
              : "http://localhost:5182/home";
            const redirectUrl = new URL(baseUrl);
            redirectUrl.searchParams.append("state", state);
            redirectUrl.searchParams.append("accessToken", accessToken);
            redirectUrl.searchParams.append("refreshToken", refreshToken);
            redirectUrl.searchParams.append("isAdmin", isAdmin ? "true" : "false");
            redirectUrl.searchParams.append("isNewUser", isNewUser ? "true" : "false");
            window.location.href = redirectUrl.toString();
          } else {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
            localStorage.setItem("isNewUser", JSON.stringify(isNewUser));
          }
          
          if (isNewUser) {
            navigate("/signup");
          } else {
            navigate("/home");
          }
        } else {
          alert(data.message || "로그인에 실패했습니다.");
          navigate("/");
        }
      } catch (err) {
        console.error("Error during Kakao OAuth callback:", err);
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.data &&
          err.response.data.code === "OAUTH4003"
        ) {
          navigate("/signup");
        } else {
          alert("서버 오류가 발생했습니다.");
          navigate("/");
        }
      }
    };

    fetchLogin();
  }, [navigate, setIsAdmin]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-scale-bounce">
        <Symbol className="text-[#4CB1F1]" />
      </div>
      <span className="mt-[1rem] text-[3rem] text-[#8F9098]">로그인 중이에요!</span>
    </div>
  );
};

export default OauthKakaoCallback;