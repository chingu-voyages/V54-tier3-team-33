import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Modal from "../utils/Modal";
import { useState } from "react";

export default function SummaryCard({
  total,
  buttonText,
}: {
  total: string;
  buttonText: string;
}) {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="rounded-custom flex w-96 flex-col gap-4 bg-stone-100 p-4">
      <span className="flex items-center justify-between">
        <p>Item {cartItems.length}</p>
        <p>US ${totalPrice}</p>
      </span>
      <hr />
      <span className="flex items-center justify-between text-xl font-semibold">
        <p>{total}</p>
        <p>US ${totalPrice}</p>
      </span>
      <Button className="w-full" onClick={() => setIsModalOpen(true)}>
        {buttonText}
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title=""
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Button onClick={() => navigate("/signinpage")} className="w-full">
            Continue to sign in
          </Button>
          <Button onClick={() => navigate("/checkout")} className="w-full">
            Continue as guest
          </Button>
        </div>
      </Modal>
    </div>
  );
}
