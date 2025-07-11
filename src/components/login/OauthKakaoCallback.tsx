// src/pages/OauthKakaoCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OauthKakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    console.log("Kakao OAuth code:", code);

    if (!code) {
      navigate("/");
      return;
    }

    const fetchLogin = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users/kakao/login/code",
          { code }
        );
        const data = response.data;

        if (data.isSuccess) {
          const { accessToken, refreshToken } = data.result[0];
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          navigate("/home");
        } else if (data.code === "USER4001") {
          navigate("/signup");
        } else {
          alert(data.message || "로그인에 실패했습니다.");
          navigate("/");
        }
      } catch (err) {
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.data &&
          err.response.data.code === "USER4001"
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