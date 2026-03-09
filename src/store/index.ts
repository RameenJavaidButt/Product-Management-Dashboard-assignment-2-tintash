import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../store/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// types for useSelector & useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;