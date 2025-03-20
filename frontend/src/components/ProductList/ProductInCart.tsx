import { Product } from "../../store/slices/productTypes";

interface ProductInCartProps {
  cartItems: Product[];
}

const ProductInCart: React.FC<ProductInCartProps> = ({ cartItems }) => {
  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="mb-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <img
                src={Array.isArray(item.image) ? item.image[0] : item.image}
                alt={item.name}
                className="mr-4 h-16 w-16 rounded-md object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">${item.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductInCart;