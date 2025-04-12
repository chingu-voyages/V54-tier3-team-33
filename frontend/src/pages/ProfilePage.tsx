import React from "react";
import useFetch from "../hooks/useFetch.ts";
import { OrderHistory } from "../components/Order/OrderHistory.tsx";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

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
    error: userError,
  } = useFetch<User>("/api/auth/me");

  return userLoading ? (
    <div className="flex h-40 w-full flex-col items-center justify-center gap-2 text-gray-500">
      <ArrowPathIcon className="size-20 animate-spin" />
    </div>
  ) : userError ? (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="text-2xl font-semibold text-red-500">User not found</div>
    </div>
  ) : user ? (
    <div className="flex items-start justify-center gap-6 px-22 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-500">
            {user.firstname[0]}
            {user.lastname[0]}
          </div>
          <h1 className="mb-1 text-2xl font-bold text-gray-800">
            {user.firstname} {user.lastname}
          </h1>
          <p className="text-sm text-gray-500">{user.email}</p>

          <div className="mt-6 w-full space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="font-medium">Account Created:</span>
              <span>{formatReadableDate(user.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
      <OrderHistory />
    </div>
  ) : (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="text-2xl font-semibold text-gray-500">
        No user data available.
      </div>
    </div>
  );
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
