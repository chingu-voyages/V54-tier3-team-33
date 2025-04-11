import React from "react";
import useFetch from "../hooks/useFetch.ts";



export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  account_verify: boolean;
}
const ProfilePage: React.FC = () => {
  
   const {
     data: user,
     loading: userLoading,
     error: userError
   } = useFetch<User>("/api/auth/me")

  const {data: orders, loading, error} = useFetch('/api/orders');
  if (!user || loading) {
    return (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-4xl font-semibold text-gray-400 animate-pulse">
            Loading...
          </div>
        </div>
    );
  }

  return (
      <div className="flex items-start justify-center gap-6 py-12 px-22">
        <div className="bg-white shadow-sm rounded-2xl p-8 max-w-md w-full border border-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-gray-500 text-2xl font-bold">
              {user.firstname[0]}
              {user.lastname[0]}
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {user.firstname} {" "} {user.lastname}
            </h1>
            <p className="text-gray-500 text-sm">{user.email}</p>

            <div className="w-full mt-6 space-y-4">
              <div className="flex justify-between items-center  text-sm text-gray-600">
                <span className="font-medium">Account Created:</span>
                <span>{formatReadableDate(user.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span className="font-medium">Verification:</span>
                <span
                    className={`font-semibold py-2 px-4 rounded-full ${
                        user.account_verify ? "text-green-600 bg-green-200" : "text-red-500 bg-red-200"
                    }`}
                >
                {user.account_verify ? "Verified" : "Not Verified"}
              </span>
              </div>
            </div>
          </div>
        </div>
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

      </div>
  )
};

export default ProfilePage;

export function formatReadableDate(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
