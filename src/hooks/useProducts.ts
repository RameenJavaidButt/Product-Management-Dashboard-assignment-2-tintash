import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/product.Api";
import type { Product } from "../types/product";


export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, //cache for 5 minutes
  }
  );

};
