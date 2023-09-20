import * as actionTypes from "../actions/actionTypes";

const initialState = {
  alreadyDiet: [],
  nowDiet: [],
  addedDiet: [],
  deletedDiet: [],
  fixedDiet: [],
};

// 식단 관련 리듀서
// 일단 food.name으로 해놓은 것들을 나중에 API 연결 하면서 음식 ID로 바꾸기

export const dietReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOW_DIET:
      return {
        ...state,
        alreadyDiet: action.payload,
        nowDiet: action.payload,
      };
    case actionTypes.RESET_DIET:
      return {
        ...state,
        alreadyDiet: [],
        nowDiet: [],
        addedDiet: [],
        deletedDiet: [],
        fixedDiet: [],
      };
    case actionTypes.ADD_TO_DIET:
      const addFood = action.payload;
      let updatedDeletedDiet = [...state.deletedDiet];
      let updatedAddedDiet = [...state.addedDiet];

      // 이미 삭제된 음식 목록에 있는 경우, 해당 음식을 삭제목록에서 제거
      if (updatedDeletedDiet.some((food) => food.name === addFood.name)) {
        updatedDeletedDiet = updatedDeletedDiet.filter(
          (food) => food.name !== addFood.name
        );
      }
      // 아니라면 새 음식으로 추가
      else {
        updatedAddedDiet = [...updatedAddedDiet, addFood];
      }
      return {
        ...state,
        nowDiet: [...state.nowDiet, addFood],
        deletedDiet: updatedDeletedDiet,
        addedDiet: updatedAddedDiet,
      };
    case actionTypes.DELETE_FROM_DIET:
      const deleteFood = action.payload;

      const existingAddedFoodIndex = state.addedDiet.findIndex(
        (food) => food.name === deleteFood.name
      );

      if (existingAddedFoodIndex !== -1) {
        // 이미 추가된 음식 목록에 있는 경우, 해당 음식을 추가목록에서 제거
        const updatedAddedDiet = [...state.addedDiet];
        updatedAddedDiet.splice(existingAddedFoodIndex, 1);

        // 수정된 음식이면 수정목록에서도 제거
        const updatedFixedDiet = state.fixedDiet.filter(
          (food) => food.name !== deleteFood.name
        );

        return {
          ...state,
          nowDiet: state.nowDiet.filter(
            (food) => food.name !== deleteFood.name
          ),
          addedDiet: updatedAddedDiet,
          fixedDiet: updatedFixedDiet,
        };
      } else {
        return {
          ...state,
          nowDiet: state.nowDiet.filter(
            (food) => food.name !== deleteFood.name
          ),
          deletedDiet: [...state.deletedDiet, deleteFood],
        };
      }
    case actionTypes.FIXED_FROM_DIET:
      const fixFood = action.payload;
      const existingFood = state.fixedDiet.find(
        (food) => food.name === fixFood.name
      );
      const existingAddIndex = state.addedDiet.findIndex(
        (food) => food.name === fixFood.name
      );

      if (existingFood) {
        const updatedFixedDiet = state.fixedDiet.map((food) =>
          food.name === fixFood.name ? fixFood : food
        );
        return {
          ...state,
          nowDiet: state.nowDiet.map((food) =>
            food.name === fixFood.name ? fixFood : food
          ),
          fixedDiet: updatedFixedDiet,
        };
      } else if (existingAddIndex !== -1) {
        const updatedAddedDiet = [...state.addedDiet];
        updatedAddedDiet[existingAddIndex] = fixFood; // 기존 인덱스에 있는 값을 fixFood로 교체
        return {
          ...state,
          nowDiet: state.nowDiet.map((food) =>
            food.name === fixFood.name ? fixFood : food
          ),
          addedDiet: updatedAddedDiet,
        };
      } else {
        return {
          ...state,
          nowDiet: state.nowDiet.map((food) =>
            food.name === fixFood.name ? fixFood : food
          ),
          fixedDiet: [...state.fixedDiet, fixFood],
        };
      }
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
// 수정한거 또 수정하면??
// => 이미 fixed에 있는거면 기존에 있는거 없애고 새로운거 넣기
