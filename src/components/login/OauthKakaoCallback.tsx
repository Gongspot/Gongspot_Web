import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../apis/axios";
import { useAuth } from "../../contexts/AuthContext";

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
          const { accessToken, refreshToken, isAdmin } = data.result;
          setIsAdmin(isAdmin);

          if (state === "local") {
            const redirectUrl = new URL("http://localhost:5182/home");
            redirectUrl.searchParams.append("state", state);
            redirectUrl.searchParams.append("accessToken", accessToken);
            redirectUrl.searchParams.append("refreshToken", refreshToken);
            redirectUrl.searchParams.append("isAdmin", isAdmin ? "true" : "false");
            window.location.href = redirectUrl.toString();
          } else {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
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
    <div className="flex justify-center items-center h-screen">
      <span>로그인 처리 중...</span>
    </div>
  );
};

export default OauthKakaoCallback;