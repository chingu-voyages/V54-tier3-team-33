import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import Layout from "./pages/Layout";
import SignInPage from "./pages/SignInPage";
import CreateAccPage from "./pages/CreateAccPage";
import SubcategoryPage from "./pages/SubcategoryPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes wrapped with Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route
            path="/category/:categoryName/:subcategoryName"
            element={<SubcategoryPage />}
          />
          <Route path="/shoppingCart" element={<ShoppingCartPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Routes without Layout */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/signinpage" element={<SignInPage />} />
        <Route path="/createacc" element={<CreateAccPage />} />
      </Routes>
    </Router>
  );
};

export default App;
