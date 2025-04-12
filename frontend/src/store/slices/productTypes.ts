export type Product = {
  id: number;
  name: string;
  image: string | string[];
  description: string;
  price: number;
  deliveryCost: number;
  country: string;
  category: string;
  subcategory: string;
};

export interface ProductState {
  products: Product[];
  searchResults: Product[];
  loading: boolean;
  totalPages: number;
  error: string | null;
  searchQuery: string;
}

export interface ProductListProps {
  loading: boolean;
  error: string | null;
  searchResults: Product[];
}