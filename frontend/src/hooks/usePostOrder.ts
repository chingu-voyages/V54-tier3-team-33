import { useState } from "react";

export interface CreateOrderPayload {
  id: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  status: "success" | "failed";
  message: string;
}

export const usePostOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<OrderResponse | null>(null);

  const postOrder = async (products: CreateOrderPayload[]) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to post order");
      }

      const data: OrderResponse = await res.json();
      setResponse(data);
      return data;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return {
    postOrder,
    loading,
    error,
    response,
  };
};
