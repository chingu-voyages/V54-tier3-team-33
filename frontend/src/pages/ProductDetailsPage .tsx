import { useLocation } from "react-router-dom";
import Button from "../utils/Button";
import { useState } from "react";
import ZoomImage from "../utils/ZoomImage";

interface Product {
  id: number;
  name: string;
  image: string | string[];
  price: number;
  description: string;
}

const ProductDetailsPage = () => {
  const location = useLocation();
  const product = location.state?.product as Product;

  const images = Array.isArray(product.image) ? product.image : [product.image];
  const [mainImage, setMainImage] = useState(images[0]);

  const handleImageClick = (img: string) => {
    setMainImage(img);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="flex w-20 flex-col gap-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index + 1}`}
              className="cursor-pointer rounded-md border border-red-600 object-cover"
              onClick={() => handleImageClick(img)}
            />
          ))}
        </div>
        <div className="flex-1">
          <ZoomImage src={mainImage} alt={product.name} />
        </div>
        <div className="flex w-full flex-col gap-4 md:w-1/4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-gray-700">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <Button className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 md:w-auto">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
