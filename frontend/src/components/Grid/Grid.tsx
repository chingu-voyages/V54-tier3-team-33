import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { RootState } from "../../store/store";
import Spinner from "../../utils/Spinner";
import PriceInput from "../PriceInput.tsx";

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
  currentPage: number;
  limit: number;
  onPageChange: (page: number) => void;
}

function Grid({
  products = [],
  loading,
  error,
  currentPage,
  onPageChange,
}: GridProps) {
  const { totalPages, category, subcategory } = useSelector(
    (state: RootState) => state.products,
  );

  return (
    <div className="bg-bgcolortwo text-dark container mx-auto flex flex-col items-center justify-center py-10 ">
      <div className="flex w-full items-center gap-4 px-6 md:max-w-7xl">
        <p className="text-3xl font-semibold">{category}</p>
        <p className="text-2xl font-semibold">{subcategory}</p>
      </div>
      <PriceInput />

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

      {/* pagination */}
      <section className="flex w-full max-w-7xl items-center justify-center px-6 text-gray-500">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => onPageChange(index + 1)}
              className={`cursor-pointer rounded border border-transparent px-3 py-1 font-semibold transition-all hover:border hover:border-gray-400 ${
                currentPage === index + 1
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Grid;
