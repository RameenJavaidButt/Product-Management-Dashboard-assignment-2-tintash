import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../store/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

//types for useSelector & useDispatch
export type RootState = ReturnType<typeof store.getState>;//This creates a TypeScript type of the store state.
/*

store state type becomes
{
  products: {
    items: Product[]
  }
} 
  
*/
export type AppDispatch = typeof store.dispatch;