import { useProducts } from "./products-context";
import {
  CLEAR_FILTERS,
  INCLUDE_OUT_OF_STOCK,
  ONLY_FAST_DELIVERY,
  SORT_BY_PRICE,
} from "./products-reducer";
import { Card, CardBody, CardFooter } from "../../components/Card";
import { AddToCartButton } from "../../components/AddToCartButton";
import { useState } from "react";
import { WishlistButton } from "../../components/WishlistButton";
import { useLocation, useParams } from "react-router";

const highToLow = "highToLow";
const lowToHigh = "lowToHigh";

const transformProducts = (state) => {
  const sortVal = state[SORT_BY_PRICE];
  let sortedProducts = state.products;
  if (sortVal) {
    sortedProducts = state.products.sort((a, b) =>
      sortVal === highToLow ? b.price - a.price : a.price - b.price
    );
  }

  let filteredProducts = sortedProducts;
  if (!state[INCLUDE_OUT_OF_STOCK]) {
    filteredProducts = sortedProducts.filter((product) => product.inStock);
  }

  let finalProducts = filteredProducts;
  if (state[ONLY_FAST_DELIVERY]) {
    finalProducts = filteredProducts.filter(
      (products) => products.fastDelivery
    );
  }
  return finalProducts;
};

const FilterInput = ({ inputType, type, value, label, ...rest }) => {
  const { productsDispatch } = useProducts();
  return (
    <>
      <input
        type={inputType}
        id={type}
        onChange={() => {
          productsDispatch({ type, value });
        }}
        {...rest}
      />
      <label htmlFor={type}>{label}</label>
    </>
  );
};
const ToggleSection = ({ title, children }) => {
  const [showSection, setShowSection] = useState(false);
  return (
    <section className="ml-1">
      <h2 className="flex justify-between align-center">
        <span>
          {showSection ? (
            <button
              className="btn btn--icon icon--transparent section-toggle"
              onClick={() => setShowSection((prev) => !prev)}
            >
              <i className="fa fa-angle-up fa-lg"></i>
            </button>
          ) : (
            <button
              className="btn btn--icon icon--transparent section-toggle"
              onClick={() => setShowSection((prev) => !prev)}
            >
              <i className="fa fa-angle-down fa-lg" />
            </button>
          )}
          {title}
        </span>
        {showSection && <ClearFiltersButton />}
      </h2>
      <div className={showSection ? "section--open" : "section--close"}>
        {children}
      </div>
    </section>
  );
};

const ClearFiltersButton = () => {
  const { productsDispatch } = useProducts();
  return (
    <button
      className="btn bg-primary"
      onClick={() => {
        productsDispatch({ type: CLEAR_FILTERS });
      }}
    >
      Clear Filters
    </button>
  );
};

const FilterListItem = ({ title, children }) => (
  <li className="notif__item pb-1">
    <h3>{title}</h3>
    {children}
  </li>
);

const Filters = () => {
  const { productsState } = useProducts();
  return (
    <ToggleSection title="Filters">
      <ul className="list">
        <FilterListItem title="Price">
          <FilterInput
            inputType="radio"
            type={SORT_BY_PRICE}
            value={highToLow}
            checked={productsState[SORT_BY_PRICE] === highToLow}
            label="High to Low"
          />
          <FilterInput
            inputType="radio"
            type={SORT_BY_PRICE}
            value={lowToHigh}
            checked={productsState[SORT_BY_PRICE] === lowToHigh}
            label="Low to High"
            className="ml-sm"
          />
        </FilterListItem>
        <FilterListItem title="Availability">
          <FilterInput
            inputType="checkbox"
            type={INCLUDE_OUT_OF_STOCK}
            checked={productsState[INCLUDE_OUT_OF_STOCK]}
            label="Include Out of Stock items"
          />
          <FilterInput
            inputType="checkbox"
            type={ONLY_FAST_DELIVERY}
            checked={productsState[ONLY_FAST_DELIVERY]}
            label="Fast Delivery only"
            className="ml-1"
          />
        </FilterListItem>
      </ul>
    </ToggleSection>
  );
};

export function Products() {
  const { categoryName: category } = useParams();
  let banner;
  if (category) {
    banner = useLocation().state.banner;
  }
  const { productsState } = useProducts();

  return (
    <>
      {banner && (
        <div
          className="caraousel__bg"
          style={{ backgroundImage: `url(${banner})` }}
        />
      )}
      <div className="container">
        {category ? <h1>{category}</h1> : <h1>All Products</h1>}
        <Filters />
        {productsState.products.length === 0 ? (
          <span className="font--primary spinner--large mt-2">
            <i className="fa fa-spinner fa-pulse" />
          </span>
        ) : (
          <>
            <div className="container--cards">
              {transformProducts(productsState)
                .filter((item) =>
                  category ? item.category === category : true
                )
                .map(({ id, ...rest }) => (
                  <Card key={id}>
                    <CardBody {...rest} />
                    <WishlistButton id={id} {...rest} />
                    <CardFooter>
                      <AddToCartButton id={id} {...rest} />
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
