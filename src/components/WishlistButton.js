import { checkItem } from "../utils";
import { useData } from "../pages/data-context";
import {
  ADD_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM,
  REMOVE_CART_ITEM,
} from "../pages/data-reducer";
import { useAxios } from "../useAxios";
import { API_CART, API_WISHLIST } from "../urls";

export const WishlistButton = ({ calledFrom, id, name, ...rest }) => {
  const { wishlist, dataDispatch } = useData();
  const {
    isLoading,
    postData: postWishlistData,
    deleteData: deleteWishlistData,
  } = useAxios(API_WISHLIST);
  const { deleteData: deleteCartData } = useAxios(API_CART);
  const handleClick = async () => {
    if (checkItem(wishlist, id)) {
      const deleteSuccess = await deleteWishlistData({ id, name });
      if (deleteSuccess) {
        dataDispatch({ type: REMOVE_WISHLIST_ITEM, id });
      }
    } else {
      const item = await postWishlistData({ id, name, ...rest });
      dataDispatch({ type: ADD_WISHLIST_ITEM, item });
      if (calledFrom === "cart") {
        const success = await deleteCartData({ id, name }, false);
        if (success) {
          dataDispatch({ type: REMOVE_CART_ITEM, id: item.id });
        }
      }
    }
  };
  return (
    <button
      disabled={isLoading}
      className={`btn-close btn-wishlist btn-lg 
      ${checkItem(wishlist, id) ? "font--warning" : "font--grey-500"}`}
      onClick={handleClick}
    >
      {isLoading ? (
        <i className="fa fa-spinner fa-pulse" />
      ) : (
        <i className="fa fa-heart" />
      )}
    </button>
  );
};
