import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


export default function SummaryCard() {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="flex w-96 flex-col gap-4 bg-red-300 p-4 rounded-custom">
      <span className="flex items-center justify-between">
        <p>Item {cartItems.length}</p>
        <p>US ${totalPrice}</p>
      </span>
      <hr />
      <span className="flex items-center justify-between text-xl font-semibold">
        <p>Subtotal</p>
        <p>US ${totalPrice}</p>
      </span>
      <Button className="w-full" onClick={() => navigate("/checkout")}>
        Go to checkout
      </Button>
    </div>
  );
}
