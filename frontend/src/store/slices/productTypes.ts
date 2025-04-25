import {SortKey} from "../../components/Sorting.tsx";

export type Product = {
  id: number;
  name: string;
  image: string | string[];
  description: string;
  price: number;
  category: string;
  subcategory: string;
  rating: number;
  stock: number;
  sold: number;
};

export type CartItem  = {
  product: Product,
  quantity: number
}

export interface ProductState {
  products: Product[];
  searchResults: Product[];
  loading: boolean;
  totalPages: number;
  error: string | null;
  searchQuery: string;
  category: string;
  subcategory: string;
  minPrice: number;
  maxPrice: number;
  sort: SortKey
}

export interface ProductListProps {
  loading: boolean;
  error: string | null;
  searchResults: Product[];
}
