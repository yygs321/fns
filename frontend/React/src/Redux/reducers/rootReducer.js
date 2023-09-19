import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist"; // redux-persist의 persistReducer import
import storage from "redux-persist/lib/storage/session"; // storage engine

import { authReducer } from "./authReducer";
import { dietReducer } from "./dietReducer";

// 로컬 스토리지로 바꾸고 싶다면 storage의 from 해오는 곳을 lib/storage 로 바꿀 것.

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist 적용될 리듀서
};

const rootReducer = combineReducers({
  auth: authReducer,
  diet: dietReducer,
  // 이런 식으로 리듀서 추가해가기
});

export default persistReducer(persistConfig, rootReducer);
