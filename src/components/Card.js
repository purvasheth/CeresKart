const setRatingClass = (rating) => {
  if (+rating <= 1.5) {
    return "bg-red-600";
  } else if (+rating < 3.5) {
    return "bg-yellow-600";
  } else {
    return "bg-green-600";
  }
};

export const Badges = ({ rating, fastDelivery }) => (
  <div className="card__badges">
    <div className="rating">
      <span className={`badge--regular ${setRatingClass(rating)}`}>
        {rating}
        <i className="fa fa-star ml-space"></i>
      </span>
    </div>
    {fastDelivery && (
      <span className="badge--regular bg-green-100 badge--second">
        Fast Delivery
      </span>
    )}
  </div>
);

export const Price = ({ discount, price }) => (
  <div>
    <i className="fa fa-inr mr-space" />
    {discount ? (
      <>
        <b>{Math.round(price - price * 0.01 * discount)}</b>
        <span className="strike-through ml-space">{Math.round(price)}</span>
        <span className="font--success ml-space">{discount}% off</span>
      </>
    ) : (
      <span>{Math.round(price)}</span>
    )}
  </div>
);

const Category = ({ calledFrom, category }) =>
  calledFrom !== "cart" &&
  calledFrom !== "wishlist" && (
    <div>
      <b>Category</b>: {category}
    </div>
  );

export const CardBody = ({
  name,
  image,
  price,
  rating,
  discount,
  category,
  fastDelivery,
  calledFrom,
}) => (
  <>
    <img className="img" src={image} alt={name} />
    <div className="card__content">
      <div className="card__heading"> {name} </div>
      <Badges rating={rating} fastDelivery={fastDelivery} />
      <Price discount={discount} price={price} />
      <Category calledFrom={calledFrom} category={category} />
    </div>
  </>
);
export const Card = ({ children }) => (
  <div className="card card--shadow">{children}</div>
);
export const CardFooter = ({ children }) => (
  <div className="card__footer">{children}</div>
);
