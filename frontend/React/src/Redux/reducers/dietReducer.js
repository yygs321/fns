import * as actionTypes from "../actions/actionTypes";

const initialState = {
  nowDiet: [],
  addedDiet: [],
  deletedDiet: [],
  fixedDiet: [],
};

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
      let updatedDeletedDiet = [...state.deletedDiet];
      let updatedAddedDiet = [...state.addedDiet];

      if (updatedDeletedDiet.some((food) => food.foodId === addFood.foodId)) {
        updatedDeletedDiet = updatedDeletedDiet.filter(
          (food) => food.foodId !== addFood.foodId
        );
      } else {
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
        (food) => food.foodId === deleteFood.foodId
      );

      if (existingAddedFoodIndex !== -1) {
        const updatedAddedDiet = [...state.addedDiet];
        updatedAddedDiet.splice(existingAddedFoodIndex, 1);

        const updatedFixedDiet = state.fixedDiet.filter(
          (food) => food.foodId !== deleteFood.foodId
        );

        return {
          ...state,
          nowDiet: state.nowDiet.filter(
            (food) => food.foodId !== deleteFood.foodId
          ),
          addedDiet: updatedAddedDiet,
          fixedDiet: updatedFixedDiet,
        };
      } else {
        return {
          ...state,
          nowDiet: state.nowDiet.filter(
            (food) => food.foodId !== deleteFood.foodId
          ),
          deletedDiet: [...state.deletedDiet, deleteFood],
        };
      }
    case actionTypes.FIXED_FROM_DIET:
      const fixFood = action.payload;
      const existingFood = state.fixedDiet.find(
        (food) => food.foodId === fixFood.foodId
      );
      const existingAddIndex = state.addedDiet.findIndex(
        (food) => food.foodId === fixFood.foodId
      );

      if (existingFood) {
        const updatedFixedDiet = state.fixedDiet.map((food) =>
          food.foodId === fixFood.foodId ? fixFood : food
        );
        return {
          ...state,
          nowDiet: state.nowDiet.map((food) =>
            food.foodId === fixFood.foodId ? fixFood : food
          ),
          fixedDiet: updatedFixedDiet,
        };
      } else if (existingAddIndex !== -1) {
        const updatedAddedDiet = [...state.addedDiet];
        updatedAddedDiet[existingAddIndex] = fixFood;
        return {
          ...state,
          nowDiet: state.nowDiet.map((food) =>
            food.foodId === fixFood.foodId ? fixFood : food
          ),
          addedDiet: updatedAddedDiet,
        };
      } else {
        return {
          ...state,
          nowDiet: state.nowDiet.map((food) =>
            food.foodId === fixFood.foodId ? fixFood : food
          ),
          fixedDiet: [...state.fixedDiet, fixFood],
        };
      }
    default:
      return state;
  }
};
