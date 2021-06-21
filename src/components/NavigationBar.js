import { useEffect, useState } from "react";
import { useData } from "../pages/data-context";
import { SearchBar } from "./SearchBar";
import { useNavigate, NavLink } from "react-router-dom";
import { useAxios } from "../useAxios";
import { useProducts } from "../pages/Products/products-context";
import { API_CART, API_PRODUCTS, API_WISHLIST } from "../urls";
import { SET_CART_ITEMS, SET_WISHLIST_ITEMS } from "../pages/data-reducer";
import { SET_PRODUCTS } from "../pages/Products/products-reducer";
import { useAuth } from "../pages/Auth/auth-context";
import { validateTokenService } from "../pages/Auth/auth-services";

function Navigation({ expandNavbar }) {
  const { cartItems, wishlist } = useData();
  const { token, logoutUser } = useAuth();

  return (
    <nav className={`nav ${expandNavbar ? "" : "nav-hide"}`}>
      <div className="nav__search-bar">{<SearchBar />}</div>
      <ul className="nav__list nav__list--primary">
        <NavigationItem route="products">Products</NavigationItem>
        <NavigationItem route="wishlist">
          Wishlist
          <NotificationBadge length={wishlist.length} />
        </NavigationItem>
        <NavigationItem route="cart">
          Cart
          <NotificationBadge length={cartItems.length} />
        </NavigationItem>
      </ul>
      <div className="nav__search-bar">
        {token && (
          <button className="btn btn--signout" onClick={logoutUser}>
            LOG OUT
          </button>
        )}
      </div>
    </nav>
  );
}

function NotificationBadge({ length }) {
  const { token } = useAuth();
  return length !== 0 && token ? (
    <span className="badge--smaller position-badge--smaller bg-red-600">
      {length}
    </span>
  ) : null;
}

function NavigationItem({ route, children }) {
  return (
    <li className={`nav__item pos-rel `}>
      <NavLink
        to={`/${route}`}
        className="nav__link"
        activeClassName="nav__link--active"
      >
        {children}
      </NavLink>
    </li>
  );
}

function Brand() {
  const navigate = useNavigate();
  return (
    <img
      className="img logo clickable"
      onClick={() => navigate("/")}
      src="https://purvasheth.github.io/Ceres-Component-Lib/images/logo.png"
      alt="logo"
    />
  );
}

function Hamberger({ setExpandNavbar }) {
  return (
    <button
      className="btn hamburger btn-wishlist font--primary"
      onClick={() => setExpandNavbar((prev) => !prev)}
    >
      <i className="fa fa-bars"></i>
    </button>
  );
}

export function NavigationBar() {
  const [expandNavbar, setExpandNavbar] = useState(false);
  const { getData: getCartData } = useAxios(API_CART);
  const { getData: getWishlistData } = useAxios(API_WISHLIST);
  const { getData: getProductsData } = useAxios(API_PRODUCTS);
  const { wishlist, cartItems, dataDispatch } = useData();
  const { token, setToken } = useAuth();
  const {
    productsState: { products },
    productsDispatch,
  } = useProducts();

  useEffect(() => {
    (async () => {
      if (products.length === 0) {
        const fetchedProducts = await getProductsData();
        productsDispatch({ type: SET_PRODUCTS, products: fetchedProducts });
      }
      if (localStorage) {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const response = await validateTokenService(storedToken);
          if (response?.message === "success") {
            setToken(storedToken);
          }
        }
      }
      if (token && cartItems.length === 0) {
        const fetchedCartItems = await getCartData();
        dataDispatch({ type: SET_CART_ITEMS, fetchedCartItems });
      }
      if (token && wishlist.length === 0) {
        const fetchedWishlist = await getWishlistData();
        dataDispatch({ type: SET_WISHLIST_ITEMS, fetchedWishlist });
      }
    })();
  }, []);
  return (
    <div className="navigation">
      <header className="header">
        <div className="container">
          <Hamberger setExpandNavbar={setExpandNavbar} />
          <Brand />
          <Navigation expandNavbar={expandNavbar} />
        </div>
      </header>
    </div>
  );
}
