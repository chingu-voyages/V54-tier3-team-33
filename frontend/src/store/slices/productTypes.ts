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
}

export interface ProductListProps {
  loading: boolean;
  error: string | null;
  searchResults: Product[];
}
