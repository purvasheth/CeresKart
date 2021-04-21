import { Cart } from "./pages/Cart";
import { Products } from "./pages/Products/Products";
import "./styles.css";
import { Wishlist } from "./pages/Wishlist";
import { ToastContainer } from "react-toastify";
import { SearchResults } from "./pages/SearchResults";
import { Home } from "./pages/Home/Home";
import { NavigationBar } from "./components/NavigationBar";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ToastContainer />
      <NavigationBar />
      <div className="mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="products/category/:categoryName"
            element={<Products />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
