import * as actionTypes from "./actionTypes";

// 식단 입력 데이터 관련 액션

export const nowTimeDiet = (diet) => ({
  type: actionTypes.NOW_TIME_DIET,
  payload: diet,
});

export const addToTimeDiet = (food) => ({
  type: actionTypes.ADD_TO_TIME_DIET,
  payload: food,
});
