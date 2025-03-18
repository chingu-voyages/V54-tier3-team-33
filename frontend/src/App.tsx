import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage"; 
import "./index.css";
import ShoppingCartPage from "./pages/ShoppingCartPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/shoppingCart" element={<ShoppingCartPage />} />

      </Routes>
    </Router>
  );
};

export default App;

