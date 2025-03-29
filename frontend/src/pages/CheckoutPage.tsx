import { useSelector } from "react-redux";
import ProductInCart from "../components/ProductList/ProductInCart";
import SummaryCard from "../utils/SummaryCard";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleConfirmAndPay = () => {
    // Custom logic for the "Confirm and pay" button
    alert("Order confirmed, payment completed!");
    // Add additional logic here, such as API calls or navigation
  };

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 pt-5 flex items-center justify-start gap-5">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-30" />
        </Link>
        <p className="text-3xl font-semibold">Checkout</p>
      </div>

      <div className="flex gap-3">
        {cartItems.length > 0 && <ProductInCart cartItems={cartItems} />}
        <SummaryCard
          total={"Order total"}
          buttonText={"Confirm and pay"}
          showModal={false}
          buttonAction={handleConfirmAndPay}
        />
      </div>
    </section>
  );
}
