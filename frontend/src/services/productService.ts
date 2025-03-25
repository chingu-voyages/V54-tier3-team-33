const fetchProducts = async () => {
  try {
    const response = await fetch("https://ecommerce-chingu-backend.fly.dev/api/products");

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; 
  }
};

export default fetchProducts;