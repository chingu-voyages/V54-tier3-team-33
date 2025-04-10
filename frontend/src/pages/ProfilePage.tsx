import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import unknownuser from "../../src/assets/unknownuser.jpg";
import Button from "../utils/Button";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";

const ProfilePage: React.FC = () => {
  // const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchUserOrders = async () => {
      const mockOrders = [
        {
          id: 1,
          item: "Laptop UltraBook Pro X1",
          date: "2025-03-01",
          status: "Delivered",
        },
        {
          id: 2,
          item: "Smartphone UltraMini S2",
          date: "2025-02-15",
          status: "Shipped",
        },
      ];
      setOrders(mockOrders);
    };

    fetchUserProfile();
    fetchUserOrders();
  }, []);

  if (!user) {
    return (
      <div className="flex h-56 w-full flex-col items-center justify-center gap-2 text-gray-500">
        <ArrowPathIcon className="size-20 animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="mx-4 h-48">
        <div className="bg-customcolortwo flex items-start gap-4 p-7">
          <img src={unknownuser} className="size-20" alt="user profile" />
          <p className="text-3xl font-semibold">
            {user.firstname} {user.lastname}
          </p>
        </div>
        <div className="mt-4 flex items-center">
          <p className="text-2xl font-semibold">Your orders</p>
          <div className="ml-auto flex items-center gap-4">
            <div className="border-customcolorone flex flex-1 items-center overflow-hidden rounded-full border">
              <MagnifyingGlassIcon className="ml-3 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for anything"
                className="sm:placeholder:text-customcolorone min-w-0 flex-1 px-4 py-2 text-sm outline-none placeholder:text-transparent sm:text-base"
                // value={searchQuery}
                // onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              />
              <button
                className="p-2 transition-colors"
                // onClick={handleClearResults}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <Button
              variant="primary"
              className="!w-24 !p-1.5 !text-base"
              // onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
