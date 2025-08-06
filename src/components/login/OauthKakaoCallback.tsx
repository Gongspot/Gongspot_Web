// src/pages/OauthKakaoCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../apis/axios";

const OauthKakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      navigate("/");
      return;
    }

    const fetchLogin = async () => {
      try {
        const response = await axiosInstance.get(
          `/auth/oauth/kakao/callback?code=${code}`
        );
        const data = response.data;

        if (data.isSuccess) {
          const { accessToken, refreshToken } = data.result;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          navigate("/home");
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
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <span>로그인 처리 중...</span>
    </div>
  );
};

export default OauthKakaoCallback;