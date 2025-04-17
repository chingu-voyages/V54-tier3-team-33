import {CartItem , Product} from "../../store/slices/productTypes";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../store/slices/cartSlice";
import React from "react";

interface ProductInCartProps {
  cartItems: CartItem[];
}

const ProductInCart: React.FC<ProductInCartProps> = ({ cartItems }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };
  return (
    <div className="rounded-custom w-full max-w-4xl bg-stone-100 p-4">
      <ul>
        {cartItems.map(({product}) => (
          <li key={product.id} className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={Array.isArray(product.image) ? product.image[0] : product.image}
                alt={product.name}
                className="mr-4 size-30 rounded-md object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemoveItem(product.id)}
              className="ml-4 cursor-pointer"
            >
              Remove item
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductInCart;
