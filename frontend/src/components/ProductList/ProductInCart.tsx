import { CartItem } from "../../store/slices/productTypes";
import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateItemQuantity,
} from "../../store/slices/cartSlice";
import React from "react";

interface ProductInCartProps {
  cartItems: CartItem[];
}

const ProductInCart: React.FC<ProductInCartProps> = ({ cartItems }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  return (
    <div className="order-1 w-full">
      <ul className="flex flex-col gap-4">
        {cartItems.map(({ product, quantity }) => (
          <li
            key={product.id}
            className="flex flex-col justify-between rounded-2xl border border-gray-300 p-4"
          >
            <div className="flex w-full items-start gap-4">
              <img
                src={
                  Array.isArray(product.image)
                    ? product.image[0]
                    : product.image
                }
                alt={product.name}
                className="size-30 rounded-md object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="">Price: ${product.price}</p>
              </div>

              {/* quantity dropdown */}
              <div className="my-auto ml-auto flex items-center">
                <p className="mr-2">Quantity</p>
                <select
                  id={`quantity-${product.id}`}
                  className="focus:ring-customcolorone rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(product.id, parseInt(e.target.value))
                  }
                >
                  {Array.from({ length: product.stock }, (_, i) => i + 1).map(
                    (num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            <button
              onClick={() => handleRemoveItem(product.id)}
              className="hover:text-darktext/70 ml-auto cursor-pointer font-semibold underline transition-all"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductInCart;
