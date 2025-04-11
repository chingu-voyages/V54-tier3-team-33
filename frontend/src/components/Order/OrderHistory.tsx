import React from "react";
import useFetch from "../../hooks/useFetch.ts";


export function OrderHistory() {
    const {data: orders, loading, error} = useFetch('/api/orders');

    if(loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <div className="text-4xl font-semibold text-gray-400 animate-pulse">
                    Loading...
                </div>
            </div>
        );
    }
    return(
        <div className="bg-white shadow-sm rounded-2xl p-8 gap-5 flex-1 w-full border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Order History</h2>
            {orders.map((order) => (
                <div key={order._id} className="border border-gray-200 rounded-xl p-4 shadow-sm mb-4">
                    <div className="flex justify-between items-center mb-1 gap-12">
                        <span className="font-bold">Order  <span className="text-sm font-normal">#{order._id}</span></span>
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
                        {order.items.map((item, index) => (
                            <li key={item.id} className="flex justify-between">
                                <span>{item.product.name}</span>
                                <span>${(item.unitPriceAtOrder * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between text-sm font-semibold">
                        <span>Total:</span>
                        <span>
                               $
                            {order.items
                                .reduce((sum, item) => sum + item.unitPriceAtOrder * item.quantity, 0)
                                .toFixed(2)}
                           </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
