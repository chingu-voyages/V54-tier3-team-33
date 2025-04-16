import React from "react";
import useFetch from "../hooks/useFetch.ts";
import { OrderHistory } from "../components/Order/OrderHistory.tsx";
import Spinner from "../utils/Spinner.tsx";
import userNotFound from "../assets/user-not-found.svg";
import { clearUser } from "../store/slices/userSlice.ts";
import { useDispatch } from "react-redux";

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

  const dispatch = useDispatch();

  return userLoading ? (
    <Spinner />
  ) : userError ? (
    <div className="flex h-[50vh] flex-col items-center justify-center">
      <img src={userNotFound} alt="user not found" className="size-72" />
      <div className="text-darktext text-2xl font-semibold">
        User not found...
      </div>
    </div>
  ) : user ? (
    <div className="text-darktext mx-auto flex max-w-6xl flex-col items-start justify-center gap-6 px-4 lg:flex-row">
      <article className="bg-customcolortwo w-full rounded-2xl border border-gray-200 p-8 shadow-sm sm:w-sm lg:w-1/3 lg:min-w-96">
        <div className="flex flex-col items-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold">
            {user.firstname[0]}
            {user.lastname[0]}
          </div>
          <h1 className="mb-1 text-2xl font-bold">
            {user.firstname} {user.lastname}
          </h1>
          <p className="text-sm">{user.email}</p>

          <div className="mt-6 w-full space-y-4">
            <div className="text-darktext/70 flex items-center justify-between text-sm">
              <span className="">Account Created:</span>
              <span>{formatReadableDate(user.createdAt)}</span>
            </div>
            <button
              className="border-darktext/30 cursor-pointer rounded-full border bg-white px-4 py-1 text-sm font-semibold text-red-500 shadow-sm transition-all hover:border-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => {
                dispatch(clearUser());
                console.log("User logged out");
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </article>
      <OrderHistory />
    </div>
  ) : (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="text-2xl font-semibold">No user data available.</div>
    </div>
  );
};

export default ProfilePage;

// eslint-disable-next-line react-refresh/only-export-components
export function formatReadableDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
