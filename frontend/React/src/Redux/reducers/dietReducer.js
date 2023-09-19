import * as actionTypes from "../actions/actionTypes";

const initialState = {
  nowDiet: [],
  addedDiet: [],
  deletedDiet: [],
  fixedDiet: [],
};

// 식단 관련 리듀서
export const dietReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOW_DIET:
      return {
        ...state,
        nowDiet: action.payload,
      };
    case actionTypes.RESET_DIET:
      return {
        ...state,
        nowDiet: [],
        addedDiet: [],
        deletedDiet: [],
        fixedDiet: [],
      };
    case actionTypes.ADD_TO_DIET:
      const addFood = action.payload;
      if (state.deletedDiet.includes(addFood)) {
        return {
          ...state,
          deletedDiet: state.deletedDiet.filter((prev) => prev !== addFood),
        };
      } else {
        return {
          ...state,
          addedDiet: [...state.addedDiet, addFood],
        };
      }
    case actionTypes.DELETE_FROM_DIET:
      const deleteFood = action.payload;
      if (state.addedDiet.includes(deleteFood)) {
        return {
          ...state,
          addedDiet: state.addedDiet.filter((prev) => prev !== deleteFood),
        };
      } else {
        return {
          ...state,
          deletedDiet: [...state.deletedDiet, deleteFood],
          fixedDiet: state.fixedDiet.filter((prev) => prev !== deleteFood),
        };
      }
    case actionTypes.FIXED_FROM_DIET:
      return {
        ...state,
        fixedDiet: [...state.fixedDiet, action.payload],
      };
    default:
      return state;
  }
};

// 처음 진입 시, nowDiet에 기존 식단 저장.
// 삭제하는 음식은 deleted에 추가, 추가하는 음식은 added에 추가, 수정(음식량 조정)한 음식은 fixed에 추가
// 만약 삭제했다가 다시 추가하면??
// => 추가하는 로직에서 deleted에 그 음식이 있다면 deleted에서 지우는 것.
// 추가했다가 삭제한다면??
// => added에 그 음식이 있다면 added에서 지우는 것.
// 수정했다가 삭제한다면??
// => fixed에서도 같이 지워야할 듯.
// 음식 추가하고 수정도 하면??
// => added에 있는건 fixed에 들어가지 않도록. (즉 fixed는 사전 체크로 nowDiet에 있는 것만 dispatch하기)
// 음식 삭제했다가 추가하고 수정하면???
// => 헉... 근데 그럼 걍 수정 아님? 수정은 기존 식단에 들어있던 것만 하는거니까.
