import { useNavigate, useParams } from "react-router-dom";
import Button from "../utils/Button";
import { useEffect, useState } from "react";
import ZoomImage from "../utils/ZoomImage";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/slices/cartSlice";
import { Product } from "../store/slices/productTypes";
import productService from "../services/productService";
import Spinner from "../utils/Spinner.tsx";

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
    return <Spinner />;
  }

  return (
    <section className="container mx-auto p-6">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Left Section */}
        <article className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Smaller Images */}
            <div className="order-1 flex flex-row sm:flex-col gap-2">
              {Array.isArray(product.image) &&
                product.image.map((img, index) => (
                  <div key={index} className="flex">
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="size-18 cursor-pointer rounded-md border border-gray-300 object-cover"
                      onClick={() => handleImageClick(img)}
                    />
                  </div>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 sm:order-2">
              {mainImage && <ZoomImage src={mainImage} alt={product.name} />}
            </div>
          </div>
        </article>

        {/* Right Section */}
        <article className="text-darktext flex w-full flex-col gap-4 md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <hr className="text-darktext/20" />
          <p className="text-2xl">Price: ${product.price}</p>
          <hr className="text-darktext/20" />
          <p>{product.description}</p>
          <Button onClick={handleAddToCart}>Add to cart</Button>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Go back
          </Button>
        </article>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
