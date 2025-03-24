import Card from "../Card/Card";
// import tempData from "../../utils/tempData.json";

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

function Grid({ products, loading, error }: GridProps) {
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
          <p className="text-center text-gray-500">No products found. Try searching for something!</p>
        )}
      </section>
    </div>
  );
}

export default Grid;