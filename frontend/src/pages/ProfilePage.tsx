import React from "react";
import useFetch from "../hooks/useFetch.ts";
import {OrderHistory} from "../components/Order/OrderHistory.tsx";



export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
const ProfilePage: React.FC = () => {
  
   const {
     data: user,
     loading: userLoading,
     error: userError
   } = useFetch<User>("/api/auth/me")


  if (!user) {
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
              </div>
            </div>
          </div>
        </div>
        <OrderHistory />
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
