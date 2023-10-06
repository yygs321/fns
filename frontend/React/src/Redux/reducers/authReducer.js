import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLogin: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};
