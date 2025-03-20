import { useLocation, useNavigate } from "react-router-dom";
import Button from "../utils/Button";
import { useState } from "react";
import ZoomImage from "../utils/ZoomImage";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/slices/cartSlice";
import { Product } from "../store/slices/productTypes";

const ProductDetailsPage = () => {
  const location = useLocation();
  const product = location.state?.product as Product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const images = Array.isArray(product.image) ? product.image : [product.image];
  const [mainImage, setMainImage] = useState(images[0]);

  const handleImageClick = (img: string) => {
    setMainImage(img);
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    navigate("/shoppingCart");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        <div className="flex flex-col gap-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index + 1}`}
              className="h-16 w-16 cursor-pointer rounded-md border border-gray-300 object-cover"
              onClick={() => handleImageClick(img)}
            />
          ))}
        </div>
        <div className="max-w-sm flex-1">
          <ZoomImage src={mainImage} alt={product.name} />
        </div>
        <div className="flex w-full flex-col gap-4 md:w-1/4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-gray-700">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <Button
            onClick={handleAddToCart}
            className=""
          >
            Add to cart
          </Button>
          <Button
            onClick={() => navigate("/")}
            className=""
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
