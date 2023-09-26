import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLogin: false,
  accessToken: "",
  refreshToken: "",
};

// 로그인 관련 리듀서
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        isLogin: false,
        accessToken: "",
        refreshToken: "",
      };
    default:
      return state;
  }
};
