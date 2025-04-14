import React from "react";
import { ProductListProps } from "../../store/slices/productTypes";

const ProductList: React.FC<ProductListProps> = ({
  loading,
  error,
  searchResults,
}) => {
  return (
    <>
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : searchResults.length > 0 ? (
        <div className="mr-10 mb-10 ml-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResults.map((product) => (
            <div key={product.id} className="rounded-lg bg-white p-4 shadow-md">
              <img
                src={
                  Array.isArray(product.image)
                    ? product.image[0]
                    : product.image
                }
                alt={product.name}
                className="mb-10 h-auto w-full rounded-lg"
              />
              <h3 className="mb-5 text-xl font-semibold text-purple-400">
                {product.name}
              </h3>
              <p className="text-gray-700">Price: ${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No products found. Try searching for something!
        </p>
      )}
    </>
  );
};

export default ProductList;
