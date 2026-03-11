import type { Product } from '../types/product';

export function filteredProducts(
  products: Product[],
  category: string,
  search: string
) {
  return products.filter((p) => {
    const byCategory = category ? p.category === category : true;
    const bySearch = search
      ? p.title.toLowerCase().includes(search.toLowerCase())
      : true;

    return byCategory && bySearch;
  });
}
