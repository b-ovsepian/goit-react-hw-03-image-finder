import React from "react";
import Styles from "./Searchbar.module.css";
import PropTypes from "prop-types";

const Searchbar = ({ query, onSubmit, setQuery }) => {
  const handlerInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <header className={Styles.Searchbar}>
      <form onSubmit={handleOnSubmit} className={Styles.SearchForm}>
        <button type="submit" className={Styles["SearchForm-button"]}>
          <span className={Styles["SearchForm-button-label"]}>Search</span>
        </button>

        <input
          className={Styles["SearchForm-input"]}
          onChange={handlerInputChange}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
