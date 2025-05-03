import Card from "./Card.tsx";
import Spinner from "../../utils/Spinner.tsx";

interface Product {
  id: number;
  name: string;
  image: string | string[];
  price: number;
  description: string;
  category: string;
  subcategory: string;
  rating: number;
  stock: number;
  sold: number;
}

interface GridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  limit: number;
}

function Grid({ products = [], loading, error }: GridProps) {
  return (
    <div className="bg-bgcolortwo text-dark container mx-auto flex flex-col items-center justify-center">
      <section className="my-6 flex w-full flex-col items-center gap-6 px-4 md:max-w-7xl">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid w-full gap-3 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {products.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </section>
    </div>
  );
}

export default Grid;
