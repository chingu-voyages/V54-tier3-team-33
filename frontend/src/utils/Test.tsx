import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Test() {
  const navigate = useNavigate();

  return (
    <div className="flex w-96 flex-col gap-4 bg-red-100 p-4">
      <span className="flex items-center justify-between">
        <p>Item (1)</p>
        <p>US $81.00</p>
      </span>
      <hr />
      <span className="flex items-center justify-between text-xl font-semibold">
        <p>Subtotal</p>
        <p>US $81.00</p>
      </span>
      <Button className="w-full" onClick={() => navigate("/checkout")}>
        Go to checkout
      </Button>
    </div>
  );
}
