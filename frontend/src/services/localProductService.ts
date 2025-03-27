import tempData from '../utils/tempData.json'

// Simulate an API call to fetch products locally
const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tempData)
    }, 1000); 
  });
};

export default fetchProducts;