import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Modal from "../utils/Modal";
import { useState } from "react";

interface SummaryCardProps {
  total: string;
  buttonText: string;
  showModal?: boolean;
  buttonAction?: () => void; // New prop for custom button action
}

export default function SummaryCard({
  total,
  buttonText,
  showModal = true,
  buttonAction, // Destructure the new prop
}: SummaryCardProps) {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction(); // Call the custom action if provided
    } else {
      navigate("/checkout"); // Default behavior
    }
  };

  return (
    <div className="rounded-custom flex h-fit w-96 flex-col gap-2 bg-stone-100 p-4">
      <span className="flex items-center justify-between">
        <p>Item ({cartItems.length})</p>
        <p>US ${totalPrice}</p>
      </span>
      <span className="flex items-center justify-between">
        <p>Shipping</p>
        <p>US $ 0</p>
      </span>
      <hr className="my-2" />
      <span className="mb-2 flex items-center justify-between text-xl font-semibold">
        <p>{total}</p>
        <p>US ${totalPrice}</p>
      </span>

      {showModal ? (
        <>
          <Button className="w-full" onClick={() => setIsModalOpen(true)}>
            {buttonText}
          </Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title=""
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <Button
                onClick={() => navigate("/signinpage")}
                className="w-full"
              >
                Continue to sign in
              </Button>
              <Button onClick={() => navigate("/checkout")} className="w-full">
                Continue as guest
              </Button>
            </div>
          </Modal>
        </>
      ) : (
        <Button className="w-full" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
