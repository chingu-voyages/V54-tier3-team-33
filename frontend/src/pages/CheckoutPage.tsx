import { useSelector } from "react-redux";
import ProductInCart from "../components/ProductList/ProductInCart";
import SummaryCard from "../utils/SummaryCard";
import { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { usePostOrder } from "../hooks/usePostOrder.ts";
import { useEffect } from "react";

//todo: show error or success toast && loading button
export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const { postOrder, response, loading: postOrderLoading } = usePostOrder();
  const handleConfirmAndPay = async () => {
    const orderPayload = cartItems.map((item) => ({
      id: item.product.id.toString(),
      price: item.product.price,
      quantity: item.quantity,
    }));
    await postOrder(orderPayload);
  };
  // creates an error in the App.tsx
  // if (response) {
  //   return navigate("/profile");
  // }
  
  useEffect(() => {
    if (response) {
      navigate("/profile");
    }
  }, [response, navigate]);

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center justify-start gap-5 pt-5">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-30" />
        </Link>
        <p className="text-3xl font-semibold">Checkout</p>
      </div>

      <div className="flex gap-3">
        {cartItems.length > 0 && <ProductInCart cartItems={cartItems} />}
        <SummaryCard
          isLoading={postOrderLoading}
          total={"Order total"}
          buttonText={"Confirm and pay"}
          showModal={false}
          handleAction={handleConfirmAndPay}
        />
      </div>
    </section>
  );
}
