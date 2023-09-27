import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/actions/actions";
import { RefreshToken } from "../Common/Component/RefreshToken";

const KakaoCallback = () => {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    kakaoLogin(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const kakaoLogin = async (code) => {
    try {
      const res = await axios({
        method: "post",
        url: `${SERVER_API_URL}/auth/kakao`,
        data: {
          code: code,
        },
      });

      console.log('#1');
      console.log(res.data.message);
      console.log('#2');
      console.log(res.data.data.tokenResponseDto);
      console.log('#3');
      console.log(res);
      console.log(res.data);
      console.log('#4');
      console.log(res.data.data);
      const tokenData = res.data.data.tokenDto;

      dispatch(
        userLogin({
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
        })
      );
      
      if (tokenData.expirationTime < 200000) {
        await RefreshToken();
      }

      if (!res.response.data.hasProfile) {
        // 프로필이 없다면 정보입력 페이지로 이동.
        navigate(`/info`);
      } else {
        navigate(`/main`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p>로그인 중 입니다. 잠시만 기다려주세요.</p>
    </div>
  );
};
export default KakaoCallback;
