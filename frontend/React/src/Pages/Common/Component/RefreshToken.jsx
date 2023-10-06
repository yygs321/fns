import axios from "axios";

export const RefreshToken = async (dispatch) => {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

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

    const tokenData = res.data.data;

    sessionStorage.setItem("accessToken", tokenData.accessToken);
    sessionStorage.setItem("refreshToken", tokenData.refreshToken);
    sessionStorage.setItem("expirationTime", tokenData.expirationTime);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
