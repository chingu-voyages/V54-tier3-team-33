import { useNavigate, useParams } from "react-router-dom";
import Button from "../utils/Button";
import { useEffect, useState } from "react";
import ZoomImage from "../utils/ZoomImage";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/slices/cartSlice";
import { Product } from "../store/slices/productTypes";
import productService from "../services/productService";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          const fetchedProduct =
            await productService.fetchProductDetails(productId);
          setProduct(fetchedProduct);
          setMainImage(
            Array.isArray(fetchedProduct.image)
              ? fetchedProduct.image[0]
              : fetchedProduct.image,
          );
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [productId]);

  const handleImageClick = (img: string) => {
    setMainImage(img);
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItemToCart(product));
      navigate("/shoppingCart");
    }
  };

  if (!product) {
    return (
      <div className="flex h-40 w-full flex-col items-center justify-center gap-2 text-gray-500">
        <ArrowPathIcon className="size-20 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        <div className="flex flex-col gap-2">
          {Array.isArray(product.image) &&
            product.image.map((img, index) => (
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
          {mainImage && <ZoomImage src={mainImage} alt={product.name} />}
        </div>
        <div className="flex w-full flex-col gap-4 md:w-1/4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-gray-700">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <Button variant="secondary" onClick={handleAddToCart}>
            Add to cart
          </Button>
          <Button onClick={() => navigate("/")}>Go back</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
