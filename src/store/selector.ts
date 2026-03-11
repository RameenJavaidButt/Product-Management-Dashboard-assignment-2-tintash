import type { RootState } from '.';
import { filteredProducts } from '../utils/filteredProducts';
import { sortByPrice } from '../utils/sortByPrice';
import { createSelector } from '@reduxjs/toolkit';

export const selectAllProducts = createSelector(
  [
    (state: RootState) => state.products.apiItems,
    (state: RootState) => state.products.localItems,
    (state: RootState) => state.products.deletedIds,
  ],
  (apiItems, localItems, deletedIds) => {
    return [
      ...apiItems.filter((p) => !deletedIds.includes(p.id)),
      ...localItems,
    ];
  }
);

export const selectVisibleProducts = createSelector(
  [
    selectAllProducts,
    (state: RootState) => state.products.filterCategory,
    (state: RootState) => state.products.searchTerm,
    (state: RootState) => state.products.sortOrder,
  ],
  (products, category, search, sortOrder) => {
    const filtered = filteredProducts(products, category, search);
    return sortByPrice(filtered, sortOrder);
  }
);
