import { useState } from "react";
import { banners, categories } from "./home-data";
import { useNavigate } from "react-router";

function CaraouselImage({ activeBanner }) {
  return (
    <div
      className="caraousel__bg"
      style={{ backgroundImage: `url(${banners[activeBanner].url})` }}
    >
      <div className="caraousel__text-bg">
        <h2 className="caraousel__text">{banners[activeBanner].text}</h2>
      </div>
    </div>
  );
}

function CaraouselNav({ activeBanner, setActiveBanner }) {
  return (
    <div className="flex justify-center m-1">
      {banners.map((_, i) => (
        <span
          key={i}
          className={`caraousel__nav ml-sm ${
            activeBanner === i ? "bg-primary" : "bg-secondary"
          }`}
          onClick={() => setActiveBanner(i)}
        ></span>
      ))}
    </div>
  );
}

function Caraousel() {
  const [activeBanner, setActiveBanner] = useState(0);
  return (
    <>
      <CaraouselImage
        activeBanner={activeBanner}
        setActiveBanner={setActiveBanner}
      />
      <CaraouselNav
        activeBanner={activeBanner}
        setActiveBanner={setActiveBanner}
      />
    </>
  );
}

function CategoryCard({ name, banner, thumbnail }) {
  const navigate = useNavigate();
  const navigateToProductListing = ({ name, banner }) => {
    navigate(`products/category/${name}`, { state: { banner } });
  };
  return (
    <div
      className="clickable"
      onClick={() => navigateToProductListing({ name, banner })}
    >
      <h3 className="font--primary font--center flex-grow"> {name} </h3>
      <img className="img img--round img--scale" src={thumbnail} alt={name} />
    </div>
  );
}

export function Home() {
  return (
    <>
      <Caraousel />
      <div className="container container--cards">
        {categories.map(({ id, ...rest }) => (
          <CategoryCard key={id} {...rest} />
        ))}
      </div>
    </>
  );
}
