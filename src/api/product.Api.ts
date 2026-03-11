import axios from 'axios';
import type { Product } from '../types/product';

const BASE_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(BASE_URL);
  return response.data;
};
