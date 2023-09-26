// RefreshToken.js 파일

import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../Redux/actions/actions";

const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

export async function RefreshToken() {
  const dispatch = useDispatch();

  const refreshToken = useSelector((state) => {
    return state.auth.refreshToken;
  });

  try {
    const res = await axios({
      method: "post",
      url: `${SERVER_API_URL}/auth/refresh`,
      data: {
        refreshToken: refreshToken,
      },
    });

    console.log(res);
    const tokenData = res.data.data;
    dispatch(
      userLogin({
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
      })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
}
