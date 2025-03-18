import { Link } from "react-router-dom";

export default function ShoppingCartPage() {
  return (
    <div className="h-screen bg-red-50">
      ShoppingCartPage
      <div className="flex h-screen flex-col items-center justify-center bg-red-100">
        <h5 className="text-2xl font-semibold">
          You don't have any items in your cart.
        </h5>
        <p>Have an account? Sign in to see your items.</p>
        <span className="flex gap-5">
          <Link to="/">Start shopping</Link>
          <button>Sign in</button>
        </span>
      </div>
    </div>
  );
}
