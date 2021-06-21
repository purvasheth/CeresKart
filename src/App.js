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
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { PrivateRoute } from "./pages/Auth/PrivateRoute";
import { ResetPassword } from "./pages/Auth/ResetPassword";

export default function App() {
  return (
    <>
      <ToastContainer />
      <NavigationBar />
      <div className="mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <PrivateRoute path="/cart" element={<Cart />} />
          <PrivateRoute path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="products/category/:categoryName"
            element={<Products />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
