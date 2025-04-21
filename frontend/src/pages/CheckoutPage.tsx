import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { usePostOrder } from "../hooks/usePostOrder.ts";
import { useEffect } from "react";
import Button from "../utils/Button.tsx";

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

  const totalPrice = cartItems
    .reduce((total, item) => total + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="mb-10 flex items-center justify-start gap-5 pt-5">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-30" />
        </Link>
        <p className="text-3xl font-semibold">Checkout</p>
      </div>

      {cartItems.length === 0 ? (
        <h1>no items in the cart</h1>
      ) : (
        <div className="mt-10 flex flex-col gap-3 md:flex-row">
          <div className="rounded-custom order-1 mb-10 w-full">
            <ul className="flex flex-col gap-4">
              {cartItems.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex flex-col justify-between border border-gray-300 p-4"
                >
                  <div className="flex w-full items-start gap-4">
                    <img
                      src={
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                      }
                      alt={product.name}
                      className="size-30 rounded-md object-contain"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="">Price: ${product.price}</p>
                      <p>Quantity {quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* summary card */}
          <div className="flex h-fit w-full flex-col gap-2 border border-gray-300 p-4 sm:w-96 md:order-5">
            <span className="flex items-center justify-between">
              <p>
                {" "}
                {cartItems.length > 1 ? "Items" : "Item"} ({cartItems.length})
              </p>
              <p>US ${totalPrice}</p>
            </span>
            <span className="flex items-center justify-between">
              <p>Shipping</p>
              <p>US $ 0</p>
            </span>
            <hr className="my-2 text-gray-300" />
            <span className="mb-2 flex items-center justify-between text-xl font-semibold">
              <p>Order Total</p>
              <p>US ${totalPrice}</p>
            </span>

            <Button
              className="w-full"
              onClick={handleConfirmAndPay}
              disabled={postOrderLoading}
            >
              Confirm and pay
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
