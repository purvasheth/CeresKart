import { useEffect, useState } from "react";
import { AddToCartButton } from "../components/AddToCartButton";
import { Card, CardBody, CardFooter } from "../components/Card";
import { CloseButton } from "../components/CloseButton";
import { DeleteModal } from "../components/DeleteModal";
import { useData } from "./data-context";
import { REMOVE_WISHLIST_ITEM } from "./data-reducer";
import { API_WISHLIST } from "../urls";
import { useAxios } from "../useAxios";
import { makeBackroundUnscrollable } from "../utils";

export function Wishlist() {
  const { wishlist, dataDispatch } = useData();
  const { deleteData: deleteWishlistData, isLoading } = useAxios(API_WISHLIST);
  const [openModal, setOpenModal] = useState(false);

  const deleteWishlistItem = async ({ id, name }) => {
    const success = await deleteWishlistData({ id, name });
    if (success) {
      dataDispatch({ type: REMOVE_WISHLIST_ITEM, id });
    }
    setOpenModal(false);
  };

  useEffect(() => {
    makeBackroundUnscrollable(openModal);
  }, [openModal]);

  return (
    <div className="container">
      <h1>My Wishlist</h1>
      {isLoading ? (
        <span className="font--primary spinner--large">
          <i className="fa fa-spinner fa-pulse" />
        </span>
      ) : (
        <div className="container--cards flex">
          {wishlist.map(({ id, name, ...rest }) => (
            <Card key={id}>
              <CloseButton onClick={() => setOpenModal(true)} />
              <CardBody {...rest} name={name} calledFrom="wishlist" />
              <CardFooter>
                <AddToCartButton id={id} name={name} {...rest} />
              </CardFooter>
              {openModal && (
                <DeleteModal
                  onDelete={() => deleteWishlistItem({ id, name })}
                  onCancel={() => setOpenModal(false)}
                  calledFrom="Wishlist"
                />
              )}
            </Card>
          ))}
          {wishlist.length === 0 && "No items in wishlist"}
        </div>
      )}
    </div>
  );
}
