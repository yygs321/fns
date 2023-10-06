import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import { authReducer } from "./authReducer";
import { dietReducer } from "./dietReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  diet: dietReducer,
});

export default persistReducer(persistConfig, rootReducer);
