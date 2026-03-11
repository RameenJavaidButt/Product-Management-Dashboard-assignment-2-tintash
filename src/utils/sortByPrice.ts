import type { Product } from '../types/product';

export function sortByPrice(products: Product[], price: string) {
  if (!products) return [];

  if (price === 'low-to-high') {
    return [...products].sort((a, b) => a.price - b.price);
  }
  if (price === 'high-to-low') {
    return [...products].sort((a, b) => b.price - a.price);
  }
  return products;
}
