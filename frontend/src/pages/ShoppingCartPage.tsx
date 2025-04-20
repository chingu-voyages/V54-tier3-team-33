import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";
import ProductInCart from "../components/ProductList/ProductInCart";
import SummaryCard from "../utils/SummaryCard";

export default function ShoppingCartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="text-darktext flex flex-grow flex-col items-center">
      {cartItems.length === 0 ? (
        <div className="w-full">
          <p className="mx-auto w-full max-w-6xl px-3 text-3xl font-bold">
            Shopping cart
          </p>

          <div className="flex flex-col items-center gap-4 py-20">
            <h5 className="text-2xl">You don't have any items in your cart.</h5>
            {!user && <p>Have an account? Sign in to see your items.</p>}
            <span className="flex gap-5">
              <Button variant="secondary" onClick={() => navigate("/")}>
                Start shopping
              </Button>
              {!user && (
                <Button onClick={() => navigate("/signinpage")}>Sign in</Button>
              )}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl">
          <p className="mx-auto w-full max-w-6xl px-3 text-3xl font-bold">
            Shopping cart
          </p>
          <div className="mx-4 mt-10 flex flex-col gap-3 lg:flex-row">
            <ProductInCart cartItems={cartItems} />
            <SummaryCard
              total={"Subtotal"}
              buttonText={"Go to checkout"}
              handleAction={() => navigate("/checkout")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
