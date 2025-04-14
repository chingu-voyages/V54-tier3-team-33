import useFetch from "../../hooks/useFetch.ts";
import Spinner from "../../utils/Spinner.tsx";

interface OrderItem {
  id: string;
  product: {
    name: string;
  };
  unitPriceAtOrder: number;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
}

export function OrderHistory() {
  const { data: orders, loading, error } = useFetch<Order[]>("/api/orders");

  return loading ? (
    <Spinner />
  ) : error ? (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="text-2xl font-semibold text-red-500">
        Error loading orders.
      </div>
    </div>
  ) : orders && orders.length > 0 ? (
    <div className="w-full flex-1 gap-5 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Order History</h2>
      {orders.map((order: Order) => (
        <div
          key={order._id}
          className="mb-4 rounded-xl border border-gray-200 p-4 shadow-sm"
        >
          <div className="mb-1 flex items-center justify-between gap-12">
            <span className="font-bold">
              Order <span className="text-sm font-normal">#{order._id}</span>
            </span>
          </div>
          <ul className="mb-2 list-inside list-disc text-sm text-gray-700">
            {order.items.map((item: OrderItem, index: number) => (
              <li
                key={`${order._id}-${item.id}-${index}`}
                className="flex justify-between"
              >
                <span>{item.product.name}</span>
                <span>
                  ${(item.unitPriceAtOrder * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-sm font-semibold">
            <span>Total:</span>
            <span>
              $
              {order.items
                .reduce(
                  (sum: number, item: OrderItem) =>
                    sum + item.unitPriceAtOrder * item.quantity,
                  0,
                )
                .toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="w-full flex-1 gap-5 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Order History</h2>
      <p className="text-center text-gray-500">You have no orders.</p>
    </div>
  );
}
