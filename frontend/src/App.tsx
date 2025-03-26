import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import "./index.css";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage ";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import Layout from "./pages/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/shoppingCart" element={<ShoppingCartPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
