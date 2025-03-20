import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Button from "../utils/Button";
import RegisterForm from "../utils/RegisterForm";
import SigninForm from "../utils/SigninForm";
import { useNavigate } from "react-router-dom";

export default function ShoppingCartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-red-50">
      <div className="flex h-[70vh] flex-col items-center justify-center gap-5 bg-red-100">
        {cartItems.length === 0 ? (
          <>
            <h5 className="text-2xl font-semibold">
              You don't have any items in your cart.
            </h5>
            <p>Have an account? Sign in to see your items.</p>
            <span className="flex gap-5">
              <Button onClick={() => navigate("/")}>Start shopping</Button>
              <Button>Sign in</Button>
            </span>
          </>
        ) : (
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
                      src={item.image}
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
        )}
      </div>
      <div className="flex items-center justify-center gap-20 bg-gray-200">
        <RegisterForm />
        <SigninForm />
      </div>
    </div>
  );
}
