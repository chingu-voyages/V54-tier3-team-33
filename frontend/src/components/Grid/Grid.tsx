import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { RootState } from "../../store/store";
import Spinner from "../utils/Spinner.tsx";

interface Product {
  id: number;
  name: string;
  image: string | string[];
  price: number;
  description: string;
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
  const totalPages = useSelector(
    (state: RootState) => state.products.totalPages,
  );

  return (
    <div className="bg-bgcolortwo text-dark container mx-auto flex flex-col items-center justify-center py-16">
      <section className="flex w-full flex-col items-center gap-6 px-6 md:max-w-[65rem]">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid w-full gap-6 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {products.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </section>
      {/* Pagination */}
      <section className="mt-8 flex w-full max-w-[65rem] items-center justify-center px-6 text-gray-500">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => onPageChange(index + 1)}
              className={`rounded px-3 py-1 text-sm ${
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
