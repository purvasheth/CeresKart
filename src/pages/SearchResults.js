import { useLocation } from "react-router";
import { AddToCartButton } from "../components/AddToCartButton";
import { Card, CardBody, CardFooter } from "../components/Card";
import { WishlistButton } from "../components/WishlistButton";
import { useProducts } from "./Products/products-context";

const getSearchResults = ({ products }, searchString) =>
  products.filter((item) =>
    item.name.toLowerCase().includes(searchString.toLowerCase())
  );

export function SearchResults() {
  const searchString = new URLSearchParams(useLocation().search).get(
    "searchString"
  );
  const { productsState } = useProducts();
  return (
    <div className="container">
      <h1>Search Results</h1>
      <div className="container--cards">
        {getSearchResults(productsState, searchString).map(
          ({ id, ...rest }) => (
            <Card key={id}>
              <CardBody {...rest} />
              <WishlistButton id={id} {...rest} />
              <CardFooter>
                <AddToCartButton id={id} {...rest} />
              </CardFooter>
            </Card>
          )
        )}
        {getSearchResults(productsState, searchString).length === 0 && (
          <div>No matching products with that name.</div>
        )}
      </div>
    </div>
  );
}
