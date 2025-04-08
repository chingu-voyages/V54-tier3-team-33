import Card from "../Card/Card";

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
}

function Grid({ products = [], loading, error }: GridProps) {
  console.log("Grid: Products:", products); // Log the products array
  console.log("Grid: Loading:", loading); // Log the loading state
  console.log("Grid: Error:", error); // Log the error state
  return (
    <div className="bg-bgcolortwo text-dark container mx-auto flex flex-col items-center justify-center py-16">
      <section className="flex w-full flex-col items-center gap-6 px-6 md:max-w-[65rem]">
        {/* dynamic product grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid w-full gap-6 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {products.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No products found. Try searching for something!
          </p>
        )}
      </section>
      {/* pagination */}
      <section className="mt-8 flex w-full max-w-[65rem] items-center justify-center px-6 text-gray-500">
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }, (_, index) => (
            <button
              key={index + 1}
              className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-200"
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