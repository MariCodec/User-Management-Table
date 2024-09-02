import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import filterReducers from "./filterSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    filter: filterReducers,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
