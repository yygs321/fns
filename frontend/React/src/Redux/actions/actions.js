import * as actionTypes from "./actionTypes";

// 식단 입력 데이터 관련 액션

export const nowDiet = (diet) => ({
  type: actionTypes.NOW_DIET,
  payload: diet,
});

export const resetDiet = () => ({
  type: actionTypes.RESET_DIET,
});

export const addToDiet = (food) => ({
  type: actionTypes.ADD_TO_DIET,
  payload: food,
});

export const deleteFromDiet = (food) => ({
  type: actionTypes.DELETE_FROM_DIET,
  payload: food,
});

export const fixedFromDiet = (food) => ({
  type: actionTypes.FIXED_FROM_DIET,
  payload: food,
});

// 로그인 데이터 관련 액션

export const userLogin = () => ({
  type: actionTypes.USER_LOGIN,
});

export const userLogout = () => ({
  type: actionTypes.USER_LOGOUT,
});
