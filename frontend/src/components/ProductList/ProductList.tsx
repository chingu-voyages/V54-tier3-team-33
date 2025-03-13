import React from "react";
import { ProductListProps } from "../../store/slices/productTypes"


const ProductList: React.FC<ProductListProps> = ({ loading, error, searchResults }) => {
  return (
    <>
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
              <h3 className="text-purple-400 text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-700">Delivery Cost: ${product.deliveryCost}</p>
              <p className="text-gray-700">Country: {product.country}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found. Try searching for something!</p>
      )}
    </>
  );
};

export default ProductList;