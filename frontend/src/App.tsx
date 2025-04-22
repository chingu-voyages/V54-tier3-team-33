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
import { fetchAuthenticatedUser } from "./store/slices/authSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store.ts";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthenticatedUser());
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Routes>
        {/* routes wrapped with Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shoppingCart" element={<ShoppingCartPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* routes without Layout */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/signinpage" element={<SignInPage />} />
        <Route path="/createacc" element={<CreateAccPage />} />
      </Routes>
    </Router>
  );
};

export default App;
