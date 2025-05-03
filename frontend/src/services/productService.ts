const fetchProducts = async (
  search: string,
  page: number,
  limit: number,
  category: string,
  subcategory: string,
  minPrice: number,
  maxPrice: number,
  sort: string
) => {
  try {
    // console.log(category, subcategory);

    const response = await fetch(
      `/api/products?search=${search}&page=${page}&limit=${limit}&category=${category}&subcategory=${subcategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`,
      {
        method: "GET",
        credentials: "include", // Include cookies if needed
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log("API Response:", data);
    return data; // Ensure this returns { products, totalPages, page }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const fetchProductDetails = async (productId: string) => {
  try {
    const response = await fetch(`/api/products/${productId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const singleItemdata = await response.json();
    // console.log("API Response:", singleItemdata);
    return singleItemdata;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default { fetchProducts, fetchProductDetails };
