import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/product';

interface ProductsState {
  apiItems: Product[]; // products fetched from API
  localItems: Product[]; // products added by user
  deletedIds: number[]; // track deleted API product IDs
  filterCategory: string;
  searchTerm: string;
  sortOrder: string;
}
const savedProducts = localStorage.getItem('products');
const parsedProducts = savedProducts ? JSON.parse(savedProducts) : {};

const initialState: ProductsState = {
  apiItems: Array.isArray(parsedProducts.apiItems)
    ? parsedProducts.apiItems
    : [],
  localItems: Array.isArray(parsedProducts.localItems)
    ? parsedProducts.localItems
    : [],
  deletedIds: Array.isArray(parsedProducts.deletedIds)
    ? parsedProducts.deletedIds
    : [],
  filterCategory: parsedProducts.filterCategory || '',
  searchTerm: parsedProducts.searchTerm || '',
  sortOrder: parsedProducts.sortOrder || '',
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.apiItems = action.payload;
      localStorage.setItem('products', JSON.stringify(state));
    },

    addProduct: (state, action: PayloadAction<Product>) => {
      state.localItems.push(action.payload);
      state.localItems = state.localItems || [];

      localStorage.setItem('products', JSON.stringify(state));
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.localItems = state.localItems.filter((p) => p.id !== id);
      if (state.apiItems.find((p) => p.id === id)) {
        state.deletedIds.push(id);
      }
      localStorage.setItem('products', JSON.stringify(state));
    },

    restoreApiProducts: (state) => {
      const stored = JSON.parse(localStorage.getItem('products') || '{}');
      state.apiItems = stored.apiItems || state.apiItems; // fallback to current API items
      state.deletedIds = [];
      localStorage.setItem('products', JSON.stringify(state));
    },
    restoreStateFromLocalStorage: (state) => {
      const stored = JSON.parse(localStorage.getItem('products') || '{}');
      state.apiItems = stored.apiItems || [];
      state.localItems = stored.localItems || [];
      state.deletedIds = stored.deletedIds || [];
      state.filterCategory = stored.filterCategory || '';
      state.searchTerm = stored.searchTerm || '';
      state.sortOrder = stored.sortOrder || '';
    },

    filterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
    },
    searchProduct: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    sortbyPrice: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  deleteProduct,
  restoreApiProducts,
  restoreStateFromLocalStorage,
  filterCategory,
  searchProduct,
  sortbyPrice,
} = productsSlice.actions;
export default productsSlice.reducer;
