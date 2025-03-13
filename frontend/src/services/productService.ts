import mockProducts from "../data/mockProducts";

// Simulate an API call to fetch products for now (Until we have a real database and a real backend)
const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts); // Simulate a delay for realism
    }, 5000); // 5-seconds delay (for simulation purposes)
  });
};

export default fetchProducts;