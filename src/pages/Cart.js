import { useEffect, useState } from "react";
import { Badges, Price } from "../components/Card";
import { DeleteModal } from "../components/DeleteModal";
import { WishlistButton } from "../components/WishlistButton";
import { useData } from "./data-context";
import { DEC_QTY, INC_QTY, REMOVE_CART_ITEM } from "./data-reducer";
import { API_CART } from "../urls";
import { useAxios } from "../useAxios";
import { makeBackroundUnscrollable } from "../utils";

const getAmount = (items) => {
  return items.reduce(
    (total, { price, qty, discount }) =>
      total + Math.round(price - price * 0.01 * discount) * qty,
    0
  );
};

const OperationButton = ({ type, id, qty }) => {
  const { updateData: updateCartItemQty, isLoading } = useAxios(API_CART);
  const { dataDispatch } = useData();

  const setIcon = () => {
    if (isLoading) {
      return <i className="fa fa-spinner fa-pulse" />;
    }
    if (type === INC_QTY) {
      return <i className="fa fa-plus" />;
    }
    return <i className="fa fa-minus" />;
  };

  return (
    <button
      disabled={isLoading || (type === DEC_QTY && qty === 1)}
      className="btn btn--icon icon--transparent btn--inc-dec"
      onClick={() => {
        let data;
        if (type === INC_QTY) {
          data = updateCartItemQty(id, { qty: qty + 1 });
        } else {
          data = updateCartItemQty(id, { qty: qty - 1 });
        }
        if (data) {
          dataDispatch({ type, id });
        }
      }}
    >
      {setIcon()}
    </button>
  );
};
export function Cart() {
  const { cartItems, dataDispatch } = useData();
  const { deleteData: deleteCartData, isLoading } = useAxios(API_CART);
  const [openModal, setOpenModal] = useState(false);

  const deleteCartItem = async ({ id, name }) => {
    const success = await deleteCartData({ id, name });
    if (success) {
      dataDispatch({ type: REMOVE_CART_ITEM, id });
    }
    setOpenModal(false);
  };

  useEffect(() => {
    makeBackroundUnscrollable(openModal);
  }, [openModal]);

  return (
    <div className="cart--container">
      <h1>My Cart</h1>
      {isLoading ? (
        <span className="font--primary spinner--large">
          <i className="fa fa-spinner fa-pulse" />
        </span>
      ) : (
        <>
          {cartItems.length !== 0 && <h2> Total: {getAmount(cartItems)}</h2>}

          <ul className="list">
            {cartItems.map((item) => {
              const {
                id,
                qty,
                image,
                name,
                price,
                discount,
                rating,
                fastDelivery,
                inStock,
              } = item;
              return (
                <li key={id} className="cart__item pos-rel">
                  <div className="cart__image">
                    <img className="img" src={image} alt={name} />
                  </div>
                  <WishlistButton {...item} calledFrom="cart" />

                  <div className="cart__info">
                    <div className="card__heading"> {name} </div>
                    <Badges
                      inStock={inStock}
                      rating={rating}
                      fastDelivery={fastDelivery}
                    />
                    <Price discount={discount} price={price} />
                    <div className="mt-sm flex align-center">
                      <div>
                        <OperationButton type={INC_QTY} id={id} />
                        <span className="ml-sm mr-sm">{qty}</span>
                        <OperationButton type={DEC_QTY} id={id} qty={qty} />
                      </div>
                      <button
                        onClick={() => setOpenModal(true)}
                        className="btn ml-1 bg-primary cart__btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {openModal && (
                    <DeleteModal
                      onCancel={() => setOpenModal(false)}
                      onDelete={() => deleteCartItem({ id, name })}
                      calledFrom="Cart"
                    />
                  )}
                </li>
              );
            })}
            {cartItems.length === 0 && <div>No items in Cart</div>}
          </ul>
        </>
      )}
    </div>
  );
}
