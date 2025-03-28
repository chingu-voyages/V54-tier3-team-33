import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";
import ProductInCart from "../components/ProductList/ProductInCart";
import SummaryCard from "../utils/SummaryCard";

export default function ShoppingCartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  return (
    <div className="flex flex-grow flex-col items-center">
      <p className="mr-auto px-3 text-3xl font-bold">Shopping cart</p>
      {cartItems.length === 0 ? (
        <div className="flex w-full flex-col items-center gap-4 py-20">
          <h5 className="text-2xl font-semibold">
            You don't have any items in your cart.
          </h5>
          <p>Have an account? Sign in to see your items.</p>
          <span className="flex gap-5">
            <Button onClick={() => navigate("/")}>Start shopping</Button>
            <Button onClick={() => navigate("/signinpage")}>Sign in</Button>
          </span>
        </div>
      ) : (
        <div className="mt-10 flex gap-3">
          <ProductInCart cartItems={cartItems} />
          <SummaryCard total={"Subtotal"} buttonText={"Go to checkout"} />
        </div>
      )}
    </div>
  );
}
