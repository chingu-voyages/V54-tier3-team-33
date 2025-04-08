const fetchProducts = async (page: number, limit: number) => {
  try {
    console.log("Fetching products with:", { page, limit });

    const response = await fetch(
      `https://ecommerce-chingu-backend.fly.dev/api/products?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    // Wrap the response in an object if it's an array
    if (Array.isArray(data)) {
      return { products: data, totalPages: 1, page };
    }

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default fetchProducts;