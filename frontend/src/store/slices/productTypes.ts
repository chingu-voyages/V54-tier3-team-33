export type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    deliveryCost: number;
    country: string;
    category: string;
  };
  
export interface ProductState {
    products: Product[];
    searchResults: Product[];
    loading: boolean;
    error: string | null;
  }