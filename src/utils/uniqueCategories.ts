import type { Product } from "../types/product";

export function uniqueCategories(products: Product[]) {
    return [
        ...new Set(products.map((product) => product.category.toLowerCase()))
    ].sort();
}