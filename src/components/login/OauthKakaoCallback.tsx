import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../apis/axios";

const OauthKakaoCallback = () => {
  const navigate = useNavigate();

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
          const { accessToken, refreshToken } = data.result;
          console.log("data.result:", data.result);

          if (state === "local") {
            const redirectUrl = new URL("http://localhost:5182/home");
            redirectUrl.searchParams.append("state", state);
            redirectUrl.searchParams.append("accessToken", accessToken);
            redirectUrl.searchParams.append("refreshToken", refreshToken);
            window.location.href = redirectUrl.toString();
          } else {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
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
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <span>로그인 처리 중...</span>
    </div>
  );
};

export default OauthKakaoCallback;