import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchString, setSearchString] = useState("");
  const [prevLocation, setPrevLocation] = useState("/");

  const searchResultsOnEnter = (e) => {
    if (e.key === "Enter") {
      if (location.pathname !== "/search") {
        setPrevLocation(location.pathname);
      }
      navigate(`/search?searchString=${encodeURI(searchString)}`);
    }
  };

  const clearSearchResults = () => {
    setSearchString("");
    navigate(prevLocation);
  };

  return (
    <div className="search-input">
      <input
        className="input"
        type="text"
        placeholder="Search for products"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        onKeyDown={searchResultsOnEnter}
      />
      <i
        className="fa fa-search search-icon font--primary"
        aria-hidden="true"
      />
      <button
        className="btn-close close-icon btn-lg"
        onClick={clearSearchResults}
        disabled={!searchString}
      >
        <i className="fa fa-times" />
      </button>
    </div>
  );
};
