export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  deliveryCost: number;
  country: string;
  category: string;
  description: string;
};
  
export interface ProductState {
  products: Product[];
  searchResults: Product[];
  loading: boolean;
  error: string | null;
}

export interface ProductListProps {
  loading: boolean;
  error: string | null;
  searchResults: Product[];
}