import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

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
      <div>
        Hello {user.firstname} {user.lastname}!
      </div>
    );
  }
};

export default ProfilePage;
