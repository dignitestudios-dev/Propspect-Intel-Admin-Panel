import { combineReducers, configureStore } from "@reduxjs/toolkit";
import athleteFormReducer from "./feature/athleteFormSlice";

const rootReducer = combineReducers({
  athleteForm: athleteFormReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
