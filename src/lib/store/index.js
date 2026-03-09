import { combineReducers, configureStore } from "@reduxjs/toolkit";
import athleteFormReducer from "./feature/athleteFormSlice";
import authSlice from "./feature/authSlice";

const rootReducer = combineReducers({
  athleteForm: athleteFormReducer,
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
