import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {Product} from "../types/product"; 

/*{
  products: {
    items: []:Product[]
  }

PayloadAction<Product[]>:
{
  type: "products/addProduct",
  payload: {...}
}
  payload must be a Product
}*/

interface ProductsState {
  items: Product[];
}
const savedProducts = localStorage.getItem("products");
const initialState: ProductsState = {//slice = state + reducers + actions
  //items: [],
   items: savedProducts ? JSON.parse(savedProducts) : [],

};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {//(oldState, action) → newState
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;//when called dispatch(setProducts(productsFromAPI)),items = productsFromAPI
      localStorage.setItem("products", JSON.stringify(state.items));

    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.items));

    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);//All products except this ID remain.
      localStorage.setItem("products", JSON.stringify(state.items));

    },
  },
});

export const { setProducts, addProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;//This reducer is used inside the store