import { useSelector } from "react-redux";
import ProductInCart from "../components/ProductList/ProductInCart";
import SummaryCard from "../utils/SummaryCard";
import { RootState } from "../store/store";
import {Link , useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import {usePostOrder} from "../hooks/usePostOrder.ts";


//todo: show error or success toast && loading button
export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate()
  const {
      postOrder,
      response,
      loading: postOrderLoading,
      error
  } = usePostOrder();
  const handleConfirmAndPay = async () => {
      const orderPayload = cartItems.map(item =>({ id: item.id, price: item.price, quantity: 1}))
      await postOrder(orderPayload);
  }
  if(response) {
       return  navigate('/profile')
  }

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

    // useEffect(() => {
    //     const makeOrderCall = async () => {
    //       try {
    //         const response = await fetch('./routes/order.routes', {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           credentials: "include",
    //         });

    //         if (!response.ok) {
    //           throw new Error("Failed");
    //         }

    //         // create slice for orders and use dispatch to update global state
    //         const orders = await response.json();
    //         setUser(data.data);
    //       } catch (error) {
    //         console.error("Error fetching user profile:", error);
    //       }
    //     };
  );
}
