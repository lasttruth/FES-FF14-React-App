import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Searchbar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    onSearch(query);
  };

  return (
    <>
      <div className="search">
        <div className="user-panel">
          <form
            className="search-bar"
            id="form"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              id="query"
              name="q"
              placeholder="Search..."
              aria-label="Search through site content"
            />
            <button className="search-bar__btn">
              <FontAwesomeIcon icon={faSearch} className="fas fa-search" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Searchbar;
