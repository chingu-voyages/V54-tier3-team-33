import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage, { User } from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import Layout from "./pages/Layout";
import SignInPage from "./pages/SignInPage";
import CreateAccPage from "./pages/CreateAccPage";
import useFetch from "./hooks/useFetch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./store/slices/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const user: User = await response.json();
          dispatch(setUser(user)); 
        } else {
          dispatch(clearUser()); 
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch(clearUser()); 
      }
    };

    fetchUser(); 
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Routes wrapped with Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
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
