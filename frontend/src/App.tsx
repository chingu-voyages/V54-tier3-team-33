import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage"; 
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage "

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/shoppingCart" element={<ShoppingCartPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/category/:categoryName/:subcategoryName" element={<SubcategoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;

