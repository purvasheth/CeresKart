import { checkItem } from "../utils";
import { useData } from "../pages/data-context";
import { ADD_CART_ITEM } from "../pages/data-reducer";
import { useAxios } from "../useAxios";
import { API_CART } from "../urls";
import { useNavigate } from "react-router";

export const AddToCartButton = ({ id, inStock, ...rest }) => {
  const navigate = useNavigate();
  const { postData, isLoading } = useAxios(API_CART);
  const { cartItems, dataDispatch } = useData();
  const handleClick = async () => {
    if (checkItem(cartItems, id)) {
      navigate("/cart");
    } else {
      const item = await postData({ id, qty: 1, inStock, ...rest });
      dataDispatch({
        type: ADD_CART_ITEM,
        item,
      });
    }
  };
  const getButtonText = () => {
    if (inStock) {
      return checkItem(cartItems, id) ? "Go to Cart" : "Add to cart";
    }
    return "Out of Stock";
  };
  return (
    <button
      disabled={isLoading || !inStock}
      className="btn bg-primary"
      onClick={handleClick}
    >
      {inStock &&
        (isLoading ? (
          <i className="fa fa-spinner fa-pulse mr-sm" />
        ) : (
          <i className="fa fa-shopping-cart mr-sm" aria-hidden="true" />
        ))}
      {getButtonText()}
    </button>
  );
};
