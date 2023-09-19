import * as actionTypes from "../actions/actionTypes";

const initialState = {
  nowTimeDiet: [],
};

// 식단 관련 리듀서
export const dietReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOW_TIME_DIET:
      return {
        ...state,
        nowTimeDiet: action.payload,
      };
    case actionTypes.ADD_TO_TIME_DIET:
      return {
        ...state,
        nowTimeDiet: [...state.nowTimeDiet, action.payload],
      };
    default:
      return state;
  }
};
