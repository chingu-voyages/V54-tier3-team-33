import Button from "../utils/Button";
import { Link } from "react-router-dom";
import RegisterForm from "../utils/RegisterForm";
import SigninForm from "../utils/SigninForm";

export default function ShoppingCartPage() {
  return (
    <div className="h-screen bg-red-50">
      ShoppingCartPage
      <div className="flex h-[70vh] flex-col items-center justify-center gap-5 bg-red-100">
        <h5 className="text-2xl font-semibold">
          You don't have any items in your cart.
        </h5>
        <p>Have an account? Sign in to see your items.</p>
        <span className="flex gap-5">
          <Link to="/">
            <Button>Start shopping</Button>
          </Link>

          <Button>Sign in</Button>
        </span>
      </div>
      <div className="bg-gray-200 items-center justify-center flex gap-20 ">
        <RegisterForm />
        <SigninForm />
      </div>
    </div>
  );
}
