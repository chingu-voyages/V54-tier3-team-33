const fetchProducts = async (page: number, limit: number) => {
  try {
    console.log("Fetching products with:", { page, limit });

    const response = await fetch(
      `api/products?page=${page}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include", // Include cookies if needed
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Log the API response
    return data; // Ensure this returns { products, totalPages, page }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default fetchProducts;