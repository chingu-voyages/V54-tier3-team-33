import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Button from "../utils/Button";
import RegisterForm from "../utils/RegisterForm";
import SigninForm from "../utils/SigninForm";
import { useNavigate } from "react-router-dom";
import ProductInCart from "../components/ProductList/ProductInCart";
import SummaryCard from "../utils/SummaryCard";

export default function ShoppingCartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();


  
  return (
    <div className="h-screen bg-red-50">
      <div className="flex h-[70vh] flex-col items-center justify-center gap-5 bg-red-100">
        <Button onClick={() => navigate("/")} className="">
          Go back
        </Button>
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
          <div className="flex gap-3">
          <ProductInCart cartItems={cartItems} />
          <SummaryCard />
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
