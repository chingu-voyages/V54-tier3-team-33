import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import Layout from "./pages/Layout";
import SignInPage from "./pages/SignInPage";
import CreateAccPage from "./pages/CreateAccPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {login , logout} from "./store/slices/authSlice.ts";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('api/auth/me', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(login(data.data));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      }
    };
    fetchUser()
  }, []);

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
