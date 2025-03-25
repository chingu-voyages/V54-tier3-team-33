import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
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
    return <div className="text-5xl">Loading... open cosnole F12</div>;
  }
};

export default ProfilePage;
