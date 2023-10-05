// RefreshToken.js 파일

// import { useSelector } from "react-redux";
// import { userLogin } from "../../../Redux/actions/actions";
import axios from "axios";

export const RefreshToken = async (dispatch) => {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  // useDispatch를 함수형 컴포넌트 밖에서 사용하니 에러가 터지는 중

  // const accessToken = useSelector((state) => {
  //   return state.auth.accessToken;
  // });
  // const refreshToken = useSelector((state) => {
  //   return state.auth.refreshToken;
  // });

  // 액세스 토큰, 리프레시 토큰 가져오기

  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  try {
    const res = await axios({
      method: "post",
      url: `${SERVER_API_URL}/auth/refresh`,
      headers: {
        "X-FNS-ACCESSTOKEN": accessToken,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    console.log(res);
    const tokenData = res.data.data;

    sessionStorage.setItem("accessToken", tokenData.accessToken);
    sessionStorage.setItem("refreshToken", tokenData.refreshToken);
    sessionStorage.setItem("expirationTime", tokenData.expirationTime);

    // dispatch(
    //   userLogin({
    //     accessToken: tokenData.accessToken,
    //     refreshToken: tokenData.refreshToken,
    //   })
    // );
  } catch (err) {
    console.log(err);
  }
};
