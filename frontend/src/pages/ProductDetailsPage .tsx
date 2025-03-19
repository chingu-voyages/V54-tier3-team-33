import { useLocation } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

const ProductDetailsPage = () => {
    const location = useLocation();
    const product = location.state?.product as Product;
  
    if (!product) {
      return <div>Product not found</div>;
    }
  
    return (
      <div>

        <div className="container mx-auto p-6">
          <div className="flex flex-col items-center">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-md mb-4" />
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-gray-700 mb-4">${product.price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductDetailsPage;